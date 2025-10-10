// LivroFormFields.tsx
import { Col, Form, Row } from "react-bootstrap";
import { PrecoInputForm } from "../../components/form/PrecoInputForm";
import MessageFormCampo from "../../components/Messages/MessageFormCampo";
import type { Livro } from "../../model/Livro";
import type { FormProps } from "../../types/form-props";

interface LivroFormFieldsProps extends FormProps<Livro> {
  namePrefix?: string;
  visibleFields?: (keyof Livro)[];
}

const LivroFormFields = ({
  register,
  control,
  errors = {},
  action = "cadastro",
  namePrefix = "",
  visibleFields,
}: LivroFormFieldsProps) => {
  const disabledFields: boolean = action === "visualizacao";
  const actionPesquisa: boolean = action !== "pesquisa";

  const fieldName = (name: keyof Livro) =>
    namePrefix ? `${namePrefix}${name}` : name;

  const isVisible = (name: keyof Livro) =>
    !visibleFields || visibleFields.includes(name);

  return (
    <div>
      <Row className="mb-2">
        {isVisible("no_nome") && (
          <Col>
            <Form.Group controlId="bookname" className="mb-">
              <Form.Label>Nome do Livro</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do livro"
                {...register(fieldName("no_nome"), {
                  required: actionPesquisa,
                })}
                disabled={disabledFields}
              />
              {errors?.no_nome?.map?.((error, index) => (
                <MessageFormCampo key={index} message={error} />
              ))}
            </Form.Group>
          </Col>
        )}

        {isVisible("no_autor") && (
          <Col>
            <Form.Group controlId="author" className="mb-3">
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o autor"
                {...register(fieldName("no_autor"), {
                  required: actionPesquisa,
                })}
                disabled={disabledFields}
              />
              {errors?.no_autor?.map?.((error, index) => (
                <MessageFormCampo key={index} message={error} />
              ))}
            </Form.Group>
          </Col>
        )}
      </Row>

      <Row className="mb-3">
        {isVisible("nu_quantidade") && (
          <Col>
            <Form.Group controlId="quantity">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                {...register(fieldName("nu_quantidade"), { required: true })}
                disabled={disabledFields}
              />
              {errors?.nu_quantidade?.map?.((error, index) => (
                <MessageFormCampo key={index} message={error} />
              ))}
            </Form.Group>
          </Col>
        )}
        {isVisible("nu_preco") && (
          <Col>
            <PrecoInputForm
              control={control}
              name={fieldName("nu_preco")}
              disabled={disabledFields}
              label="Preço"
              errors={errors}
            />
          </Col>
        )}
        {isVisible("dt_lancamento") && (
          <Col>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Data de Lançamento</Form.Label>
              <Form.Control
                type="date"
                {...register(fieldName("dt_lancamento"), { required: true })}
                disabled={disabledFields}
              />
              {errors?.dt_lancamento?.map?.((error, index) => (
                <MessageFormCampo key={index} message={error} />
              ))}
            </Form.Group>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default LivroFormFields;
