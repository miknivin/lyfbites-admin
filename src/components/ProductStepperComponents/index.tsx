"use client";
import React, { useEffect, useState } from "react";
import BasicDetails from "./BasicDetails";
import Descriptions from "./Descriptions";
import ImageUpload from "./ImageUpload";
import { Product, ProductCategory } from "@/interfaces/product";
import { isProductValid } from "@/utlis/validation/productValidators/entireProduct";
import { useCreateProductMutation } from "@/redux/api/productsApi";
import Swal from "sweetalert2";
import Loader from "../common/Loader";

const StepperApp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();  const [product, setProduct] = useState<Product>({
    name: "",
    details: { 
      ingredientsDescription: "",
      additionalDescription: ""
    },
    ratings: 4, // Default from schema
    images: [],
    specifications: new Map(),
    variants: [{ size: "100g", actualPrice: 0, stock: 0 }], // Initialize with one variant
    numOfReviews: 0, // Default from schema
    reviews: [],
 category: ProductCategory.Banana,
    user: "" as any, // Temporary placeholder; update based on auth context
    createdAt: undefined,
    updatedAt: undefined,
  });
  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async () => {
    if (!isProductValid(product)) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill all required fields before submitting.",
      });
      return;
    }

    // Convert images from object format to an array of strings
    const formattedProduct = {
      ...product,
      images: product.images.map((img) =>
        typeof img === "object" ? img.url : img,
      ), // Ensure only URLs are sent
    };

    try {
      const response = await createProduct(formattedProduct).unwrap();
      console.log("Product created successfully:", response);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product created successfully!",
      });

      setProduct({
        name: "",
        details: { ingredientsDescription: "" },
        ratings: 4,
        images: [],
        specifications: new Map(),
        variants: [],
        numOfReviews: 0,
        reviews: [],
     category: ProductCategory.Banana,
        user: "" as any,
        createdAt: undefined,
        updatedAt: undefined,
      });
      setCurrentStep(1);
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleStepClick = (step: number) => {
    if (step > currentStep) {
      return;
    }
    setCurrentStep(step);
  };

  const handleIncomingData = (data: Partial<Product>) => {
    setProduct((prev) => ({
      ...prev,
      ...data,
    }));
    //console.log(product,'product from parent');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Stepper UI */}
      <ol className="flex justify-center space-x-8">
        {["Basic Details", "Descriptions"].map((title, index) => {
          const step = index + 1;
          return (
            <li
              key={step}
              onClick={() => handleStepClick(step)}
              className={`flex cursor-pointer items-center space-x-2.5 ${
                currentStep >= step ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                  currentStep >= step ? "border-blue-600" : "border-gray-500"
                }`}
              >
                {step}
              </span>
              <span>
                <h3 className="font-medium">{title}</h3>
              </span>
            </li>
          );
        })}
      </ol>

      {/* Step Content */}
      <div className="mt-8">
        {currentStep === 1 && (
          <BasicDetails
            productProp={product}
            handleNextStep={nextStep}
            updateProduct={handleIncomingData}
          />
        )}
        {currentStep === 2 && (
          <Descriptions
            productProp={product}
            handleNextStep={handleSubmit}
            updateProduct={handleIncomingData}
          />
        )}
        {/* {currentStep === 3 && (
          <ImageUpload 
            productProp={product} 
            handleNextStep={handleSubmit}
            updateProduct={handleIncomingData}
          />
        )} */}
      </div>
    </div>
  );
};

export default StepperApp;
