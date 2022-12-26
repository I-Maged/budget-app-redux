import { selectAccountsByType } from '../features/accounts/accountsSlice';
import { useSelector } from 'react-redux';

const DisplayAccounts = () => {
  const incomeArray = useSelector((state) => selectAccountsByType(state, '+'));
  const expensesArray = useSelector((state) =>
    selectAccountsByType(state, '-')
  );
  return (
    <div className='displayAllAccounts flex'>
      <ul className='incomeList flex'>
        {incomeArray.map((account) => (
          <li key={account.id} className='budgetIncome flex'>
            <div className='title'>{account.data.name}</div>
            <div>{account.data.value}</div>
          </li>
        ))}
      </ul>
      <ul className='expensesList flex'>
        {expensesArray.map((account) => (
          <li key={account.id} className='budgetExpenses flex'>
            <div className='title'>{account.data.name}</div>
            <div>{account.data.value}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayAccounts;
