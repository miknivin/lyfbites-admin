import { Product, ProductCategory } from "@/interfaces/product";

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  
}
const validCategories = Object.values(ProductCategory);
export const validateForm = (product: Product): ValidationResult => {
  const errors: string[] = [];

  // Validate name
  if (!product.name || product.name.trim() === "") {
    errors.push("Product name is required.");
  } else if (product.name.length > 200) {
    errors.push("Product name cannot exceed 200 characters.");
  }
// Validate category
 // Validate category
  if (!product.category) {
    errors.push("Product category is required.");
  } else if (!validCategories.includes(product.category)) {
    errors.push(`Invalid category. Must be one of: ${validCategories.join(", ")}.`);
  }
  // Validate variants
  if (product.variants.length === 0) {
    errors.push("At least one variant is required.");
  } else {
    product.variants.forEach((variant, index) => {
      if (!variant.size) {
        errors.push(
          `Variant ${index + 1}: Size must be a number followed by 'g' (e.g., 200g).`,
        );
      }
      if (variant.actualPrice <= 0) {
        errors.push(
          `Variant ${index + 1}: Actual price must be greater than 0.`,
        );
      }
      if (variant.stock < 0) {
        errors.push(`Variant ${index + 1}: Stock cannot be negative.`);
      }
      if (variant.offer && variant.offer < 0) {
        errors.push(`Variant ${index + 1}: Offer price cannot be negative.`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
