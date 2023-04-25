import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Chip } from '@/components/Chip';
import { useQuery } from 'react-query';
import { Ability, Type } from '../../../types/types';
import { ImageCard } from '@/components/ImageCard';

export default function PokemonDetails() {
  const router = useRouter();
  const { id } = router?.query;

  /**
   * Fetch pokemon general characteristics
   */
  const fetchPokemonData = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.json();
  };

  const { data: pokemonData, status: pokemonDataStatus } = useQuery(
    'pokemonData',
    fetchPokemonData,
  );

  /**
   * Fetch pokemon evolution data
   */
  const fetchPokemonEvolutions = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
    // const res = await fetch(`adasdasd/${id}`);
    return res.json();
  };

  const { data: pokemonEvolutions, status: pokemonEvolutionsStatus } = useQuery(
    'pokemonEvolutions',
    fetchPokemonEvolutions,
  );

  return (
    <main className='max-w-[1024px] py-6 px-10 my-0 mx-auto'>
      <div className='flex items-end mb-2'>
        <h1 className='text-5xl font-bold'>
          <span className='text-gray-400'>
            {`#${pokemonData?.order} ` || ''}
          </span>

          <span className='capitalize'>{pokemonData?.name || ''}</span>
        </h1>
      </div>

      {/* Types */}
      {pokemonData?.types ? (
        <ul className='flex gap-2'>
          {pokemonData.types.map((t: Type) => (
            <Chip key={t.type.name}>{t.type.name}</Chip>
          ))}
        </ul>
      ) : null}

      <div className='grid grid-rows-2'>
        <div className='flex flex-col md:flex-row gap-6 mt-6'>
          <div className='w-[200px] h-[200px] border  border-gray-300 rounded-md'>
            <img
              className='w-full'
              src={pokemonData?.sprites?.front_default}
              alt={pokemonData?.name || 'pokemon'}
            />
          </div>

          <div className='flex flex-col gap-8'>
            {/* General */}
            <div>
              <h2 className='font-semibold text-xl'>General characteristics</h2>

              <ul>
                <li className='flex gap-1'>
                  <h3 className='font-semibold'>Height:</h3>
                  <span>{pokemonData?.height}</span>
                </li>

                <li className='flex gap-1'>
                  <h3 className='font-semibold'>Weight:</h3>
                  <span>{`${pokemonData?.weight}kg`}</span>
                </li>
              </ul>
            </div>

            {/* Abilities */}
            <div>
              <h2 className='font-semibold text-xl'>Abilities</h2>

              {pokemonData?.abilities ? (
                <ul className=''>
                  {pokemonData.abilities.map((a: Ability) => (
                    <h3 className='capitalize' key={a.ability.name}>{a.ability.name}</h3>
                  ))}
                </ul>
              ) : (
                <p>No data found.</p>
              )}
            </div>

            {/* Evolutions */}
            <div>
              <h2 className='font-semibold text-xl'>Evolution chain</h2>

              {pokemonEvolutions?.chain ? (
                <>
                  {pokemonEvolutions?.chain?.evolves_to.map((p: any, i: number) => {
                    return (
                      <div
                        className='flex justify-start'
                        key={p.species?.name || i}
                      >
                        <h3 className='capitalize'>{p.species?.name}</h3>

                        {p.evolves_to
                          ? p.evolves_to.map((nextLevel: any, i: number) => {
                              return (
                                <div
                                  key={
                                    nextLevel.species?.name ||
                                    `second-level-${i}`
                                  }
                                  className='flex'
                                >
                                  <span className='px-2 text-gray-400'>
                                    {' '}
                                    {`>`}
                                  </span>
                                  <h3 className='capitalize'>
                                    {nextLevel.species?.name}
                                  </h3>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    );
                  })}
                </>
              ) : null}
            </div>

            {/* Images */}
            <div>
              <h2 className='font-semibold text-xl mb-4'>Images</h2>

              <section className='grid grid-cols-3 gap-5'>
                {pokemonData?.sprites ? (
                  <>
                    <ImageCard
                      title='Default'
                      src={pokemonData?.sprites?.front_default}
                      alt={`${pokemonData?.name} front`}
                    />

                    {pokemonData?.sprites?.front_female ? (
                      <ImageCard
                        title='Female'
                        src={pokemonData?.sprites?.front_female}
                        alt={`${pokemonData?.name} female`}
                      />
                    ) : null}

                    <ImageCard
                      title='Shiny'
                      src={pokemonData?.sprites?.front_shiny}
                      alt={`${pokemonData?.name} shiny`}
                    />
                  </>
                ) : (
                  <p>No images available.</p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
