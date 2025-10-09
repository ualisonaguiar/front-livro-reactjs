import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { Livro } from "../../model/Livro";
import type { Venda } from "../../model/Venda";
import LivroService from "../../service/LivroService";
import type { FormProps } from "../../types/form-props";
import LivroFormFields from "../Livro/LivroFormFields";
import MessageFormCampo from "../../components/Messages/MessageFormCampo";
import { PrecoInputForm } from "../../components/form/PrecoInputForm";

export default function VendaFormFields({ errors = {}, action = 'cadastro' }: FormProps<Venda>) {

    const { register, control, setValue } = useForm<Venda>();
    const disabledFields: boolean = action == 'visualizacao';
    const [livros, setLivros] = useState<Livro[]>([]);
    const [exibeDetalheLivro, setxibeDetalheLivro] = useState(false);
    const [livroSelecionado, setLivroSelecionado] = useState<Livro>();
    useEffect(() => { carregarListagemLivros(); }, []);

    const calcularQuantidadeTotal = (quantidade: number) => {
        setValue("nu_quantidade", quantidade);
        if (livroSelecionado) {
            const precoTotal = quantidade * (livroSelecionado.nu_preco || 0);
            setValue('nu_preco_total', precoTotal);
        } else {
            setValue('nu_preco_total', 0);
        }
    }

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
            setValue("livro.no_autor", livro.no_autor);
            setValue("livro.nu_preco", livro.nu_preco);
            setValue("livro.dt_lancamento", livro.dt_lancamento);
            setLivroSelecionado(livro);

            //calcularQuantidadeTotal(quantidade);
        } else {
            setValue("livro.nu_quantidade", 0);
            setValue("livro.no_autor", '');
            setValue("livro.nu_preco", 0);
            setValue("livro.dt_lancamento", '');
        }
    };

    const onChangeQuantidade = (event) => {
        const quantidade = parseInt(event.target.value) || 0;
        calcularQuantidadeTotal(quantidade);
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
                            {errors?.nu_quantidade?.map?.((error, index) => (
                                <MessageFormCampo key={index} message={error} />
                            ))}
                        </Form.Select>
                    </Col>

                    <Col>
                        <PrecoInputForm
                            control={control}
                            name="livro.nu_preco"
                            disabled={true}
                            label="Preço Unitário"
                            errors={errors}
                        />
                    </Col>

                    <Col>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                                type="number"
                                {...register("nu_quantidade", { required: true })}
                                disabled={disabledFields}
                                onChange={onChangeQuantidade}
                            />
                            {errors?.nu_quantidade?.map?.((error, index) => (
                                <MessageFormCampo key={index} message={error} />
                            ))}
                        </Form.Group>
                    </Col>

                    <Col>
                        <PrecoInputForm
                            control={control}
                            name="nu_preco_total"
                            disabled={true}
                            label="Preço Total"
                            errors={errors}
                        />
                    </Col>
                </Row>

                <Button type="button" variant="outline-primary" onClick={() => setxibeDetalheLivro(!exibeDetalheLivro)}>
                    {exibeDetalheLivro ? (
                        <>
                            <i className="bi bi-arrow-up-circle"></i> Ocultar detalhes
                        </>
                    ) : (
                        <>
                            <i className="bi bi-arrow-down-circle"></i>Exibir detalhes
                        </>
                    )}
                </Button>

                <Row className="mb-4" style={{ display: exibeDetalheLivro ? "block" : "none" }}>
                    <LivroFormFields
                        register={register}
                        control={control}
                        action='visualizacao'
                        namePrefix='livro.'
                        visibleFields={["no_autor", "nu_quantidade", "nu_preco", "dt_lancamento"]}
                    />
                </Row>
            </Form.Group>
            <Row className="mb-3"></Row>
        </fieldset>
    );
}