import { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { Livro } from "../../model/Livro";
import LivroFormFields from "../../pages/Livro/LivroFormFields";
import LivroListagemPage from "../../pages/Livro/LivroListagemPage";
import LivroService from "../../service/LivroService";
import ButtonAdicionar from "../Buttons/ButtonAdicionar";
import FormButtons from "../form/FormButtons";
import MessageConfirmacao from "../Messages/MessageConfirmacao";
import type { PaginacaoResponse } from "../Utils/Paginator/PaginacaoResponse";
import PaginatorUtils from "../Utils/Paginator/PaginatorUtils";

export default function LivroListagem() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);
  const [paginator, setPaginator] = useState<PaginacaoResponse<Livro> | null>(
    null
  );
  const [filtros, setFiltros] = useState<Partial<Livro>>({});
  const { register, handleSubmit, control, reset } = useForm<Livro>({});

  const excluir = (livro: Livro) => {
    setLivroSelecionado(livro);
    setShowModal(true);
  };

  const confirmarExclusao = useCallback((livro: Livro) => {
    if (!livro) return;

    LivroService.remover(livro.id)
      .then(() => {
        toast.success("Livro excluído com sucesso!");
        carregarListagem();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Falha ao excluir o livro");
      })
      .finally(() => {
        setShowModal(false);
        setLivroSelecionado(null);
      });
  }, []);

  const carregarListagem = useCallback(
    (page: number = 1, filters: Partial<Livro> = {}) => {
      LivroService.listagem(page, filters)
        .then((response) => {
          setPaginator(response.data);
          setLivros(response.data.data);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Erro ao carregar a listagem de livros");
        });
    },
    []
  );

  const mudarPagina = useCallback(
    (page: number) => {
      carregarListagem(page, filtros);
    },
    [carregarListagem, filtros]
  );

  useEffect(() => {
    carregarListagem(1);
  }, [carregarListagem]);

  const onSubmit = (data: Livro) => {
    carregarListagem(1, data);
    setFiltros(data);
  };

  return (
    <div>
      <main className="container">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h2>Listagem de Livros</h2>
          <ButtonAdicionar url="/livro/add" />
        </header>

        <section className="mb-4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <LivroFormFields
              register={register}
              control={control}
              action="pesquisa"
              visibleFields={["no_nome", "no_autor"]}
            />
            <FormButtons action="pesquisa" reset={reset} />
          </Form>
        </section>

        <section className="mb-4">
          <LivroListagemPage livros={livros} excluir={excluir} />
        </section>

        <section className="mb-4">
          <PaginatorUtils
            paginator={paginator}
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
    </div>
  );
}
