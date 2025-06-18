// validators/productValidators.ts

import { Product } from "@/interfaces/product";
import Swal from "sweetalert2";

export const validateDescription = (description: string): boolean => {
  if (!description.trim()) {
    Swal.fire({
      title: "Validation Error",
      text: "Description is required",
      icon: "error",
    });
    return false;
  }
  return true;
};

export const validateFeatures = (features: string[]): boolean => {
  if (features.length > 5) {
    Swal.fire({
      title: "Validation Error",
      text: "Maximum 5 features allowed",
      icon: "error",
    });
    return false;
  }
  return true;
};

export const validateMaterials = (materials: string[]): boolean => {
  if (materials.length > 5) {
    Swal.fire({
      title: "Validation Error",
      text: "Maximum 5 materials allowed",
      icon: "error",
    });
    return false;
  }
  return true;
};

export const validateIngredientsDescription = (
  description: string,
): { isValid: boolean; error?: string } => {
  if (!description.trim()) {
    return { isValid: false, error: "Ingredients description is required." };
  }
  if (description.length > 5000) {
    return {
      isValid: false,
      error: "Ingredients description cannot exceed 5000 characters.",
    };
  }
  return { isValid: true };
};

export const validateProductDetails = (
  product: Product,
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate ingredientsDescription
  const descriptionValidation = validateIngredientsDescription(
    product.details?.ingredientsDescription || "",
  );
  if (!descriptionValidation.isValid) {
    errors.push(descriptionValidation.error!);
  }

  // Validate specifications (optional, but keys must be non-empty if present)
  Array.from(product.specifications.keys()).forEach((key) => {
    if (!key.trim()) {
      errors.push("Specification keys cannot be empty.");
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
