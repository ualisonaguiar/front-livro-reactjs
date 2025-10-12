import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { type UseFormRegister } from "react-hook-form";
import { toast } from "react-toastify";
import type { Endereco } from "../../model/Endereco";
import EnderecoService from "../../service/EnderecoService";
import MessageAguardeComponent from "../Messages/MessageAguardeComponent";
import MessageFormCampo from "../Messages/MessageFormCampo";

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
  errors?: { [key: string]: string[] };
}

const CEPComponent = ({ register, errors }: CEPComponentProps) => {
  const [endereco, setEndereco] = useState<Endereco>();
  const [loading, setLoading] = useState(false);

  const limparEndereco = (): Endereco => ({
    cep: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
    estado: "",
  });

  const onChangeBuscaEndereco = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const cep = event.target.value;

    setEndereco(limparEndereco());

    if (/^\d{8}$/.test(cep)) {
      setLoading(true);
      EnderecoService.buscarPorEndereco(cep)
        .then((response) => {
          setEndereco(response.data);
        })
        .catch(() => {
          toast.error("CEP: " + cep + " não encontrado.");
        })
        .finally(() => {
          setLoading(false);
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
          {errors?.nu_cep?.map?.((error, index) => (
            <MessageFormCampo key={index} message={error} />
          ))}
        </Col>

        <Col xs={6}>
          <Form.Group controlId="ds_logradouro">
            <Form.Label>Logradouro</Form.Label>
            <Form.Control
              type="text"
              disabled={true}
              value={endereco?.logradouro}
              {...register("ds_logradouro")}
            />
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
          {errors?.ds_numero?.map?.((error, index) => (
            <MessageFormCampo
              key={index}
              message={error}
              {...register("ds_numero")}
            />
          ))}
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
            <Form.Control
              type="text"
              disabled={true}
              value={endereco?.bairro}
              {...register("ds_bairro")}
            />
          </Form.Group>
        </Col>

        <Col xs={4}>
          <Form.Group controlId="ds_municipio">
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              type="text"
              disabled={true}
              value={endereco?.localidade}
              {...register("ds_municipio")}
            />
          </Form.Group>
        </Col>

        <Col xs={2}>
          <Form.Group controlId="ds_estado">
            <Form.Label>UF</Form.Label>
            <Form.Control
              type="text"
              disabled={true}
              value={endereco?.uf}
              {...register("ds_estado")}
            />
          </Form.Group>
        </Col>
      </Row>

      <MessageAguardeComponent show={loading} message="Buscando endereço..." />
    </>
  );
};

export default CEPComponent;
