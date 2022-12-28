import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { fetchAccounts, addNewAccount, deleteAccount } from './accountsActions';

const accountsAdapter = createEntityAdapter();

const initialState = accountsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        accountsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewAccount.pending, (state) => {
        state.status = 'loading';
      })
      // .addCase(addNewAccount.fulfilled, accountsAdapter.addOne)
      .addCase(addNewAccount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        accountsAdapter.addOne(state, action.payload);
      })
      .addCase(addNewAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.status = 'loading';
      })
      // .addCase(deleteAccount.fulfilled, accountsAdapter.removeOne)
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        accountsAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default accountsSlice.reducer;

export const { selectAll: selectAllAccounts } = accountsAdapter.getSelectors(
  (state) => state.accounts
);

export const selectAccountsByType = createSelector(
  [selectAllAccounts, (state, type) => type],
  (accounts, type) => accounts.filter((account) => account.data.type === type)
);
