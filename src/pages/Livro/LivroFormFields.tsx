import { Col, Form, Row } from "react-bootstrap";
import { PrecoInputForm } from "../../components/form/PrecoInputForm";
import MessageFormCampo from "../../components/Messages/MessageFormCampo";
import type { Livro } from "../../model/Livro";
import type { FormProps } from "../../types/form-props";

const LivroFormFields = ({ register, control, errors = {}, action = "cadastro" }: FormProps<Livro>) => {

    const disabledFields: boolean = action == 'visualizacao';

    return (
        <fieldset className="border p-2">
            <Form.Group controlId="bookname" className="mb-3">
                <Form.Label>Nome do Livro</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o nome do livro"
                    {...register("no_nome", { required: action !== "pesquisa" })}
                    disabled={disabledFields}
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
                    {...register("no_autor", { required: action !== "pesquisa" })}
                    disabled={disabledFields}
                />
                {errors.no_autor?.map((error, index) => (
                    <MessageFormCampo key={index} message={error} />
                ))}
            </Form.Group>

            {action !== "pesquisa" && (
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                                type="number"
                                {...register("nu_quantidade", { required: true })}
                                disabled={disabledFields}
                            />
                            {errors.nu_quantidade?.map((error, index) => (
                                <MessageFormCampo key={index} message={error} />
                            ))}
                        </Form.Group>
                    </Col>
                    <Col>
                        <PrecoInputForm
                            control={control}
                            name="nu_preco"
                            disabled={disabledFields}
                            label="Preço"
                            errors={errors}
                        />
                    </Col>
                    <Col>
                        <Form.Group controlId="date" className="mb-3">
                            <Form.Label>Data de Lançamento</Form.Label>
                            <Form.Control
                                type="date"
                                {...register("dt_lancamento", { required: true })}
                                disabled={disabledFields}
                            />
                            {errors.dt_lancamento?.map((error, index) => (
                                <MessageFormCampo key={index} message={error} />
                            ))}
                        </Form.Group>
                    </Col>
                </Row>
            )}
        </fieldset>
    );
};

export default LivroFormFields;
