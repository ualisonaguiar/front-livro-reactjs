import { Table } from "react-bootstrap";
import type { Venda } from "../../model/Venda";
import { CurrencyUtils } from "../../components/Utils/CurrencyUtils";
import { Link } from "react-router-dom";
import { BiPen, BiTrash } from "react-icons/bi";

interface Props {
  vendas: Venda[];
  excluir: (livro: Venda) => void;
}

const VendaListagemPage = ({ vendas, excluir }: Props) => {
  return (
    <>
      <fieldset className="border p-2">
        <Table striped>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Livro</th>
              <th>Quantidade</th>
              <th>Total</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.id}>
                <td>{venda.usuario.ds_nome}</td>
                <td>{venda.livro.no_nome}</td>
                <td>{venda.nu_quantidade}</td>
                <td>
                  {CurrencyUtils.formatarMoeda(
                    venda.nu_quantidade *
                      CurrencyUtils.limparMoeda(venda.nu_preco)
                  )}
                </td>
                <td>
                  <Link to={`/venda/edit/${venda.id}`} title="Editar">
                    <BiPen>Editar</BiPen>
                  </Link>

                  <Link
                    to="#"
                    title="Excluir"
                    onClick={(e) => {
                      e.preventDefault();
                      excluir(venda);
                    }}
                  >
                    <BiTrash />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </fieldset>
    </>
  );
};

export default VendaListagemPage;
