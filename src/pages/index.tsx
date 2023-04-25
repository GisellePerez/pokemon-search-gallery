import { useEffect, useState } from 'react';

import { PokemonList } from '@/components/PokemonList';
import { SearchBar } from '@/components/SearchBar';
import { useQueries, useQuery } from 'react-query';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>(''); // state to store the value of the searchbar
  const [filteredItems, setFilteredItems] = useState<any[]>([]); // state to store the filtered values. By default it will have all items

  /**
   * Function to fetch the list of pokemons
   * returns an array with name and url of the first 25 pokemons
   */
  const fetchPokemonList = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=25');
    return res.json();
  };

  /**
   * Function that handles the request and caches the responses
   */
  const { data: pokemonList, status: pokemonListStatus } = useQuery(
    'pokemonList',
    fetchPokemonList,
  );

  /**
   * Function to fetch the detail of a pokemon
   * To display details like type in the cards we need the pokemon detail.
   * So, once we have the list of 25 pokemon, we fetch the details for each one of them
   */
  const fetchPokemonDetail = async (id: number) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); 
    return res.json();
  };

  /**
   * Create an array of queries to pass to useQueries, which will make the requests for the pokemons details one by one handling cache
   */
  // const slicedList = pokemonList?.slice(0, 3);
  const allPokemonQueries = pokemonList?.results?.map(
    (item: any, i: number) => {
      return {
        queryKey: ['pokemon', i + 1],
        queryFn: async () => await fetchPokemonDetail(i + 1),
        staleTime: Infinity,
      };
    },
  );

  /**
   * fetch the pokemon details using useQueries
   */
  const allPokemonsDetails = useQueries(allPokemonQueries || []);

  /**
   * Return the queries resonses data and store it into an array to use in the grid in the frontend
   */
  const allPokemonsDetailsData = allPokemonsDetails.map((item) => item.data);
  const completePokemonData = [...allPokemonsDetailsData];

  /**
   * Initialize array of filtered data with complete list
   */
  useEffect(() => {
    setFilteredItems(completePokemonData);
  }, []);

  /**
   * If searchQuery changes, we filter the array of pokemons we display
   */
  useEffect(() => {
    if (completePokemonData) {
      const filtered: any[] = completePokemonData.filter((p: any) =>
        p?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredItems(filtered);
    }

    if (!searchQuery) {
      setFilteredItems(completePokemonData);
    }
  }, [searchQuery]);

  return (
    <main className='flex flex-col items-center my-0 mx-auto py-4 px-10 max-w-[1024px]'>
      <h1 className='text-3xl font-bold'>Welcome to the pokedex!</h1>
      {pokemonListStatus === 'loading' ? (
        <div className='my-10'>
          <span className='animate-ping inline-flex h-[30px] w-[30px] rounded-full bg-red-500 opacity-75'></span>
        </div>
      ) : (
        <>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <PokemonList items={filteredItems || allPokemonsDetailsData} />
        </>
      )}
    </main>
  );
}
