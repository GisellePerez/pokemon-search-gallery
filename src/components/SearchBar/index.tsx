import React, { Dispatch, SetStateAction } from 'react';

export type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export const SearchBar = ({ setSearchQuery }: SearchBarProps) => {
  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      className='m-4 p-2 w-full max-w-[846px] text-sm border border-gray-300 rounded-md'
      placeholder='Search pokemon'
      onChange={handleChange}
    />
  );
};
