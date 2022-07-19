import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o PokemonDetails.js', () => {
  test(`Testa se as informações detalhadas do pokémon selecionado são
  mostradas na tela`, () => {
    const { getByText, getByRole } = renderWithRouter(
      <App />,
    );
    const pokemonDetails = getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);
    const pokemonName = getByRole('heading', { name: /Pikachu Details/i });
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonDetails).not.toBeInTheDocument();

    expect(getByRole('heading', { name: /Summary/i })).toBeInTheDocument();
    const summaryParagraph = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(summaryParagraph).toBeInTheDocument();
  });

  test(`Testa se existe na página uma seção com os mapas contendo as localizações
  do pokémon`, () => {
    const { getAllByAltText, getByRole, getByText } = renderWithRouter(
      <App />,
    );
    const pokemonDetails = getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);

    expect(
      getByRole('heading', { name: /Game Locations of Pikachu/i }),
    ).toBeInTheDocument();

    const showForestLocation = getByText(/Kanto Viridian Forest/i);
    expect(showForestLocation).toBeInTheDocument();

    const showForestImage = getAllByAltText(/Pikachu location/i)[0];
    expect(showForestImage).toBeInTheDocument();
    expect(showForestImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    const showPlantLocation = getByText(/Kanto Power Plant/i);
    expect(showPlantLocation).toBeInTheDocument();

    const showPlantImage = getAllByAltText(/Pikachu location/i)[1];
    expect(showPlantImage).toBeInTheDocument();
    expect(showPlantImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test(`Testa se o usuário pode favoritar um pokémon através da página de
  detalhes`, () => {
    const { getByRole, getByText } = renderWithRouter(
      <App />,
    );
    const pokemonDetails = getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);

    const checkbox = getByText(/pokémon favoritado\?/i);
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    userEvent.click(getByRole('link', { name: /favorite pokémons/i }));
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });
});
