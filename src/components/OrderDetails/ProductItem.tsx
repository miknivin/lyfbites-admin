/* eslint-disable @next/next/no-img-element */
"use client";

import { OrderItem } from "@/types/order";
import React from "react";

interface ProductItemProps {
  product: OrderItem;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { name, quantity, image, price } = product;

  return (
    <div className="mt-4 flex w-full flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8">
      <div className="w-full pb-4 md:w-40 md:pb-8">
        <img className="hidden w-full md:block" src={image} alt={name} />
      </div>
      <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-8 dark:border-gray-700 md:flex-row md:space-y-0">
        <div className="flex w-full flex-col items-start justify-start space-y-8">
          <h3 className="text-xl font-semibold leading-6 text-gray-800 dark:text-gray-100 xl:text-2xl">
            {name}
          </h3>
        </div>
        <div className="flex w-full items-start justify-between space-x-8">
          <p className="text-base leading-6 xl:text-lg">₹{price}</p>
          <p className="text-base leading-6 text-gray-800 dark:text-gray-100 xl:text-lg">
            {quantity}
          </p>
          <p className="text-base font-semibold leading-6 text-gray-800 dark:text-gray-100 xl:text-lg">
            ₹{Number(price) * quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;