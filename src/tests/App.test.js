import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Header from '../components/Header';
import AddForm from '../components/AddForm';
import App from '../App';

describe('test Header component by role', () => {
  it('renders heading', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(screen.getByRole('heading').textContent).toMatch(/Your budget in/i);
  });
});

describe('test Header component by text', () => {
  it('renders heading text', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(screen.getByRole('heading')).toHaveTextContent('Your budget in');
  });
});

describe('test total income', () => {
  it('test default display total income', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // screen.debug();

    const totalIncome = screen.getByTestId('budgetIncome');
    const incomeText = totalIncome.firstChild;
    const incomeValue = totalIncome.lastChild;

    expect(incomeText).toHaveTextContent('income');
    expect(incomeValue).toHaveTextContent(0.0);
  });
});

describe('add form', () => {
  it('return description error', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    userEvent.click(screen.getByRole('button', { name: /add/i }));

    // expect(
    //   await screen.findByText(/description cannot be empty/i)
    // ).toBeVisible();
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Description cannot be empty'
    );
  });
});
