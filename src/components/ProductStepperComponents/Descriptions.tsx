"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Product } from "@/interfaces/product";
import Swal from "sweetalert2";
import { validateProductDetails } from "@/utlis/validation/details";

interface DescriptionsProps {
  productProp: Product;
  updateProduct: (data: Product) => void;
  handleNextStep: () => void;
}

const Descriptions: React.FC<DescriptionsProps> = ({
  productProp,
  updateProduct,
  handleNextStep,
}) => {
  const [productState, setProductState] = useState<Product>({
    ...productProp,
    details: {
      ingredientsDescription: productProp.details?.ingredientsDescription || "",
    },
  });
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");

  const handleIngredientsDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const updatedProduct = {
      ...productState,
      details: {
        ...productState.details,
        ingredientsDescription: e.target.value,
      },
    };
    setProductState(updatedProduct);
    updateProduct(updatedProduct);
  };

  const handleAddSpecification = (e: React.FormEvent) => {
    console.log("handle add");

    e.preventDefault();
    if (!newSpecKey?.trim()) {
      Swal.fire({
        title: "Error",
        text: "Specification key is required.",
        icon: "error",
      });
      return;
    }
    if (productState.specifications.has(newSpecKey)) {
      Swal.fire({
        title: "Error",
        text: "Specification key already exists.",
        icon: "error",
      });
      return;
    }

    const updatedSpecifications = new Map(productState.specifications).set(
      newSpecKey,
      newSpecValue,
    );
    const updatedProduct = {
      ...productState,
      specifications: updatedSpecifications,
    };
    setProductState(updatedProduct);
    updateProduct(updatedProduct);
    setNewSpecKey("");
    setNewSpecValue("");
  };

  const handleRemoveSpecification = (key: string) => {
    const updatedSpecifications = new Map(productState.specifications);
    updatedSpecifications.delete(key);
    const updatedProduct = {
      ...productState,
      specifications: updatedSpecifications,
    };
    setProductState(updatedProduct);
    updateProduct(updatedProduct);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors } = validateProductDetails(productState);
    console.log("submited");

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
      <h2 className="mb-4 text-xl font-semibold">Step 2: Product Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="px-6.5">
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Description
            </label>
            <textarea
              value={productState.details.ingredientsDescription}
              onChange={handleIngredientsDescriptionChange}
              rows={6}
              placeholder="Enter ingredients description"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>
        </div>

        <div className="px-6.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Specifications
          </label>
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={newSpecKey}
              onChange={(e) => setNewSpecKey(e.target.value)}
              placeholder="Sugar"
              className="w-1/3 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <input
              type="text"
              value={newSpecValue}
              onChange={(e) => setNewSpecValue(e.target.value)}
              placeholder="0.5g"
              className="w-1/3 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <button
              role="button"
              type="button"
              onClick={handleAddSpecification}
              className="w-1/3 rounded bg-blue-700 p-3 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
            {Array.from(productState.specifications.entries()).map(
              ([key, value], index) => (
                <span
                  key={index}
                  id={`badge-dismiss-${index}`}
                  className="inline-flex items-center rounded-sm bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                >
                  {key}: {value}
                  <button
                    type="button"
                    className="rounded-xs ms-2 inline-flex items-center bg-transparent p-1 text-sm text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                    data-dismiss-target={`#badge-dismiss-${index}`}
                    aria-label="Remove"
                    onClick={() => handleRemoveSpecification(key)}
                  >
                    <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                    <span className="sr-only">Remove specification</span>
                  </button>
                </span>
              ),
            )}
          </div>
        </div>

        <div className="px-6.5">
          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Descriptions;
