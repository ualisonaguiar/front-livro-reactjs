import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import StatusComponent from './components/StatusComponent';
import { AppRouter } from './router/AppRouter';

function App() {

  useEffect(() => {
    const status = new StatusComponent();
    status.start();
  }, []);

  return (
    <>
      <Menu />
      <div className="main-content">
        <AppRouter />
        <Footer />
      </div>

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
