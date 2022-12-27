import { selectAccountsByType } from '../features/accounts/accountsSlice';
import { useSelector } from 'react-redux';
import { FaTimes, FaEdit } from 'react-icons/fa';
import Spinner from './layout/Spinner';

const DisplayAccounts = () => {
  const status = useSelector((state) => state.accounts.status);

  const incomeArray = useSelector((state) => selectAccountsByType(state, '+'));
  const expensesArray = useSelector((state) =>
    selectAccountsByType(state, '-')
  );

  if (status === 'loading') {
    return <Spinner />;
  }
  return (
    <div className='displayAllAccounts flex'>
      <ul className='incomeList flex'>
        {incomeArray.map((account) => (
          <li key={account.id} className='budgetIncome flex'>
            <div className='title'>{account.data.name}</div>
            <div>{account.data.value}</div>
            <button className='accountBtns'>
              <FaEdit color='white' />
            </button>
            <button className='accountBtns'>
              <FaTimes color='white' />
            </button>
          </li>
        ))}
      </ul>
      <ul className='expensesList flex'>
        {expensesArray.map((account) => (
          <li key={account.id} className='budgetExpenses flex'>
            <div className='title'>{account.data.name}</div>
            <div>{account.data.value}</div>
            <button className='accountBtns'>
              <FaEdit color='white' />
            </button>
            <button className='accountBtns'>
              <FaTimes color='white' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayAccounts;
