import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../src/routes/AppRoutes';
import App from '../src/App';

describe('AppRoutes', () => {
  it('renders Home page correctly', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(getByText('Home')).toBeInTheDocument();
  });

  it('renders BooksList page correctly', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/BooksList']}>
        <App />
      </MemoryRouter>
    );

    expect(getByText('Books List')).toBeInTheDocument();
  });

  it('renders ErrorPage on unknown routes', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/unknown']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
