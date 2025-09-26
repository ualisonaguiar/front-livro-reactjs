import { useState } from "react";
import { Pagination } from "react-bootstrap";
import type { PaginacaoResponse } from "./PaginacaoResponse";

interface Props<T> { paginator: PaginacaoResponse<T> | null; functionCallBack: (pagina: number) => void; }

const PaginatorUtils = <T,>({ paginator, functionCallBack }: Props<T>) => {
    const [paginaAtual, setPaginaAtual] = useState(1);

    if (!paginator) {
        return null;
    }

    const totalPaginas = Math.ceil(paginator.total / paginator.per_page);

    const mudarPagina = (numeroPagina = 1) => {
        setPaginaAtual(numeroPagina);
        functionCallBack(numeroPagina);
    };

    const paginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(
            <Pagination.Item
                key={i}
                active={i === paginaAtual}
                onClick={() => mudarPagina(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <div>
            <div className="mb-2 w-100" style={{ textAlign: "right" }}>
                <small>
                    Página {paginator.current_page} de {paginator.last_page}, mostrando{" "}
                    {paginator.per_page} registro(s) de um total de {paginator.total}
                </small>
            </div>

            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.First
                        onClick={() => mudarPagina(1)}
                        disabled={paginaAtual === 1}
                    />
                    <Pagination.Prev
                        onClick={() => mudarPagina(paginaAtual - 1)}
                        disabled={paginaAtual === 1}
                    />

                    <Pagination.Item>{paginaAtual}</Pagination.Item>

                    <Pagination.Next
                        onClick={() => mudarPagina(paginaAtual + 1)}
                        disabled={paginaAtual === totalPaginas}
                    />
                    <Pagination.Last
                        onClick={() => mudarPagina(totalPaginas)}
                        disabled={paginaAtual === totalPaginas}
                    />
                </Pagination>
            </div>
        </div>
    );
};

export default PaginatorUtils;