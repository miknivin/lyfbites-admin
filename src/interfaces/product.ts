import { Types } from "mongoose";

export interface Product {
  _id?: Types.ObjectId; // Optional, added by Mongoose
  name: string;
  details: {
    ingredientsDescription: string;
  };
  ratings: number;
  images: Array<{
    _id?: string; // Added optional _id, serialized as string
    url: string;
  }>;
  specifications: Map<string, string>;
  variants: Array<{
    size: string;
    actualPrice: number;
    offer?: number; // Optional, as per schema
    stock: number;
  }>;
  numOfReviews: number;
  reviews: Array<{
    user: Types.ObjectId;
    ratings: number;
    comment: string;
  }>;
  user: Types.ObjectId;
  createdAt?: Date; // Added by timestamps option
  updatedAt?: Date; // Added by timestamps option
}
