import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { uploadFilesToS3 } from "../../../../utils/imageUpload/S3Upload";
import dbConnect from "@/lib/db/connection";
import Product from "@/models/Products";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";

export async function PATCH(req, { params }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    await dbConnect();
    const user = await isAuthenticatedUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    authorizeRoles(user, "admin");

    const formData = await req.formData();
    const files = formData.getAll("images");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 },
      );
    }

    // Upload files to S3 and get URLs
    const uploadedImages = await uploadFilesToS3(files);

    // Ensure uploadedImages is an array of { url: string } objects
    const imageObjects = uploadedImages.map((image) => ({
      url: typeof image === "string" ? image : image.url,
    }));

    // Validate URLs
    const invalidUrls = imageObjects.filter(
      (img) => !img.url || typeof img.url !== "string" || !img.url.trim(),
    );
    if (invalidUrls.length > 0) {
      return NextResponse.json(
        { error: "Invalid image URLs provided" },
        { status: 400 },
      );
    }

    // Update product with new images
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $push: { images: { $each: imageObjects } } },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Optionally enforce minimum images (e.g., 2)
    if (updatedProduct.images.length < 2) {
      return NextResponse.json(
        { error: "Product must have at least 2 images" },
        { status: 400 },
      );
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product images:", error.message);
    if (error.name === "UnauthorizedError") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
