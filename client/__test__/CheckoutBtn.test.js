import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import CheckoutButton from '../src/components/CheckoutBtn';
import { checkoutAction } from '../src/store/actions/actionsStripe';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@stripe/react-stripe-js', () => ({
  useStripe: jest.fn(),
}));

jest.mock('../src/store/actions/actionsStripe', () => ({
  checkoutAction: jest.fn(),
}));

describe('CheckoutButton', () => {
  let dispatchMock, useSelectorMock, useStripeMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    useSelectorMock = jest.spyOn(require('react-redux'), 'useSelector');
    useStripeMock = jest.spyOn(require('@stripe/react-stripe-js'), 'useStripe');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches checkoutAction when Pay button is clicked', () => {
    useSelectorMock.mockReturnValue({ url: null, loading: false });
    useStripeMock.mockReturnValue({});

    const book = { id: 1 };
    render(<CheckoutButton book={book} />);

    fireEvent.click(screen.getByText('Pay'));

    expect(dispatchMock).toHaveBeenCalledWith(checkoutAction({ quantity: 1, id: book.id }));
  });

  it('does not dispatch checkoutAction if stripe is not available', () => {
    useSelectorMock.mockReturnValue({ url: null, loading: false });
    useStripeMock.mockReturnValue(null); // Stripe not available

    const book = { id: 1 };
    render(<CheckoutButton book={book} />);

    fireEvent.click(screen.getByText('Pay'));

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('does not dispatch checkoutAction if loading is true', () => {
    useSelectorMock.mockReturnValue({ url: null, loading: true });
    useStripeMock.mockReturnValue({});

    const book = { id: 1 };
    render(<CheckoutButton book={book} />);

    fireEvent.click(screen.getByText('Pay'));

    expect(dispatchMock).not.toHaveBeenCalled();
  })
});
