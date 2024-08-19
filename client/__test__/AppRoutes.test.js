import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../src/routes/AppRoutes';
import { screen } from '@testing-library/dom';

jest.mock('../src/components/BooksList', () => () => <div data-testid="mock-book-list">Mock BookList</div>);
jest.mock('../src/components/LoadingPage', () => () => <div data-testid="home">Loading...</div>);

describe('AppRoutes', () => {
  it('renders Home page correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Home of many books')).toBeInTheDocument();
  });

  it('renders BooksList page correctly', () => {
    render(
      <MemoryRouter initialEntries={['/BooksList']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Mock BookList')).toBeInTheDocument();
  });

  it('renders ErrorPage on unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Oops!')).toBeInTheDocument();
  });

  it('renders LoadingPage on loading', () => {
    render(
      <MemoryRouter initialEntries={['/LoadingPage']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
