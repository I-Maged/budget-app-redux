import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase.config';
import { getDocs, collection, addDoc } from 'firebase/firestore/lite';

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

export const addNewAccount = createAsyncThunk(
  'accounts/addNewAccount',
  async (newAccount) => {
    const response = await addDoc(collection(db, 'accounts'), newAccount);
    return {
      id: response.id,
      data: newAccount,
    };
  }
);
