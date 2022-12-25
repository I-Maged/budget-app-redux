import { db } from './firebase.config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore/lite';
import Header from './components/Header';

function App() {
  const getAccounts = async () => {
    const accountsCol = collection(db, 'accounts');
    const q = query(accountsCol, orderBy('timestamp', 'asc'));
    const accountsSnapshot = await getDocs(q);
    const accountsList = accountsSnapshot.docs.map((doc) => doc.data());
    console.log(accountsList);
  };
  getAccounts();

  return (
    <>
      <Header />
    </>
  );
}

export default App;
