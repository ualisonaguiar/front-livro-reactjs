import { Table } from "react-bootstrap";
import type { Venda } from "../../model/Venda";
import { CurrencyUtils } from "../../components/Utils/CurrencyUtils";
import { Link } from "react-router-dom";
import { BiPen } from "react-icons/bi";

interface Props {
    vendas: Venda[];
}

const VendaListagemPage = ({ vendas }: Props) => {

    return (
        <>
            <fieldset className="border p-2">
                <Table striped>
                    <thead>
                        <tr>
                            <th>CPF</th>
                            <th>Título Livro</th>
                            <th>Quantidade</th>
                            <th>Total</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendas.map(venda => (
                            <tr key={venda.id}>
                                <td>{venda.nu_cpf}</td>
                                <td>{venda.livro.no_nome}</td>
                                <td>{venda.nu_quantidade}</td>
                                <td>{CurrencyUtils.formatarMoeda(venda.nu_quantidade * venda.nu_preco)}</td>
                                <td>
                                    <Link to={`/livro/edit/${venda.id}`}>
                                        <BiPen>Editar</BiPen>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </fieldset>
        </>
    );
}

export default VendaListagemPage;