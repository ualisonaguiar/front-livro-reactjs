import { useEffect, useState } from "react";
import ButtonAdicionar from "../Buttons/ButtonAdicionar";
import type { Venda } from "../../model/Venda";
import VendaService from "../../service/VendaService";
import { toast } from "react-toastify";
import type { PaginacaoResponse } from "../Utils/Paginator/PaginacaoResponse";
import VendaListagemPage from "../../pages/Venda/VendaListagemPage";
import PaginatorUtils from "../Utils/Paginator/PaginatorUtils";

export default function VendaListagem() {

    const [vendas, setVendas] = useState<Venda[]>([]);
    const [paginator, setPaginator] = useState<PaginacaoResponse<Venda> | null>(null);
    const [filtros, setFiltros] = useState<Partial<Venda>>({});

    const mudarPagina = (pagina: number) => {
        carregarListagem(pagina, filtros);
    };

    const carregarListagem = (numeroPagina: number = 1, filtros: Record<string, any> = {}) => {

        VendaService.listagem(numeroPagina, filtros)
            .then(resonse => {
                setPaginator(resonse.data);
                setVendas(resonse.data.data);
            })
            .catch(error => {
                console.error(error);
                toast.error("Falha ao excluir o livro");
            });
    }

    useEffect(() => { carregarListagem(1); }, []);

    return (
        <>
            <main className="container">
                <header className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Listagem das Venda</h2>
                    <ButtonAdicionar url="/venda/add" />
                </header>

                <section className="mb-4">
                    <VendaListagemPage vendas={vendas} />
                </section>

                <section className="mb-4">
                    <PaginatorUtils
                        paginator={paginator}
                        functionCallBack={mudarPagina}
                    />
                </section>
            </main>
        </>
    );
}