import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import MessageFormCampo from "../../components/Messages/MessageFormCampo";
import type { Livro } from "../../model/Livro";
import type { Venda } from "../../model/Venda";
import LivroService from "../../service/LivroService";
import type { FormProps } from "../../types/form-props";
import { useForm } from "react-hook-form";
import { PrecoInputForm } from "../../components/form/PrecoInputForm";

export default function VendaFormFields({ errors = {}, action = 'cadastro' }: FormProps<Venda>) {

    const { register, control, setValue } = useForm<Venda>();

    const disabledFields: boolean = action == 'visualizacao';
    const [livros, setLivros] = useState<Livro[]>([]);

    useEffect(() => { carregarListagemLivros(); }, []);


    const carregarListagemLivros = () => {
        LivroService.listagem(1, [])
            .then(response => {
                setLivros(response.data.data);
            })
            .catch(err => toast.error("Erro: ", err));
    }

    const onChangeLivro = (event) => {
        const livroId = parseInt(event.target.value);
        const livro = livros.find(l => l.id === livroId);

        if (livro) {
            setValue("livro.nu_quantidade", livro.nu_quantidade);
            setValue("livro.no_nome", livro.no_autor);
            setValue("livro.nu_preco", livro.nu_preco);
        } else {
            setValue("livro.nu_quantidade", 0);
            setValue("livro.no_nome", "");
            setValue("livro.nu_preco", 0);
        }
    };

    return (
        <fieldset className="border p-2">
            <Form.Group controlId="bookname" className="mb-3">
                <Row className="mb-4">
                    <Col>
                        <Form.Label>Livro</Form.Label>
                        <Form.Select disabled={disabledFields} {...register('livro.id', { required: action !== "pesquisa" })} onChange={onChangeLivro}>
                            <option>Selecione</option>
                            {livros.map(livro => (
                                <option key={livro.id} value={livro.id}>{livro.no_nome}</option>
                            ))}
                        </Form.Select>

                        {errors.livro.id?.map((error, index) => (
                            <MessageFormCampo key={index} message={error} />
                        ))}
                    </Col>

                    <Col>
                        <Form.Group controlId="autor">
                            <Form.Label>Autor</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('livro.no_nome')}
                                disabled
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantidade Disponível</Form.Label>
                            <Form.Control
                                type="number"
                                {...register("livro.nu_quantidade")}
                                disabled
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <PrecoInputForm
                            control={control}
                            name="livro.nu_preco"
                            disabled
                            label="Preço Unitário"
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Row className="mb-3"></Row>
        </fieldset>
    );
}