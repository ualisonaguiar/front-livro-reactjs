import { Table } from "react-bootstrap";
import { BiInfoCircle, BiPen, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import type { Categoria } from "../../model/Categoria";

interface Props {
  categorias: Categoria[];
}

const CategoriaListagemPage = ({ categorias }: Props) => {
  return (
    <>
      <fieldset className="border p-2">
        <Table striped>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Situação</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.no_categoria}</td>
                <td>{categoria.in_ativo}</td>
                <td>
                  <Link to={`/categoria/edit/${categoria.id}`} title="Editar">
                    <BiPen />
                  </Link>

                  <Link
                    to="#"
                    title="Excluir"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Excluir categoria", categoria.id);
                    }}
                  >
                    <BiTrash />
                  </Link>

                  <Link
                    to={`/categoria/show/${categoria.id}`}
                    title="Visualizar"
                  >
                    <BiInfoCircle />
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

export default CategoriaListagemPage;
