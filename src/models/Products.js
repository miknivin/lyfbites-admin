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
      additionalDescription: {
        type: String,
        required: false,
        maxLength: [
          10000,
          "Additional description cannot exceed 10000 characters",
        ],
      },
    },
    category: {
      type: String,
      enum: ["Banana", "Murukku", "Popcorn", "Tapioca", "Chana", "Potato", "Peanut", "Main"],
      required: [true, "Please select product category"],
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
          required: [true, "Please enter variant size"],
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