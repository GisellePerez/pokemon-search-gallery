import React from 'react';

import Link from 'next/link';

import { Chip } from '@/components/Chip';
import { Type } from '../../../../types/types';

type PokemonCardProps = {
  id: number;
  name: string;
  image: string;
  types: Type[];
};

export const PokemonCard = ({ id, name, image, types }: PokemonCardProps) => {
  return (
    <Link href={`/pokemons/${id}`}>
      <div className='flex flex-col items-center h-full min-w-[200px] bg-gray-200 rounded-sm shadow-md'>
        <div className='w-[120px] h-[120px] p-4'>
          <img
            className='w-full h-full'
            src={image}
            alt={name}
          />
        </div>

        <div className='w-full p-4 bg-white'>
          <h3 className='font-semibold text-lg capitalize mb-1'>{name}</h3>

          {types?.length ? (
            <div className='flex gap-1'>
              {types.map((t: Type) => (
                <Chip key={t.type?.name}>{t.type?.name}</Chip>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
};
