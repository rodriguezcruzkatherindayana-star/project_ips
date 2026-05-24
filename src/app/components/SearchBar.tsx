import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar...',
  onSearch,
  className = '',
  autoFocus = false
}) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-10 pr-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        autoFocus={autoFocus}
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      )}
    </div>
  );
};