import React from 'react';

type ImageCardProps = {
  title: string;
  src: string;
  alt: string;
};

export const ImageCard = ({ title, src, alt }: ImageCardProps) => {
  return (
    <div className='border border-gray-300 rounded-md p-2'>
      <h3 className='font-semibold'>{title}</h3>
      <img className='my-0 mx-auto' src={src} alt={alt} />
    </div>
  );
};
