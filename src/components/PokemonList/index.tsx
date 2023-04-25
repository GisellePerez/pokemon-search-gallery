import React from 'react';
import { Type, Types } from '../../../types/types';
import { PokemonCard } from './PokemonCard';

export type PokemonListProp = {
  items: any[];
};

export type PokemonCardItem = {
  id: number,
  name: string,
  image: string,
  types: Type[],
}

export const PokemonList = ({ items }: PokemonListProp) => {
  return (
    <>
      {items?.length ? (
        <ul className='grid grid-cols-1 md:grid-cols-4 w-full md:w-auto gap-4 grid-auto auto-rows-max'>
          {items.map((item) => (
            <li key={item?.id || item?.name} className='h-full'>
              <PokemonCard
                id={item?.id}
                name={item?.name}
                image={item?.sprites?.front_default}
                types={item?.types}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
