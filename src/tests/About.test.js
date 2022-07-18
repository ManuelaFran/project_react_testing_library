import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Testando o About.js', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const pokedex = screen.getByText(/About Pokédex/i);
    expect(pokedex).toBeInTheDocument();
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const textH2 = screen.getByText(/About Pokédex/i);
    expect(textH2).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraphOne = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraphOne).toHaveTextContent(
      /This application simulates a Pokédex,/,
      /a digital encliclopedia containing all Pokémons/i,
    );

    const paragraphTwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraphTwo).toHaveTextContent(
      /One can filter Pokémons by type,/,
      /and see more details for each one of them/i,
    );
  });

  test('Testa se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    render(<About />);
    const image = screen.getByAltText(/pokédex/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
