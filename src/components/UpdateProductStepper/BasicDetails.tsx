"use client";

import React, { useState } from "react";
import { Product } from "@/interfaces/product";
import Swal from "sweetalert2";
import { validateForm } from "@/utlis/validation/productValidators/basicDetails";
import VariantModal from "../Modals/AddVariantsModal";

interface BasicDetailsProps {
  productProp: Product;
  updateProduct: (data: Partial<Product>) => void;
  handleNextStep: () => void;
  isUpdate?: boolean; // Optional, defaults to false
}

interface VariantForm {
  size: string;
  actualPrice: number;
  offer?: number;
  stock: number;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({
  productProp,
  updateProduct,
  handleNextStep,
  isUpdate = false,
}) => {
  const [productState, setProductState] = useState<Product>(productProp);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variantForm, setVariantForm] = useState<VariantForm>({
    size: "100g",
    actualPrice: 0,
    stock: 0,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const updatedProduct = {
      ...productState,
      [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
    };

    setProductState(updatedProduct);
    updateProduct(updatedProduct);
  };

  const openModal = (index?: number) => {
    if (index !== undefined) {
      // Edit existing variant
      const variant = productState.variants[index];
      setVariantForm({
        size: variant.size,
        actualPrice: variant.actualPrice,
        offer: variant.offer,
        stock: variant.stock,
      });
      setEditIndex(index);
    } else {
      // Add new variant
      setVariantForm({ size: "100g", actualPrice: 0, stock: 0 });
      setEditIndex(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditIndex(null);
    setVariantForm({ size: "100g", actualPrice: 0, stock: 0 });
  };

  const saveVariant = () => {
    // Validate variant
    const errors: string[] = [];
    if (!/^\d+g$/.test(variantForm.size)) {
      errors.push("Size must be a number followed by 'g' (e.g., 200g).");
    }
    if (variantForm.actualPrice <= 0) {
      errors.push("Actual price must be greater than 0.");
    }
    if (variantForm.stock < 0) {
      errors.push("Stock cannot be negative.");
    }
    if (variantForm.offer && variantForm.offer < 0) {
      errors.push("Offer price cannot be negative.");
    }

    if (errors.length > 0) {
      Swal.fire({
        title: "Validation Error",
        html: errors.join("<br>"),
        icon: "error",
      });
      return;
    }

    const updatedVariants = [...productState.variants];
    if (editIndex !== null) {
      // Update existing variant
      updatedVariants[editIndex] = variantForm;
    } else {
      // Add new variant
      updatedVariants.push(variantForm);
    }

    const updatedProduct = { ...productState, variants: updatedVariants };
    setProductState(updatedProduct);
    updateProduct(updatedProduct);
    closeModal();
  };

  const removeVariant = (index: number) => {
    if (productState.variants.length <= 1) {
      Swal.fire({
        title: "Error",
        text: "At least one variant is required.",
        icon: "error",
      });
      return;
    }
    const updatedVariants = productState.variants.filter((_, i) => i !== index);
    const updatedProduct = { ...productState, variants: updatedVariants };
    setProductState(updatedProduct);
    updateProduct(updatedProduct);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors } = validateForm(productState);

    if (!isValid) {
      Swal.fire({
        title: "Validation Error",
        html: errors.join("<br>"),
        icon: "error",
      });
      return;
    }

    updateProduct(productState);
    handleNextStep();
  };

  return (
    <div className="rounded-lg border p-4 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Step 1: Basic Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Name of the Product
            </label>
            <input
              type="text"
              name="name"
              value={productState.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Variants
            </label>
            <div className="flex flex-wrap gap-2">
              {productState.variants.map((variant, index) => (
                <span
                  key={index}
                  id={`badge-dismiss-${index}`}
                  className="me-2 inline-flex cursor-pointer items-center rounded-sm bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  onClick={() => openModal(index)}
                >
                  {variant.size}
                  <button
                    type="button"
                    className="rounded-xs ms-2 inline-flex items-center bg-transparent p-1 text-sm text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                    data-dismiss-target={`#badge-dismiss-${index}`}
                    aria-label="Remove"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal from opening
                      removeVariant(index);
                    }}
                  >
                    <svg
                      className="h-2 w-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Remove badge</span>
                  </button>
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => openModal()}
              className="mt-2 rounded bg-blue-600 p-2 text-white hover:bg-opacity-90"
            >
              Add Variant
            </button>
          </div>

          {!isUpdate && (
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Next
            </button>
          )}
        </div>
      </form>

      <VariantModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        variantForm={variantForm}
        setVariantForm={setVariantForm}
        saveVariant={saveVariant}
      />
    </div>
  );
};

export default BasicDetails;
