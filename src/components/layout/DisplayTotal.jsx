import {
  // fetchAccounts,
  selectAccountsByType,
} from '../../features/accounts/accountsSlice';
import { fetchAccounts } from '../../features/accounts/accountsActions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const DisplayTotal = () => {
  const dispatch = useDispatch();
  const accountsStatus = useSelector((state) => state.accounts.status);
  const incomeArray = useSelector((state) => selectAccountsByType(state, '+'));
  const expensesArray = useSelector((state) =>
    selectAccountsByType(state, '-')
  );

  const incomeTotal = incomeArray.reduce((sum, account) => {
    return sum + account.data.value;
  }, 0);
  const expensesTotal = expensesArray.reduce((sum, account) => {
    return sum + account.data.value;
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
        <div>-{expensesTotal}</div>
      </div>
    </div>
  );
};

export default DisplayTotal;
