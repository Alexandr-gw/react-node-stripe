import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import BooksList from '../src/components/BooksList';
import rootReducer from '../src/store/reducers/rootReducer';

jest.mock('../src/components/CheckoutBtn', () => () => <div data-testid="mock-checkout-button">Mock CheckoutButton</div>);
jest.mock('../src/components/BookModal', () => ({ isOpen, onClose, onSubmit, book }) => (
    isOpen ? (
        <div data-testid="mock-book-modal">
            Mock BookModal
            <button data-testid="submit-button" onClick={() => onSubmit({ title: 'New Book', author: 'Author', price: 20, read: false })}>
                Submit
            </button>
        </div>
    ) : null
));
jest.mock('../src/components/LoadingPage', () => () => <div data-testid="mock-loading-page">Loading...</div>);

describe('BooksList Component', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: rootReducer,
        });
    });

    it('renders LoadingPage when loading is true', () => {
        store = configureStore({
            reducer: rootReducer,
            preloadedState: {
                books: {
                    books: [],
                    loading: true,
                },
            },
        });

        render(
            <Provider store={store}>
                <BooksList />
            </Provider>
        );

        expect(screen.getByTestId('mock-loading-page')).toBeInTheDocument();
    });

    it('renders the list of books correctly', () => {
        store = configureStore({
            reducer: rootReducer,
            preloadedState: {
                books: {
                    books: [
                        { id: 1, title: "Book One", author: "Author One", read: true, price: 10 },
                        { id: 2, title: "Book Two", author: "Author Two", read: false, price: 15 },
                    ],
                    loading: false,
                },
            },
        });

        render(
            <Provider store={store}>
                <BooksList />
            </Provider>
        );

        expect(screen.getByText('Book One')).toBeInTheDocument();
        expect(screen.getByText('Author One')).toBeInTheDocument();
        expect(screen.getByText('Yes')).toBeInTheDocument();
        expect(screen.getByText('$10')).toBeInTheDocument();
        expect(screen.getByText('Book Two')).toBeInTheDocument();
        expect(screen.getByText('Author Two')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
        expect(screen.getByText('$15')).toBeInTheDocument();
        expect(screen.getAllByTestId('mock-checkout-button').length).toBe(2);
    });

    it('opens the modal when Add Book button is clicked', () => {
        store = configureStore({
            reducer: rootReducer,
            preloadedState: {
                books: {
                    books: [],
                    loading: false,
                },
            },
        });

        render(
            <Provider store={store}>
                <BooksList />
            </Provider>
        );

        fireEvent.click(screen.getByText('Add Book'));

        expect(screen.getByTestId('mock-book-modal')).toBeInTheDocument();
    });

    it('dispatches getBooks on component mount', () => {
        render(
            <Provider store={store}>
                <BooksList />
            </Provider>
        );

        const actions = store.getState().books;
        expect(actions.loading).toEqual(true);
        expect(actions.books).toEqual([]);
    });
});
