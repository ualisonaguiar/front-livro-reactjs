import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LivroService from "../../service/LivroService";
import LivroListagemPage from "../../pages/Livro/ListagemPage";
import type { Livro } from "../../model/livro";

export default function LivroListagem() {

    const [livros, setLivros] = useState<Livro[]>([]);

    useEffect(() => {
        carregarListagem();
    }, []);

    const excluir = (livro: Livro) => {
        LivroService.remover(livro.id)
            .then(response => {
                if (response.status == 200) {
                    alert("Livro excluído com sucesso");
                    carregarListagem();
                }
            })
            .catch(err => console.error("Erro: ", err));
    };

    const carregarListagem = () => {
        LivroService.listagem()
            .then(response => {
                setLivros([...response.data]);
            })
            .catch(err => console.error("Erro: ", err));
    }

    return (
        <>
            <div>
                <h2>Listagem de Livros</h2>

                <div className="d-flex justify-content-end">
                    <Link to="/livro/add">
                        <Button type="button" variant="primary">
                            Adicionar
                        </Button>
                    </Link>
                </div>

                <LivroListagemPage livros={livros} excluir={excluir} />
            </div>
        </>
    );
}