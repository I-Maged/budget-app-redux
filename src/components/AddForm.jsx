import { useState } from 'react';
import { addNewAccount } from '../features/accounts/accountsActions';
import { useDispatch } from 'react-redux';

const AddForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [type, setType] = useState('+');
  const [value, setvaluealue] = useState(0);

  const submitForm = async (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      return console.log('Description cannot be empty');
    }
    if (value <= 0) {
      return console.log('Value cannot be less that or equal to 0');
    }

    try {
      await dispatch(addNewAccount({ name, type, value })).unwrap();
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };

  return (
    <form className='accountForm flex' onSubmit={submitForm}>
      <input
        type='text'
        className='accountName'
        placeholder='add account description'
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
        onChange={(e) => setvaluealue(Number(e.target.value))}
      />
      <button type='submit' className='formBtn'>
        Add
      </button>
    </form>
  );
};

export default AddForm;
