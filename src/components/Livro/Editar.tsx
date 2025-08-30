import { Link, useParams } from "react-router-dom";
import LivroFormularioPage from "../../pages/Livro/FormularioPage";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { Livro } from "../../model/livro";
import LivroService from "../../service/LivroService";
import { useNavigate } from "react-router-dom";

const LivrEditarForm = () => {

    const [livro, setLivro] = useState<Livro>({
        id: 0,
        nome: "",
        autor: "",
        quantidade: 0,
        preco: 0,
        dt_lancamento: "",
    });

    const { id } = useParams();

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLivro({ ...livro, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        LivroService.atualizar(id, livro).then(response => {

            if (response.status === 200) {
                alert("Livro alterado com sucesso");

                navigate("/livro");
            }
        });
    };

    useEffect(() => {
        LivroService.buscarPorId(id).then((res) => setLivro(res.data));
    }, [id]);

    return (
        <>
            <div>
                <h2>Editar Livro</h2>
                <div className="d-flex justify-content-end">
                    <Link to="/livro">
                        <Button type="button" variant="secondary">Voltar</Button>
                        <Button type="button" variant="success">Salvar</Button>
                    </Link>
                </div>

                <LivroFormularioPage livro={livro} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
        </>
    )
};

export default LivrEditarForm;
