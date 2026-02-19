
import React from 'react';

interface ToggleSwitchProps<T extends string> {
  options: { value: T; label: React.ReactNode }[];
  selectedValue: T;
  onChange: (value: T) => void;
}

const ToggleSwitch = <T extends string>({ options, selectedValue, onChange }: ToggleSwitchProps<T>) => {
  return (
    <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-300 ease-in-out
            ${selectedValue === option.value
              ? 'bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow'
              : 'text-gray-500 dark:text-gray-400'
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};


export default ToggleSwitch;
