import {
  fetchAccounts,
  selectAllAccounts,
} from '../../features/accounts/accountsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const DisplayTotal = () => {
  const dispatch = useDispatch();
  const accountsStatus = useSelector((state) => state.accounts.status);
  const accounts = useSelector(selectAllAccounts);

  const incomeTotal = accounts.reduce((sum, account) => {
    return account.type === '+' ? sum + account.value : sum;
  }, 0);
  const expensesTotal = accounts.reduce((sum, account) => {
    return account.type === '-' ? sum + account.value : sum;
  }, 0);
  const total = incomeTotal - expensesTotal;

  useEffect(() => {
    if (accountsStatus === 'idle') {
      dispatch(fetchAccounts());
    }
  }, [accountsStatus, dispatch]);

  return (
    <div className='budgetDisplay flex'>
      <div className='budgetIncome flex'>
        <div className='title'>income</div>
        <div>{incomeTotal}</div>
      </div>
      <div className='budgetTotal flex'>
        <div className='title'>total</div>
        <div>{total}</div>
      </div>
      <div className='budgetExpenses flex'>
        <div className='title'>expenses</div>
        <div>{expensesTotal}</div>
      </div>
    </div>
  );
};

export default DisplayTotal;
