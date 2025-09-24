import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LivrEditarForm from '../components/Livro/LivrEditarForm';
import LivroAdicionarForm from '../components/Livro/LivroAdicionarForm';
import LivroListagem from '../components/Livro/LivroListagem';
import LivrViewForm from '../components/Livro/LivrViewForm';

export function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <div className="main-content">
                    <Routes>
                        <Route path='/livro' element={<LivroListagem />} />
                        <Route path='/livro/add' element={<LivroAdicionarForm />} />
                        <Route path='/livro/edit/:id' element={<LivrEditarForm />} />
                        <Route path='/livro/show/:id' element={<LivrViewForm />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}