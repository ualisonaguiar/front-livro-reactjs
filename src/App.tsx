import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <>
      <Menu />
      <br />
      <div className='container'>
        <AppRouter />
      </div>
      <Footer />
    </>
  );
}

export default App;
