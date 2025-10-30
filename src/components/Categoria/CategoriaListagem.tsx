import { useCallback, useEffect, useState } from "react";
import type { Categoria } from "../../model/Categoria";
import CategoriaService from "../../service/CategoriaService";
import type { PaginacaoResponse } from "../Utils/Paginator/PaginacaoResponse";
import { toast } from "react-toastify";
import ButtonAdicionar from "../Buttons/ButtonAdicionar";
import PaginatorUtils from "../Utils/Paginator/PaginatorUtils";
import CategoriaListagemPage from "../../pages/Categoria/CategoriaListagemPage";
import CategoriaForm from "./CategoriaForm";
import FormButtons from "../form/FormButtons";
import CategoriaFormFields from "../../pages/Categoria/CategoriaFormFields";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";

const CategoriaListagem = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [paginator, setPaginator] =
    useState<PaginacaoResponse<Categoria> | null>(null);
  const { register, handleSubmit, control, reset } = useForm<Categoria>({});

  const [filtros, setFiltros] = useState<Partial<Categoria>>({});

  const carregarListagem = useCallback(
    (page: number = 1, filters: Partial<Categoria> = {}) => {
      CategoriaService.listagem(page, filters)
        .then((response) => {
          setPaginator(response.data);
          setCategorias(response.data.data);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Erro ao carregar a listagem de categorias");
        });
    },
    []
  );

  const onSubmit = (data: Categoria) => {
    setFiltros(data);
    carregarListagem(1, data);
  };

  const mudarPagina = useCallback(
    (page: number) => {
      carregarListagem(page, filtros);
    },
    [carregarListagem, filtros]
  );

  useEffect(() => {
    carregarListagem();
  }, []);

  return (
    <div>
      <main className="container">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h2>Listagem de Categoria</h2>
          <ButtonAdicionar url="/categoria/add" />
        </header>

        <section className="mb-4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <CategoriaFormFields
              register={register}
              control={control}
              action="pesquisa"
            />
            <FormButtons action="pesquisa" reset={reset} />
          </Form>
        </section>

        <section className="mb-4">
          <CategoriaListagemPage categorias={categorias} />
        </section>

        <section className="mb-4">
          <PaginatorUtils
            paginator={paginator}
            functionCallBack={mudarPagina}
          />
        </section>
      </main>
    </div>
  );
};

export default CategoriaListagem;
