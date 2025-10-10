import { Col, Form, Row } from "react-bootstrap";
import type { UseFormRegister } from "react-hook-form";
import CEPService from "../../service/CEPService";

type EnderecoForm = {
  nu_cep: string;
  ds_logradouro: string;
  ds_numero: string;
  ds_complemento: string;
  ds_bairro: string;
  ds_localidade: string;
  ds_uf: string;
};

interface CEPComponentProps {
  register: UseFormRegister<EnderecoForm>;
}

const CEPComponent = ({ register }: CEPComponentProps) => {
  const onChangeBuscaEndereco = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value.length === 8) {
      CEPService.buscarPorEndereco(event.target.value)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Row className="mb-3">
        <Col xs={2}>
          <Form.Group controlId="nu_cep">
            <Form.Label>CEP</Form.Label>
            <Form.Control
              type="text"
              placeholder="00000-000"
              {...register("nu_cep", { required: true })}
              maxLength={8}
              onChange={onChangeBuscaEndereco}
            />
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group controlId="ds_logradouro">
            <Form.Label>Logradouro</Form.Label>
            <Form.Control type="text" disabled={true} />
          </Form.Group>
        </Col>

        <Col xs={1}>
          <Form.Group controlId="ds_numero">
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="text"
              {...register("ds_numero", { required: true })}
            />
          </Form.Group>
        </Col>

        <Col xs={3}>
          <Form.Group controlId="ds_complemento">
            <Form.Label>Complemento</Form.Label>
            <Form.Control type="text" {...register("ds_complemento")} />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={6}>
          <Form.Group controlId="ds_bairro">
            <Form.Label>Bairro</Form.Label>
            <Form.Control type="text" disabled={true} />
          </Form.Group>
        </Col>

        <Col xs={4}>
          <Form.Group controlId="ds_localidade">
            <Form.Label>Cidade</Form.Label>
            <Form.Control type="text" disabled={true} />
          </Form.Group>
        </Col>

        <Col xs={2}>
          <Form.Group controlId="ds_uf">
            <Form.Label>UF</Form.Label>
            <Form.Control type="text" disabled={true} />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default CEPComponent;
