import Header from './components/Header';
import DisplayAccounts from './components/DisplayAccounts';
import AddForm from './components/AddForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header />
      <AddForm />
      <DisplayAccounts />
      <ToastContainer />
    </>
  );
}

export default App;
