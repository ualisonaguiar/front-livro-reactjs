import { useEffect } from 'react';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { AppRouter } from './router/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatusComponent from './components/StatusComponent';

function App() {

  useEffect(() => {
    const status = new StatusComponent();
    status.start();
  }, []);

  return (
    <>
      <Menu />
      <br />
      <div className='container'>
        <AppRouter />
      </div>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
