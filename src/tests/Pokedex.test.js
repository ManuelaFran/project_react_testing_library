import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';
import pokemons from '../data';

const pokemonFilter = () => {
  const pokemonData = {};
  pokemons.forEach((pokemon) => {
    pokemonData[pokemon.id] = false;
  });
  return pokemonData;
};

describe('Testando o Pokedex.js', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ pokemonFilter() }
    />);

    const textH2 = getByText(/Encountered pokémons/i);
    expect(textH2).toBeInTheDocument();
  });

  test(`Testa se é exibido o próximo pokémon da lista quando o botão Próximo
    pokémon é clicado`, () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ pokemonFilter() }
    />);

    const nextButton = getByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      expect(getByText(`${pokemon.name}`)).toBeInTheDocument();
      userEvent.click(nextButton);
    });
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ pokemonFilter() }
    />);
    const showPokemon = getAllByTestId('pokemon-name');
    expect(showPokemon).toHaveLength(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ pokemonFilter() }
    />);

    const buttonAll = getByText(/All/i);
    expect(buttonAll).toBeInTheDocument();

    const pokemonType = getByText(/Psychic/i);
    expect(pokemonType).toBeInTheDocument();

    const typeButton = getAllByTestId('pokemon-type-button');
    expect(typeButton[1]).toBeInTheDocument();
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ pokemonFilter() }
    />);

    const resetButton = getByText(/All/i);
    expect(resetButton).toBeInTheDocument();

    userEvent.click(resetButton);
    const pokemonName = getByText(/Pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });
});
