import DisplayDate from './layout/DisplayDate';
import DisplayTotal from './layout/DisplayTotal';

const Header = () => {
  return (
    <header className='flex'>
      <DisplayDate />
      <DisplayTotal />
    </header>
  );
};

export default Header;
