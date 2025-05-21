import React from 'react';
import { quantityOptions } from '../../types/quiz';

type QuantitySelectorProps = {
  selectedQuantity: number;
  onQuantityChange: (quantity: number) => void;
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  selectedQuantity,
  onQuantityChange
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3 text-blue-600">Số lượng câu hỏi</h3>
      <div className="flex flex-wrap gap-3">
        {quantityOptions.map((qty) => (
          <button
            key={qty}
            type="button"
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-sm ${
              selectedQuantity === qty
                ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
            onClick={() => onQuantityChange(qty)}
          >
            {qty}
          </button>
        ))}
      </div>
    </div>
  );
}; 