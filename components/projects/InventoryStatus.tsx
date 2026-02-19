
import React from 'react';
import { type Inventory } from '../../types';
import ProgressBar from '../common/ProgressBar';

interface InventoryStatusProps {
  inventory: Inventory;
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({ inventory }) => {
  const { total, available, sold, booked, pending } = inventory;

  const items = [
    { label: 'Available', value: available, color: 'bg-green-500' },
    { label: 'Sold', value: sold, color: 'bg-blue-500' },
    { label: 'Booked', value: booked, color: 'bg-yellow-500' },
    { label: 'Pending', value: pending, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.label}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
            <span className="text-xs font-semibold text-gray-800 dark:text-white">{item.value} / {total}</span>
          </div>
          <ProgressBar value={item.value} max={total} colorClass={item.color} />
        </div>
      ))}
    </div>
  );
};

export default InventoryStatus;
