import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o App.js', () => {
  test('Testa se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location; // retorna a URL exata em que eu estou.
    expect(pathname).toBe('/');

    const homeTitle = screen.getByRole('heading', { name: /pokémons/i });
    expect(homeTitle).toBeInTheDocument();
  });

  test('Testa se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutTitle = screen.getByText(/About Pokédex/i);
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Testa se a aplicação é redirecionada para a pág de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokemonsLink).toBeInTheDocument();
    userEvent.click(favoritePokemonsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favoriteTitle = screen.getByRole('heading', { name: /Favorite/i });
    expect(favoriteTitle).toBeInTheDocument();
  });

  test('Testa se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/urlDesconhecida'); // para onde eu quero ir.

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
