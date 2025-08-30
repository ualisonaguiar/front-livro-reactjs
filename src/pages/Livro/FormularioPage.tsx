import { Button, Col, Form, Row } from "react-bootstrap";
import type { Livro } from "../../model/livro";

interface Props {
    livro: Livro;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LivroFormularioPage = ({ livro, handleChange, handleSubmit }: Props) => {

    return (
        <div className="main-form">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="bookname" className="mb-3">
                    <Form.Label>Nome do Livro</Form.Label>
                    <Form.Control
                        type="text"
                        name="no_nome"
                        value={livro.no_nome}
                        onChange={handleChange}
                        placeholder="Digite o nome do livro"
                    />
                </Form.Group>

                <Form.Group controlId="author" className="mb-3">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control
                        type="text"
                        name="no_autor"
                        value={livro?.no_autor || ""}
                        onChange={handleChange}
                        placeholder="Digite o autor"
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                                type="number"
                                value={livro?.nu_quantidade || ""}
                                onChange={handleChange}
                                name="nu_quantidade"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="price">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                type="number"
                                value={livro?.nu_preco || ""}
                                onChange={handleChange}
                                name="nu_preco"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="date" className="mb-3">
                            <Form.Label>Data de Lançamento</Form.Label>
                            <Form.Control
                                type="date"
                                name="dt_lancamento"
                                onChange={handleChange}
                                value={livro?.dt_lancamento || ""}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">Salvar</Button>
            </Form>
        </div>
    );
}

export default LivroFormularioPage;