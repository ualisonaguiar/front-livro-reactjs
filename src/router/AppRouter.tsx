import { Route, Routes } from 'react-router-dom';
import LoginComponent from '../components/Authenticator/LoginComponent';
import LivrEditarForm from '../components/Livro/LivrEditarForm';
import LivroAdicionarForm from '../components/Livro/LivroAdicionarForm';
import LivroListagem from '../components/Livro/LivroListagem';
import LivroViewForm from '../components/Livro/LivroViewForm';
import VendaListagem from '../components/Venda/VendaListagem';
import InicialComponents from '../components/InicialComponents';
import PrivateRoute from './PrivateRoute';
import VendaAdicionar from '../components/Venda/VendaAdicionar';

export function AppRouter() {
    return (
        <Routes>
            <Route path='/login' element={<LoginComponent />} />

            <Route element={<PrivateRoute />}>
                <Route path='' element={<InicialComponents />} />
                <Route path='/livro' element={<LivroListagem />} />
                <Route path='/livro/add' element={<LivroAdicionarForm />} />
                <Route path='/livro/edit/:id' element={<LivrEditarForm />} />
                <Route path='/livro/show/:id' element={<LivroViewForm />} />

                <Route path='/venda' element={<VendaListagem />} />
                <Route path='/venda/add' element={<VendaAdicionar />} />
            </Route>
        </Routes>
    );
}