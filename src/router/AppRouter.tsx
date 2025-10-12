import { Route, Routes } from "react-router-dom";
import LoginComponent from "../components/Authenticator/LoginComponent";
import InicialComponents from "../components/InicialComponents";
import LivroAdicionarForm from "../components/Livro/LivroAdicionarForm";
import LivroEditarForm from "../components/Livro/LivroEditarForm";
import LivroListagem from "../components/Livro/LivroListagem";
import LivroViewForm from "../components/Livro/LivroViewForm";
import VendaForm from "../components/Venda/VendaForm";
import VendaListagem from "../components/Venda/VendaListagem";
import PrivateRoute from "./PrivateRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginComponent />} />

      <Route element={<PrivateRoute />}>
        <Route path="" element={<InicialComponents />} />
        <Route path="/livro" element={<LivroListagem />} />
        <Route path="/livro/add" element={<LivroAdicionarForm />} />
        <Route path="/livro/edit/:id" element={<LivroEditarForm />} />
        <Route path="/livro/show/:id" element={<LivroViewForm />} />

        <Route path="/venda" element={<VendaListagem />} />
        <Route path="/venda/add" element={<VendaForm />} />
        <Route path="/venda/edit/:id" element={<VendaForm />} />
      </Route>
    </Routes>
  );
}
