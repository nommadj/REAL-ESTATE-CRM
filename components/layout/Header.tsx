
import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Currency } from '../../types';
import ToggleSwitch from '../common/ToggleSwitch';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import SearchIcon from '../icons/SearchIcon';
import GlobalSearch from '../search/GlobalSearch';

const Header: React.FC = () => {
  const { company, theme, setTheme, currency, setCurrency } = useAppContext();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src={company.logoUrl} alt={`${company.name} Logo`} className="h-10 w-10 rounded-full object-cover" />
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">{company.name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSearchOpen(true)} className="text-gray-600 dark:text-gray-300">
                <SearchIcon className="h-5 w-5" />
            </button>
            <ToggleSwitch
              options={[
                { value: Currency.KES, label: 'KES' },
                { value: Currency.USD, label: 'USD' },
              ]}
              selectedValue={currency}
              onChange={(val) => setCurrency(val)}
            />
            <button onClick={handleThemeChange} className="text-gray-600 dark:text-gray-300">
              {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>
      {isSearchOpen && <GlobalSearch onClose={() => setIsSearchOpen(false)} />}
    </>
  );
};

export default Header;