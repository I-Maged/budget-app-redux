import { selectAccountsByType } from '../../features/accounts/accountsSlice';
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

  let incomeTotal = incomeArray.reduce((sum, account) => {
    return typeof account.data.value == 'number'
      ? sum + account.data.value
      : sum;
  }, 0);
  let expensesTotal = expensesArray.reduce((sum, account) => {
    return typeof account.data.value == 'number'
      ? sum + account.data.value
      : sum;
  }, 0);
  let total = incomeTotal - expensesTotal;

  incomeTotal = incomeTotal.toFixed(1);
  expensesTotal = expensesTotal.toFixed(1);
  total = total.toFixed(1);

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
