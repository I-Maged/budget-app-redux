import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewAccount,
  updateAccount,
} from '../features/accounts/accountsActions';
import { toast } from 'react-toastify';

const AddForm = () => {
  const editStatus = useSelector((state) => state.accounts.edit);

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
      return toast.error('Description cannot be empty');
    }
    if (value <= 0) {
      return toast.error('Value cannot be less that or equal to 0');
    }

    if (editStatus) {
      const newData = { id: editStatus.id, name, type, value };
      dispatch(updateAccount(newData));
    } else {
      await dispatch(addNewAccount({ name, type, value })).unwrap();
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
