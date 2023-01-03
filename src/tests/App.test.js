import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Header from '../components/Header';

describe('test Header component by role', () => {
  it('renders correct heading', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(screen.getByRole('heading').textContent).toMatch(/Your budget in/i);
  });
});
