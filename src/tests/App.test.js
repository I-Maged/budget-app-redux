import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Header from '../components/Header';
import App from '../App';

test('render header properly', () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  expect(screen.getByRole('banner')).toBeVisible();
  expect(screen.getByRole('heading').textContent).toMatch(/Your budget in/i);
  expect(screen.getByText(/income/i)).toBeInTheDocument();
  expect(screen.getByText(/total/i)).toBeInTheDocument();
  expect(screen.getByText(/expenses/i)).toBeInTheDocument();
});

describe('account test', () => {
  it('user can add account', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const formDes = screen.getByRole('textbox', { name: /description/i });
    const formVal = screen.getByRole('spinbutton', { name: /value/i });
    const formBtn = screen.getByRole('button', { name: /add/i });

    // show empty description error
    userEvent.click(formBtn);
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Description cannot be empty'
    );

    // show empty value error
    await userEvent.type(formDes, 'test');
    await userEvent.click(formBtn);
    expect(
      await screen.findByText(/value cannot be less that or equal to 0/i)
    ).toBeVisible();

    //add account
    await userEvent.type(formVal, '123');
    await userEvent.click(formBtn);
    expect(await screen.findByText(/test/i)).toBeInTheDocument();
    expect(await screen.getByDisplayValue(123)).toBeInTheDocument();
  });
});

// describe('test Header component by role', () => {
//   it('renders heading', () => {
//     render(
//       <Provider store={store}>
//         <Header />
//       </Provider>
//     );
//     expect(screen.getByRole('heading').textContent).toMatch(/Your budget in/i);
//   });
// });

// describe('test Header component by text', () => {
//   it('renders heading text', () => {
//     render(
//       <Provider store={store}>
//         <Header />
//       </Provider>
//     );
//     expect(screen.getByRole('heading')).toHaveTextContent('Your budget in');
//   });
// });

// describe('test total income', () => {
//   it('test default display total income', () => {
//     render(
//       <Provider store={store}>
//         <Header />
//       </Provider>
//     );

//     const totalIncome = screen.getByTestId('budgetIncome');
//     const incomeText = totalIncome.firstChild;
//     const incomeValue = totalIncome.lastChild;

//     expect(incomeText).toHaveTextContent('income');
//     expect(incomeValue).toHaveTextContent(0.0);
//   });
// });

// describe('add form', () => {
//   it('return description error', async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     );

//     userEvent.click(screen.getByRole('button', { name: /add/i }));

//     expect(await screen.findByRole('alert')).toHaveTextContent(
//       'Description cannot be empty'
//     );
//   });
// });

// describe('add form', () => {
//   it('return value error', async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     );

//     const formDes = screen.getByRole('textbox', { name: /description/i });

//     // fireEvent.change(formDes, { target: { value: 'test' } });
//     // userEvent.click(screen.getByRole('button', { name: /add/i }));
//     await userEvent.type(formDes, 'Knight');
//     await userEvent.click(screen.getByRole('button', { name: /add/i }));

//     expect(
//       await screen.findByText(/value cannot be less that or equal to 0/i)
//     ).toBeVisible();
//   });
// });
