import { Product } from "@/interfaces/product";

export const isProductValid = (product: Product): boolean => {
  return (
    // Validate name
    product.name.trim() !== "" &&
    // Validate variants
    product.variants.length > 0 &&
    product.variants.every(
      (variant) =>
        /^\d+g$/.test(variant.size) &&
        variant.actualPrice > 0 &&
        variant.stock >= 0 &&
        (variant.offer !== undefined ? variant.offer >= 0 : true),
    ) &&
    // Validate ingredientsDescription
    product.details?.ingredientsDescription?.trim() !== "" &&
    product.details.ingredientsDescription.length <= 5000
  );
};
