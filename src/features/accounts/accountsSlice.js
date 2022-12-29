import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {
  fetchAccounts,
  addNewAccount,
  deleteAccount,
  updateAccount,
} from './accountsActions';

const accountsAdapter = createEntityAdapter();

const initialState = accountsAdapter.getInitialState({
  status: 'idle',
  error: null,
  edit: null,
});

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    handleEdit(state, action) {
      // state.edit.id = action.payload[0];
      // state.edit.account = action.payload[1];
      state.edit = { id: action.payload[0], account: action.payload[1] };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        accountsAdapter.upsertMany(state, action.payload);
        state.error = null;
      })
      .addCase(fetchAccounts.rejected, (state) => {
        state.status = 'failed';
        state.error = "Couldn't fetch data";
      })
      .addCase(addNewAccount.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(addNewAccount.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        accountsAdapter.addOne(state, action.payload);
      })
      .addCase(addNewAccount.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Couldn not add new account';
      })
      .addCase(deleteAccount.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        accountsAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Error: could not delete account';
      })
      .addCase(updateAccount.pending, (state) => {
        state.edit = null;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        accountsAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateAccount.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Error: could not Update account';
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

export const { handleEdit } = accountsSlice.actions;
