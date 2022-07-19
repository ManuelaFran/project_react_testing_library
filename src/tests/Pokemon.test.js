import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testando o Pokemon.js', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByText, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const showName = getByTestId('pokemon-name');
    expect(showName).toBeInTheDocument();
    expect(showName).toHaveTextContent(/Pikachu/i);

    const showType = getByTestId('pokemon-type');
    expect(showType).toBeInTheDocument();
    expect(showType).toHaveTextContent(/Electric/i);

    const showAverageWeight = getByText(/Average weight/i);
    expect(showAverageWeight).toBeInTheDocument();
    expect(showAverageWeight).toHaveTextContent(/Average weight: 6.0 kg/i);

    const showImage = getByAltText(/Pikachu sprite/i);
    expect(showImage).toBeInTheDocument();
    expect(showImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`Testa se o card do pokémon indicado na Pokédex contém um link de navegação
  para exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>, 
  onde <id> é o id do pokémon exibido`, () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const showLink = getByRole('link', { name: /more details/i });
    expect(showLink).toBeInTheDocument();
    expect(showLink).toHaveAttribute('href', '/pokemons/25');
  });

  test(`Testa se ao clicar no link de navegação do pokémon, é feito o redirecionamento
  da aplicação para a página de detalhes de pokémon`, () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const linkMoreDetails = getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);
  });

  test(`Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id>
  é o id do pokémon cujos detalhes se deseja ver`, () => {
    const { history, getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const linkMoreDetails = getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const starIcon = getByAltText(/Pikachu is marked as favorite/i);
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
