import Header from './components/Header';
import AddForm from './components/AddForm';
import DisplayAccounts from './components/DisplayAccounts';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header />
      <AddForm />
      <DisplayAccounts />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
