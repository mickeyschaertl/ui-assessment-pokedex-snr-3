import React from 'react';
import { createUseStyles } from 'react-jss';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import { getTypeColor } from '../../utils/typeColors';

export const PokemonDetails = () => {
  const classes = useStyles();
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const navigate = useNavigate();
  const { pokemon, loading, error } = useGetPokemon(undefined, pokemonId);

  const handleClose = () => {
    navigate('/pokemon');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (loading) {
    return (
      <div className={classes.backdrop} onClick={handleBackdropClick}>
        <div className={classes.dialog}>
          <div className={classes.loading}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className={classes.backdrop} onClick={handleBackdropClick}>
        <div className={classes.dialog}>
          <div className={classes.error}>
            <h2>Pokémon not found</h2>
            <p>Sorry, we couldn't find that Pokémon.</p>
            <button onClick={handleClose} className={classes.closeButton}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.backdrop} onClick={handleBackdropClick}>
      <div className={classes.dialog}>
        <div className={classes.header}>
          <div className={classes.titleContainer}>
            <h2 className={classes.title}>{pokemon.name}</h2>
            <div className={classes.number}>#{pokemon.number}</div>
          </div>
          <button onClick={handleClose} className={classes.closeButton}>
            ×
          </button>
        </div>
        
        <div className={classes.content}>
          <div className={classes.imageContainer}>
            <img src={pokemon.image} alt={pokemon.name} className={classes.image} />
          </div>
          
          <div className={classes.details}>
            <div className={classes.section}>
              <h3>Types</h3>
              <div className={classes.types}>
                {pokemon.types.map((type) => (
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
            
            <div className={classes.section}>
              <h3>Weak Against</h3>
              <div className={classes.weaknesses}>
                {pokemon.weaknesses.map((weakness) => (
                  <span 
                    key={weakness} 
                    className={classes.weaknessBadge}
                    style={{ backgroundColor: getTypeColor(weakness) }}
                  >
                    {weakness}
                  </span>
                ))}
              </div>
            </div>
            
            <div className={classes.section}>
              <h3>Resistant To</h3>
              <div className={classes.resistances}>
                {pokemon.resistant.map((resistance) => (
                  <span 
                    key={resistance} 
                    className={classes.resistanceBadge}
                    style={{ backgroundColor: getTypeColor(resistance) }}
                  >
                    {resistance}
                  </span>
                ))}
              </div>
            </div>
            
            <div className={classes.section}>
              <h3>Classification</h3>
              <p>{pokemon.classification}</p>
            </div>
            
            <div className={classes.section}>
              <h3>Stats</h3>
              <div className={classes.stats}>
                <div className={classes.stat}>
                  <span className={classes.statLabel}>Max CP:</span>
                  <span className={classes.statValue}>{pokemon.maxCP}</span>
                </div>
                <div className={classes.stat}>
                  <span className={classes.statLabel}>Max HP:</span>
                  <span className={classes.statValue}>{pokemon.maxHP}</span>
                </div>
                <div className={classes.stat}>
                  <span className={classes.statLabel}>Flee Rate:</span>
                  <span className={classes.statValue}>{(pokemon.fleeRate * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            
            <div className={classes.section}>
              <h3>Physical</h3>
              <div className={classes.physical}>
                <div className={classes.physicalItem}>
                  <span className={classes.physicalLabel}>Height:</span>
                  <span className={classes.physicalValue}>
                    {pokemon.height.minimum} - {pokemon.height.maximum}
                  </span>
                </div>
                <div className={classes.physicalItem}>
                  <span className={classes.physicalLabel}>Weight:</span>
                  <span className={classes.physicalValue}>
                    {pokemon.weight.minimum} - {pokemon.weight.maximum}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    dialog: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px',
      borderBottom: '1px solid #e0e0e0',
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    title: {
      margin: 0,
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      textTransform: 'capitalize',
    },
    number: {
      fontSize: '16px',
      color: '#666',
      fontWeight: '500',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#666',
      padding: '4px 8px',
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: '#f0f0f0',
        color: '#333',
      },
    },
    content: {
      padding: '24px',
    },
    imageContainer: {
      textAlign: 'center',
      marginBottom: '24px',
    },
    image: {
      width: '200px',
      height: '200px',
      objectFit: 'contain',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    section: {
      '& h3': {
        margin: '0 0 12px 0',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
      },
      '& p': {
        margin: 0,
        color: '#666',
        fontSize: '16px',
      },
    },
    types: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    },
    typeBadge: {
      padding: '6px 12px',
      borderRadius: '16px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#fff',
      textTransform: 'capitalize',
      minWidth: '60px',
      textAlign: 'center',
      display: 'inline-block',
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '12px',
    },
    stat: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 12px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
    },
    statLabel: {
      fontWeight: '500',
      color: '#666',
    },
    statValue: {
      fontWeight: 'bold',
      color: '#333',
    },
    physical: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    physicalItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 12px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
    },
    physicalLabel: {
      fontWeight: '500',
      color: '#666',
    },
    physicalValue: {
      fontWeight: 'bold',
      color: '#333',
    },
    resistances: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
    },
    resistanceBadge: {
      padding: '6px 12px',
      borderRadius: '16px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#fff',
      textTransform: 'capitalize',
      minWidth: '60px',
      textAlign: 'center',
      display: 'inline-block',
    },
    weaknesses: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
    },
    weaknessBadge: {
      padding: '6px 12px',
      borderRadius: '16px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#fff',
      textTransform: 'capitalize',
      minWidth: '60px',
      textAlign: 'center',
      display: 'inline-block',
    },
    loading: {
      padding: '40px',
      textAlign: 'center',
      fontSize: '18px',
      color: '#666',
    },
    error: {
      padding: '40px',
      textAlign: 'center',
      '& h2': {
        margin: '0 0 12px 0',
        color: '#333',
      },
      '& p': {
        margin: '0 0 20px 0',
        color: '#666',
      },
    },
  },
  { name: 'PokemonDetails' }
);
