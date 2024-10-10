"use client";

import React, { useState, useEffect } from 'react';

const PokemonSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [sortOption, setSortOption] = useState('name'); 
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

 
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
        const data = await response.json();
        const names = data.results.map((pokemon, index) => ({
          name: pokemon.name,
          id: index + 1,
        }));
        setPokemonList(names);
        setFilteredPokemonList(names); 
      } catch (err) {
        console.error('Failed to fetch Pokémon list:', err);
      }
    };
    fetchPokemonList();
  }, []);

  const fetchPokemon = async () => {
    if (!searchTerm) return;

    setLoading(true);
    setError('');
    setPokemonData(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      const data = await response.json();
      setPokemonData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPokemon();
  };

  const toggleList = () => {
    setShowList(!showList);
  };

  // Handle sorting based on selected option
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    let sortedList = [...filteredPokemonList];
    if (e.target.value === 'name') {
      sortedList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (e.target.value === 'id') {
      sortedList.sort((a, b) => a.id - b.id);
    }
    setFilteredPokemonList(sortedList);
  };

  // Filter Pokémon based on search term
  useEffect(() => {
    const filteredList = pokemonList.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemonList(filteredList);
  }, [searchTerm, pokemonList]);

  return (
    <div className="poke">
      <h1 className="poke_heading">Pokemon GO</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="poke_search">
        <input
          type="text"
          placeholder="Enter Pokémon name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Display Pokémon details */}
      {pokemonData && (
        <div className="pokemonInfo">
          <h2>{pokemonData.name}</h2>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="pokemonImage"
          />
          <div>
            <strong>Type(s):</strong>
            {pokemonData.types.map((typeInfo, index) => (
              <span key={index} className="pokemonType">
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sort and Filter Options */}
      <div className="sort-filter">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange} className="input">
          <option value="name">Name</option>
          <option value="id">ID</option>
        </select>
      </div>

      {/* Toggle Pokémon List */}
      <button onClick={toggleList} className="pokemon-hide-button">
        {showList ? 'Hide Pokémon List' : 'Show Pokémon List'}
      </button>

      {/* Display filtered Pokémon list with sorting */}
      {showList && (
        <div className="pokemonList">
          <h3>List of all Pokémon</h3>
          <ul className="pokemonList2">
            {filteredPokemonList.map((pokemon, index) => (
              <li key={index}>
                Name: {pokemon.name}, ID: {pokemon.id}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonSearchApp;
