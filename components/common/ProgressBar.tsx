
import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  colorClass: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, colorClass }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className={`${colorClass} h-2 rounded-full`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
