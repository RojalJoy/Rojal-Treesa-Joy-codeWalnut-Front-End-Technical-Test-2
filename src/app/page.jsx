"use client";

import React, { useState, useEffect } from 'react';


const PokemonSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [showList, setShowList] = useState(false); 


  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
        const data = await response.json();
        const names = data.results.map(pokemon => pokemon.name);
        setPokemonList(names);
      } catch (err) {
        console.error('Failed to fetch Pokemon list:', err);
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
        throw new Error('Pokemon not found');
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

  return (
    <div className="poke">
      <h1 className='poke_heading'>Pokemon GO</h1>
      
      <form onSubmit={handleSearch} className="poke_search">
        <input 
          type="text" 
          placeholder="Enter Pokemon name or ID" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Search</button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
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

    
      <button onClick={toggleList} className="pokemon-hide-button">
        {showList ? 'Hide Pokemon List' : 'Show Pokemon List'}
      </button>

      {showList && (
        <div className="pokemonList">
          <h3>List of all the Pokemons</h3>
          <ul className='pokemonList2'>
            {pokemonList.map((pokemonName, index) => (
              <li 
              key={index}>{pokemonName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonSearchApp;
