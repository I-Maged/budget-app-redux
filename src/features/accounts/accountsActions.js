import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase.config';
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore/lite';

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
export const deleteAccount = createAsyncThunk(
  'accounts/deleteAccount',
  async (accountId) => {
    await deleteDoc(doc(db, 'accounts', accountId));
    return accountId;
  }
);
export const updateAccount = createAsyncThunk(
  'accounts/updateAccount',
  async (newData) => {
    const editAccountData = {
      name: newData.name,
      type: newData.type,
      value: newData.value,
    };
    const docRef = doc(db, 'accounts', newData.id);
    await updateDoc(docRef, newData);

    return {
      id: newData.id,
      data: editAccountData,
    };
  }
);
