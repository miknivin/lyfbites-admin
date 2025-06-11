import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Automatically generate ObjectId
  },
  url: {
    type: String,
    required: [true, "Please enter image URL"],
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    details: {
      ingredientsDescription: {
        type: String,
        required: [true, "Please enter ingredients description"],
        maxLength: [
          5000,
          "Ingredients description cannot exceed 5000 characters",
        ],
      },
    },
    ratings: {
      type: Number,
      default: 4,
    },
    images: [imageSchema],
    specifications: {
      type: Map,
      of: String,
      required: true,
    },
    variants: [
      {
        size: {
          type: String,
          required: [true, "Please enter variant size (e.g., 200g)"],
          validate: {
            validator: function (value) {
              return /^\d+g$/.test(value); // Ensures format like "200g"
            },
            message:
              "Variant size must be a number followed by 'g' (e.g., 200g)",
          },
        },
        actualPrice: {
          type: Number,
          required: [true, "Please enter variant price"],
          min: [0, "Price cannot be negative"],
        },
        offer: {
          type: Number,
          required: false,
          min: [0, "Offer cannot be negative"],
        },
        stock: {
          type: Number,
          required: [true, "Please enter variant stock"],
          min: [0, "Stock cannot be negative"],
        },
      },
    ],
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        ratings: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
