import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore/lite';

const initialState = {
  accounts: [],
  status: 'idle',
  error: null,
};

export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async () => {
    const accountsCol = collection(db, 'accounts');
    const accountsSnapshot = await getDocs(accountsCol);
    const accountsList = accountsSnapshot.docs.map((doc) => doc.data());
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
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default accountsSlice.reducer;

export const selectAllAccounts = (state) => state.accounts.accounts;
