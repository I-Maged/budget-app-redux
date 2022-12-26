import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore/lite';

const accountsAdapter = createEntityAdapter();

const initialState = accountsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async () => {
    const accountsCol = collection(db, 'accounts');
    const accountsSnapshot = await getDocs(accountsCol);
    const accountsList = [];
    accountsSnapshot.forEach((doc) => {
      return accountsList.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return accountsList;
  }
);

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
