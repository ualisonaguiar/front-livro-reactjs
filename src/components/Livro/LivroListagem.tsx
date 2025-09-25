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
import LivroFormularioPage from "../../pages/Livro/LivroFormularioPage";
import { useForm } from "react-hook-form";
import ButtonAdicionar from "../Buttons/ButtonAdicionar";

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

    const { register, handleSubmit, control, reset } = useForm<Livro>({});

    const onSubmit = (data: Livro) => {
        console.log(data);
    };


    return (
        <>
            <main className="container">
                <header className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Listagem de Livros</h2>
                    <ButtonAdicionar url="/livro/add" />
                </header>


                <section className="mb-4">
                    <LivroFormularioPage
                        register={register}
                        control={control}
                        handleSubmit={handleSubmit(onSubmit)}
                        action="pesquisa"
                        reset={reset}
                    />
                </section>

                <section className="mb-4">
                    <LivroListagemPage livros={livros} excluir={excluir} />
                </section>

                <section className="mb-4">
                    <PaginatorUtils
                        totalItens={paginator?.total}
                        itensPorPagina={paginator?.per_page}
                        functionCallBack={mudarPagina}
                    />
                </section>

                <MessageConfirmacao
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={confirmarExclusao}
                    title="Confirmação de Exclusão"
                    message={`Deseja realmente excluir o livro "${livroSelecionado?.no_nome}"?`}
                />
            </main>
        </>
    );
}