import { Table } from "react-bootstrap";
import type { Livro } from "../../model/livro";
import { Link } from "react-router-dom";
import { BiInfoCircle, BiPen, BiTrash } from "react-icons/bi";
import { CurrencyUtils } from "../../components/Utils/CurrencyUtils";

interface Props {
    livros: Livro[];
    excluir: (livro: Livro) => void;
}

const LivroListagemPage = ({ livros, excluir }: Props) => {
    return (
        <>
            <div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Autor</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                            <th>Data de Lançamento</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map(livro => (
                            <tr key={livro.id}>
                                <td>{livro.no_nome}</td>
                                <td>{livro.no_autor}</td>
                                <td>{livro.nu_quantidade}</td>
                                <td>{CurrencyUtils.formatarMoeda(livro.nu_preco)}</td>
                                <td>{new Date(livro.dt_lancamento).toLocaleDateString('pt-BR')}</td>
                                <td>
                                    <Link to={`/livro/edit/${livro.id}`}>
                                        <BiPen>Editar</BiPen>
                                    </Link>
                                    <Link
                                        to="#"
                                        title="Excluir"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            excluir(livro);
                                        }}
                                    >
                                        <BiTrash />
                                    </Link>
                                    <Link to={`/livro/show/${livro.id}`}>
                                        <BiInfoCircle>Editar</BiInfoCircle>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default LivroListagemPage;