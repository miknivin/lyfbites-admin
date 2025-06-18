import { Types } from "mongoose";
export enum ProductCategory {
  Banana = "Banana",
  Tapioca = "Tapioca",
  Potato = "Potato",
  Murukku = "Murukku",
  Popcorn = "Popcorn",
  Peanut = "Peanut",
  Chana = "Chana",
  Main = "Main",
}
export interface Product {
  _id?: Types.ObjectId; // Optional, added by Mongoose
  name: string;  details: {
    ingredientsDescription: string;
    additionalDescription?: string;
  };
  ratings: number;
  images: Array<{
    _id?: string; // Added optional _id, serialized as string
    url: string;
  }>;
  
  category: ProductCategory;
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
