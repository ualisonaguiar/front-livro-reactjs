import { Col, Form, Row } from "react-bootstrap";
import type { Categoria } from "../../model/Categoria";
import type { FormProps } from "../../types/form-props";
import MessageFormCampo from "../../components/Messages/MessageFormCampo";
import { CategoriaEnumSituacao } from "../../model/CategoriaEnumSituacao";

interface CategoriaFormFieldsProps extends FormProps<Categoria> {
  namePrefix?: string;
}

const CategoriaFormFields = ({
  register,
  errors = {},
  action = "cadastro",
  namePrefix = "",
}: CategoriaFormFieldsProps) => {
  const disabledFields: boolean = action === "visualizacao";
  const actionPesquisa: boolean = action !== "pesquisa";

  const fieldName = (name: keyof Categoria) =>
    namePrefix ? `${namePrefix}${name}` : name;

  return (
    <Row className="mb-2">
      <Col>
        <Form.Group controlId={fieldName("no_categoria")} className="mb-3">
          <Form.Label>Nome da Categoria</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome da categoria"
            {...register(fieldName("no_categoria"), {
              required: actionPesquisa,
            })}
            disabled={disabledFields}
          />
          {errors?.no_categoria?.map?.((error, index) => (
            <MessageFormCampo key={index} message={error} />
          ))}
        </Form.Group>
      </Col>

      <Col>
        <Form.Label>Situação</Form.Label>
        <Form.Select
          disabled={disabledFields}
          {...register(fieldName("in_ativo"), {
            required: action !== "pesquisa",
          })}
        >
          <option value="">Selecione</option>
          {Object.entries(CategoriaEnumSituacao).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
          {errors?.in_ativo?.map?.((error, index) => (
            <MessageFormCampo key={index} message={error} />
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};

export default CategoriaFormFields;
