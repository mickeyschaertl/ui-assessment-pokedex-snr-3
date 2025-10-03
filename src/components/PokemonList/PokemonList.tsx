import React, { useState, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { useGetPokemons } from '../../hooks/useGetPokemons';

const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    'Normal': '#A8A878',
    'Fire': '#F08030',
    'Water': '#6890F0',
    'Electric': '#F8D030',
    'Grass': '#78C850',
    'Ice': '#98D8D8',
    'Fighting': '#C03028',
    'Poison': '#A040A0',
    'Ground': '#E0C068',
    'Flying': '#A890F0',
    'Psychic': '#F85888',
    'Bug': '#A8B820',
    'Rock': '#B8A038',
    'Ghost': '#705898',
    'Dragon': '#7038F8',
    'Dark': '#705848',
    'Steel': '#B8B8D0',
    'Fairy': '#EE99AC',
  };
  return typeColors[type] || '#A8A878'; // Default to Normal color
};

export const PokemonList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pokemons, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPokemons = useMemo(() => {
    if (!searchTerm.trim()) return pokemons;
    
    return pokemons.filter((pokemon) => 
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.number.includes(searchTerm) ||
      pokemon.types.some(type => 
        type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [pokemons, searchTerm]);

  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search Pokémon by name, number, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchInput}
        />
      </div>
      {loading && <div>Loading...</div>}
      <div className={classes.grid}>
        {filteredPokemons.map((pkmn) => (
          <div 
            key={pkmn.id} 
            className={classes.card}
            onClick={() => navigate(`/pokemon/${pkmn.name.toLowerCase()}`)}
          >
            <img 
              src={pkmn.image} 
              alt={pkmn.name}
              className={classes.image}
            />
            <div className={classes.name}>{pkmn.name}</div>
            <div className={classes.number}>#{pkmn.number}</div>
            <div className={classes.types}>
              {pkmn.types.map((type) => (
                <span 
                  key={type} 
                  className={classes.typeBadge}
                  style={{ backgroundColor: getTypeColor(type) }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      padding: '32px',
      boxSizing: 'border-box',
    },
    searchContainer: {
      maxWidth: '1200px',
      margin: '0 auto 32px auto',
      padding: '0 16px',
      display: 'flex',
      justifyContent: 'center',
    },
    searchInput: {
      width: '100%',
      maxWidth: '400px',
      padding: '12px 16px',
      fontSize: '16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      outline: 'none',
      backgroundColor: '#fff',
      color: '#333',
      transition: 'border-color 0.2s ease-in-out',
      '&:focus': {
        borderColor: '#6890F0',
        boxShadow: '0 0 0 3px rgba(104, 144, 240, 0.1)',
      },
      '&::placeholder': {
        color: '#999',
      },
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '16px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
    },
    image: {
      width: '120px',
      height: '120px',
      objectFit: 'contain',
      marginBottom: '12px',
    },
    name: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '4px',
      color: '#333',
      textTransform: 'capitalize',
    },
    number: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '8px',
      fontWeight: '500',
    },
    types: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px',
      justifyContent: 'center',
    },
    typeBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      textTransform: 'capitalize',
      color: '#fff',
      minWidth: '60px',
      textAlign: 'center',
      display: 'inline-block',
    },
  },
  { name: 'PokemonList' }
);
