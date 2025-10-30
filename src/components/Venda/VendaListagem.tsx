import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Venda } from "../../model/Venda";
import VendaListagemPage from "../../pages/Venda/VendaListagemPage";
import VendaService from "../../service/VendaService";
import ButtonAdicionar from "../Buttons/ButtonAdicionar";
import type { PaginacaoResponse } from "../Utils/Paginator/PaginacaoResponse";
import PaginatorUtils from "../Utils/Paginator/PaginatorUtils";
import MessageConfirmacao from "../Messages/MessageConfirmacao";

export default function VendaListagem() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [venda, setVenda] = useState<Venda>();
  const [showModal, setShowModal] = useState(false);
  const [paginator, setPaginator] = useState<PaginacaoResponse<Venda> | null>(
    null
  );
  //const [filtros, setFiltros] = useState<Partial<Venda>>({});

  const mudarPagina = (pagina: number) => {
    carregarListagem(pagina, filtros);
  };

  const excluir = (venda: Venda) => {
    setVenda(venda);
    setShowModal(true);
  };

  const confirmarExclusao = useCallback((venda: Venda) => {
    if (!venda) return;

    VendaService.remover(venda.id)
      .then(() => {
        toast.success("Venda excluída com sucesso!");
        carregarListagem();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Falha ao excluir a venda");
      })
      .finally(() => {
        setShowModal(false);
        setVenda(null);
      });
  }, []);

  const carregarListagem = (
    numeroPagina: number = 1,
    filtros: Record<string, any> = {}
  ) => {
    VendaService.listagem(numeroPagina, filtros)
      .then((resonse) => {
        setPaginator(resonse.data);
        setVendas(resonse.data.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Falha ao carregar a listagem");
      });
  };

  useEffect(() => {
    carregarListagem(1);
  }, []);

  return (
    <main className="container">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h2>Listagem das Venda</h2>
        <ButtonAdicionar url="/venda/add" />
      </header>

      <section className="mb-4">
        <VendaListagemPage vendas={vendas} excluir={excluir} />
      </section>

      <section className="mb-4">
        <PaginatorUtils paginator={paginator} functionCallBack={mudarPagina} />
      </section>

      <MessageConfirmacao
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmarExclusao}
        title="Confirmação de Exclusão"
        message={`Deseja realmente excluir a venda do ${venda?.usuario.ds_nome} do livro: ${venda?.livro.no_nome}?`}
      />
    </main>
  );
}
