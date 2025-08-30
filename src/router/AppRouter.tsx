import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LivroListagem from '../components/Livro/Listagem';
import LivroAdicionarForm from '../components/Livro/Adicionar';
import LivrEditarForm from '../components/Livro/Editar';

export function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <div className="main-content">
                    <Routes>
                        <Route path='/livro' element={<LivroListagem />} />
                        <Route path='/livro/add' element={<LivroAdicionarForm />} />
                        <Route path='/livro/edit/:id' element={<LivrEditarForm />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}