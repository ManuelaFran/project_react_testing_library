import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Testando o NotFound.js', () => {
  test('Testa se a pg contém um heading h2 com o text Page requested not found 😭', () => {
    render(<NotFound />);
    const textH2 = screen.getByText(/Page requested not found/i);
    expect(textH2).toBeInTheDocument();
  });

  test('Testa se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const image = screen.getByAltText(/Pikachu crying because the page/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
