"use client";
import React from "react";

interface VariantForm {
  size: string;
  actualPrice: number;
  offer?: number;
  stock: number;
}

interface VariantModalProps {
  isOpen: boolean;
  closeModal: () => void;
  variantForm: VariantForm;
  setVariantForm: React.Dispatch<React.SetStateAction<VariantForm>>;
  saveVariant: () => void;
}

const VariantModal: React.FC<VariantModalProps> = ({
  isOpen,
  closeModal,
  variantForm,
  setVariantForm,
  saveVariant,
}) => {
  const handleVariantChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setVariantForm((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold">
          {variantForm.size ? "Edit Variant" : "Add Variant"}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">
              Size
            </label>
            <input
              type="text"
              name="size"
              value={variantForm.size}
              onChange={handleVariantChange}
              placeholder="Enter size (e.g., 200g)"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">
              Actual Price
            </label>
            <input
              type="number"
              name="actualPrice"
              value={variantForm.actualPrice}
              onChange={handleVariantChange}
              placeholder="Enter actual price"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">
              Offer Price (optional)
            </label>
            <input
              type="number"
              name="offer"
              value={variantForm.offer || ""}
              onChange={handleVariantChange}
              placeholder="Enter offer price"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={variantForm.stock}
              onChange={handleVariantChange}
              placeholder="Enter stock quantity"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          {variantForm.offer &&
            variantForm.actualPrice > 0 &&
            variantForm.offer > 0 && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Discount Ratio:{" "}
                  {(variantForm.offer / variantForm.actualPrice).toFixed(3)}
                </p>
              </div>
            )}
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={closeModal}
            className="rounded bg-gray-500 p-2 text-white hover:bg-opacity-90"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={saveVariant}
            className="rounded bg-blue-600 p-2 text-white hover:bg-opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariantModal;
