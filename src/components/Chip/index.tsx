import React from 'react';

export type ChipProps = {
  children: string;
};

// TODO: add util function to map type and set color for the type based on that
export const Chip = ({ children }: ChipProps) => {
  return (
    <div className='w-max border border-gray-400 px-1 rounded-sm'>
      <p className='text-xs uppercase text-gray-400'>{children}</p>
    </div>
  );
};
