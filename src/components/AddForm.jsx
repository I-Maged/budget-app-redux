import { useState, useEffect } from 'react';
import {
  addNewAccount,
  updateAccount,
} from '../features/accounts/accountsActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddForm = () => {
  const editStatus = useSelector((state) => state.accounts.edit);
  const errorStatus = useSelector((state) => state.accounts.error);

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [type, setType] = useState('+');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (editStatus) {
      setName(editStatus.account.name);
      setType(editStatus.account.type);
      setValue(editStatus.account.value);
    }
  }, [editStatus]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      return console.log('Description cannot be empty');
    }
    if (value <= 0) {
      return console.log('Value cannot be less that or equal to 0');
    }

    if (editStatus) {
      const newData = { id: editStatus.id, name, type, value };
      try {
        dispatch(updateAccount(newData));
      } catch (err) {
        console.error('Failed to edit the post: ', err);
      }
    } else {
      try {
        await dispatch(addNewAccount({ name, type, value })).unwrap();
      } catch (err) {
        console.error('Failed to save the post: ', err);
        toast.error(errorStatus);
      }
    }

    setName('');
    setType('+');
    setValue('');
  };

  return (
    <form className='accountForm flex' onSubmit={submitForm}>
      <input
        type='text'
        className='accountName'
        placeholder='add description'
        id='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        className='accountType'
        id='type'
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option defaultValue='+'>+</option>
        <option value='-'>-</option>
      </select>
      <input
        type='number'
        min='0'
        className='accountValue'
        id='value'
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <button type='submit' className='formBtn'>
        {editStatus ? 'Edit' : 'Add'}
      </button>
    </form>
  );
};

export default AddForm;
