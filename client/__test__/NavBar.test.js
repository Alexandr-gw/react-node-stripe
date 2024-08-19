import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NavBar from '../src/components/NavBar';
import userEvent from '@testing-library/user-event';

describe('NavBar', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Books')).toBeInTheDocument();
    expect(getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(getByText('Books').closest('a')).toHaveAttribute('href', '/BooksList');
  });

  it('redirects to the Home page after click', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <NavBar />
      </Router>
    );

    userEvent.click(screen.getByTestId('HomePage'));
    expect(history.location.pathname).toBe('/');
  });

  it('redirects to the BooksList page after click', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <NavBar />
      </Router>
    );

    userEvent.click(screen.getByTestId('BooksList'));
    expect(history.location.pathname).toBe('/BooksList');
  });
});
