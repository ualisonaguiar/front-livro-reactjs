import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Livro } from "../../model/livro";
import LivroListagemPage from "../../pages/Livro/LivroListagemPage";
import LivroService from "../../service/LivroService";
import MessageConfirmacao from "../Messages/MessageConfirmacao";
import { toast } from "react-toastify";

export default function LivroListagem() {

    const [livros, setLivros] = useState<Livro[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);

    useEffect(() => {
        carregarListagem();
    }, []);

    const excluir = (livro: Livro) => {
        setLivroSelecionado(livro);
        setShowModal(true);

        /*LivroService.remover(livro.id)
            .then(response => {
                if (response.status == 200) {
                    alert("Livro excluído com sucesso");
                    carregarListagem();
                }
            })
            .catch(err => console.error("Erro: ", err));*/

    };

    const confirmarExclusao = () => {
        if (!livroSelecionado)
            return;

        LivroService.remover(livroSelecionado.id)
            .then(() => {
                toast.success("Livro excluído com sucesso!");
                carregarListagem();
            })
            .catch(err => {
                toast.error("Falha ao excluir o livro");
            })
            .finally(() => {
                setShowModal(false);
                setLivroSelecionado(null);
            });
    }

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

                <MessageConfirmacao
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={confirmarExclusao}
                    title="Confirmação de Exclusão"
                    message={`Deseja realmente excluir o livro "${livroSelecionado?.no_nome}"?`}
                />
            </div>
        </>
    );
}