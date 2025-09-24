import { useState } from "react";
import { Pagination } from "react-bootstrap";

interface Props {
    totalItens: number;
    itensPorPagina: number;
    functionCallBack: (pagina: number) => void;
}

const PaginatorUtils = ({ totalItens, itensPorPagina, functionCallBack }: Props) => {

    const [paginaAtual, setPaginaAtual] = useState(1);

    const totalPaginas = Math.ceil(totalItens / itensPorPagina);

    const mudarPagina = (numeroPagina) => {
        setPaginaAtual(numeroPagina);
        functionCallBack(numeroPagina);
    };

    const registrosAteAgora = Math.min(paginaAtual * itensPorPagina, totalItens);

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
    };

    return (
        <div>
            <div className="mb-2 w-100" style={{ textAlign: 'right' }}>
                <small>
                    {registrosAteAgora} de {totalItens}
                </small>
            </div>

            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.First onClick={() => mudarPagina(1)} disabled={paginaAtual === 1} />
                    <Pagination.Prev onClick={() => mudarPagina(paginaAtual - 1)} disabled={paginaAtual === 1} />

                    <Pagination.Item>{paginaAtual}</Pagination.Item>

                    <Pagination.Next onClick={() => mudarPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas} />
                    <Pagination.Last onClick={() => mudarPagina(totalPaginas)} disabled={paginaAtual === totalPaginas} />
                </Pagination>
            </div>
        </div>
    );
};

export default PaginatorUtils;