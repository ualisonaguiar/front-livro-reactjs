import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Livro } from "../../model/livro";
import LivroListagemPage from "../../pages/Livro/LivroListagemPage";
import LivroService from "../../service/LivroService";
import MessageConfirmacao from "../Messages/MessageConfirmacao";
import { toast } from "react-toastify";
import type { PaginacaoResponse } from "../Utils/Paginator/PaginacaoResponse";
import PaginatorUtils from "../Utils/Paginator/PaginatorUtils";

export default function LivroListagem() {

    const [livros, setLivros] = useState<Livro[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);
    const [paginator, setPaginator] = useState<PaginacaoResponse<Livro> | null>(null);

    useEffect(() => { carregarListagem(1); }, []);

    const excluir = (livro: Livro) => {
        setLivroSelecionado(livro);
        setShowModal(true);
    };

    const mudarPagina = (pagina: number) => {
        carregarListagem(pagina);
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
                console.error(err);
                toast.error("Falha ao excluir o livro");
            })
            .finally(() => {
                setShowModal(false);
                setLivroSelecionado(null);
            });
    }

    const carregarListagem = (numeroPagina: number = 1) => {
        LivroService.listagem(numeroPagina)
            .then(response => {
                setPaginator(response.data);
                setLivros(response.data.data);
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

                <PaginatorUtils
                    totalItens={paginator?.total}
                    itensPorPagina={paginator?.per_page}
                    functionCallBack={mudarPagina}
                />

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