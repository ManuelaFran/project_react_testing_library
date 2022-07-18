import React from 'react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testando o FavoritePokemons.js', () => {
  test('Testa se é exibida na tela a mensagem "No favorite pokemon found".', () => {
    const isFavorite = [];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemon={ isFavorite } />);
    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  test('Testa se são exibidos todos os cards de pokémons favoritados.', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    const favoriteCards = getAllByTestId('pokemon-weight');
    expect(favoriteCards[1]).toHaveTextContent(/Average weight: 8.5 kg/i);
    expect(favoriteCards[5]).toHaveTextContent(/Average weight: 4.0 kg/i);
  });
});
