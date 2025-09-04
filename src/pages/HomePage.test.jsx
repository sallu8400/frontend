import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HomePage from './HomePage';

const mockStore = configureStore([]);

const initialState = {
  pagination: {
    data: [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' }
    ],
    loading: false,
    error: null,
    total: 2,
    currentPage: 1,
    pages: 1
  },
  wishlist: {}
};

function renderWithStore(state = initialState) {
  const store = mockStore(state);
  return render(
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}

test('renders loading state', () => {
  renderWithStore({
    ...initialState,
    pagination: { ...initialState.pagination, loading: true }
  });
  expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
});

test('renders error state', () => {
  renderWithStore({
    ...initialState,
    pagination: { ...initialState.pagination, error: 'Network error' }
  });
  expect(screen.getByText(/Error loading products/i)).toBeInTheDocument();
});

test('renders products grid', () => {
  renderWithStore();
  expect(screen.getByText(/Featured Products/i)).toBeInTheDocument();
  expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
});

test('renders empty state', () => {
  renderWithStore({
    ...initialState,
    pagination: { ...initialState.pagination, data: [] }
  });
  expect(screen.getByText(/No products available/i)).toBeInTheDocument();
});
