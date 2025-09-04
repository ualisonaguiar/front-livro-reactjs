import { Col, Form, Row } from "react-bootstrap";
import ButtonVoltarSalvar from "../../components/Buttons/ButtonVoltarSalvar";
import MessageFormCampo from "../../components/Messages/MessageFormCampo";
import type { Livro } from "../../model/livro";
import type { UseFormRegister } from "react-hook-form";

interface Props {
    register: UseFormRegister<Livro>;
    handleSubmit: (e?: React.BaseSyntheticEvent) => void;
    errors?: { [key: string]: string[] };
}

const LivroFormularioPage = ({ register, handleSubmit, errors = {} }: Props) => {
    return (
        <div className="main-form">
            <Form onSubmit={handleSubmit}>
                <ButtonVoltarSalvar urlVoltar="/livro" />

                <Form.Group controlId="bookname" className="mb-3">
                    <Form.Label>Nome do Livro</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o nome do livro"
                        {...register("no_nome", { required: true })}
                    />
                    {errors.no_nome?.map((error, index) => (
                        <MessageFormCampo key={index} message={error} />
                    ))}
                </Form.Group>

                <Form.Group controlId="author" className="mb-3">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o autor"
                        {...register("no_autor", { required: true })}
                    />
                    {errors.no_autor?.map((error, index) => (
                        <MessageFormCampo key={index} message={error} />
                    ))}
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                                type="number"
                                {...register("nu_quantidade", { required: true })}
                            />
                            {errors.nu_quantidade?.map((error, index) => (
                                <MessageFormCampo key={index} message={error} />
                            ))}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Col>
                            <Form.Group controlId="price">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    type="number"
                                    {...register("nu_preco", { required: true })}
                                    name="nu_preco"
                                />
                            </Form.Group>
                        </Col>
                    </Col>
                    <Col>
                        <Form.Group controlId="date" className="mb-3">
                            <Form.Label>Data de Lançamento</Form.Label>
                            <Form.Control
                                type="date"
                                {...register("dt_lancamento", { required: true })}
                            />
                            {errors.dt_lancamento?.map((error, index) => (
                                <MessageFormCampo key={index} message={error} />
                            ))}
                        </Form.Group>
                    </Col>
                </Row>

                <ButtonVoltarSalvar urlVoltar="/livro" />
            </Form>
        </div>
    );
};

export default LivroFormularioPage;
