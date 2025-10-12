import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { Venda } from "../../model/Venda";
import VendaFormFields from "../../pages/Venda/VendaFormFields";
import VendaService from "../../service/VendaService";
import FormButtons from "../form/FormButtons";

export default function VendaForm() {
  const { handleSubmit, register, control, setValue, watch, reset } = useForm();
  const [errors, setErrors] = useState<{ [key: string]: string[] }>();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit: SubmitHandler<Venda> = (data) => {
    const acao = id
      ? VendaService.alterar(Number(id), data)
      : VendaService.adicionar(data);

    acao.then(
      () => {
        toast.success(
          id ? "Venda atualizada com sucesso!" : "Venda registrada com sucesso!"
        );
        navigate("/venda");
      },
      (error) => {
        toast.error(error.response?.data?.error || "Erro ao salvar venda");
        setErrors(error.response?.data);
      }
    );
  };

  const isEditMode = id !== undefined;
  const title = isEditMode ? "Editar" : "Adicionar";

  useEffect(() => {
    if (!isEditMode) return;

    VendaService.buscarPorId(Number(id)).then((response) => {
      response.data.nu_cep = response.data.livro_entrega.nu_cep;
      response.data.ds_logradouro = response.data.livro_entrega.ds_logradouro;
      response.data.ds_bairro = response.data.livro_entrega.ds_bairro;
      response.data.ds_numero = response.data.livro_entrega.ds_numero;
      response.data.ds_complemento = response.data.livro_entrega.ds_complemento;
      response.data.ds_municipio = response.data.livro_entrega.ds_municipio;
      response.data.ds_estado = response.data.livro_entrega.ds_estado;

      reset(response.data);
    });
  }, [id, isEditMode, reset]);

  return (
    <main className="container">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h2>{title} Venda</h2>
      </header>

      <section className="mb-4">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <VendaFormFields
            register={register}
            setValue={setValue}
            control={control}
            watch={watch}
            errors={errors}
          />
          <br />
          <FormButtons action="cadastro" urlVoltar="/venda" />
        </Form>
      </section>
    </main>
  );
}
