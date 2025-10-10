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
import CEPComponent from "../../components/Endereco/CEPComponent";

export default function VendaFormFields({
  errors = {},
  action = "cadastro",
}: FormProps<Venda>) {
  const { register, control, setValue, watch } = useForm<Venda>();
  const disabledFields: boolean = action == "visualizacao";
  const [livros, setLivros] = useState<Livro[]>([]);
  const [exibeDetalheLivro, setxibeDetalheLivro] = useState(false);
  const [livroSelecionado, setLivroSelecionado] = useState<Livro>();
  const [precoFormatado, setPrecoFormatado] = useState("R$ 0,00");

  const quantidade = watch("nu_quantidade");

  useEffect(() => {
    carregarListagemLivros();
  }, []);

  useEffect(() => {
    const quantidadeInt = Number(quantidade) || 0;
    const precoFloat =
      Number(String(livroSelecionado?.nu_preco || "0").replace(",", ".")) || 0;

    const total = Math.round(quantidadeInt * precoFloat * 100) / 100;
    setValue('nu_preco_total', total);

    const totalFormatado = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setPrecoFormatado(totalFormatado);
  }, [livroSelecionado, quantidade, setValue]);

  const carregarListagemLivros = () => {
    LivroService.listagem(1, [])
      .then((response) => {
        setLivros(response.data.data);
      })
      .catch((err) => toast.error("Erro: ", err));
  };

  const onChangeLivro = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const livroId = Number(event.target.value);
    const livroSelecionado = livros.find(({ id }) => id === livroId);

    // define valores padrão
    const valoresLivro = livroSelecionado
      ? livroSelecionado
      : {
          nu_quantidade: 0,
          no_autor: "",
          nu_preco: 0,
          dt_lancamento: "",
        };

    (
      ["nu_quantidade", "no_autor", "nu_preco", "dt_lancamento"] as const
    ).forEach((campo) => setValue(`livro.${campo}`, valoresLivro[campo]));

    setLivroSelecionado(livroSelecionado);
  };

  return (
    <fieldset className="border p-2">
      <Form.Group controlId="bookname" className="mb-3">
        <Row className="mb-4">
          <Col>
            <Form.Label>Livro</Form.Label>
            <Form.Select
              disabled={disabledFields}
              {...register("livro.id", { required: action !== "pesquisa" })}
              onChange={onChangeLivro}
            >
              <option>Selecione</option>
              {livros.map((livro) => (
                <option key={livro.id} value={livro.id}>
                  {livro.no_nome}
                </option>
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
              />
              {errors?.nu_quantidade?.map?.((error, index) => (
                <MessageFormCampo key={index} message={error} />
              ))}
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="quantity">
              <Form.Label>Total</Form.Label>
              <Form.Control type="text" disabled value={precoFormatado} />
            </Form.Group>
          </Col>
        </Row>

        <Button
          type="button"
          variant="outline-primary"
          onClick={() => setxibeDetalheLivro(!exibeDetalheLivro)}
        >
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

        <Row
          className="mb-4"
          style={{ display: exibeDetalheLivro ? "block" : "none" }}
        >
          <LivroFormFields
            register={register}
            control={control}
            action="visualizacao"
            namePrefix="livro."
            visibleFields={[
              "no_autor",
              "nu_quantidade",
              "nu_preco",
              "dt_lancamento",
            ]}
          />
        </Row>
      </Form.Group>

      <CEPComponent register={register}/>
    </fieldset>
  );
}
