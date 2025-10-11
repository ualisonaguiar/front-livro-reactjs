import { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Venda } from "../../model/Venda";
import VendaFormFields from "../../pages/Venda/VendaFormFields";
import VendaService from "../../service/VendaService";
import FormButtons from "../form/FormButtons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function VendaAdicionar() {
  const { handleSubmit, register, control, setValue, watch } = useForm();
  const [errors, setErrors] = useState<{ [key: string]: string[] }>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Venda> = (data) => {
    VendaService.adicionar(data).then(
      () => {
        toast.success("Venda registrada com sucesso!");
        navigate("/venda");
      },
      (error) => {
        toast.error("Falha ao registrar a venda.");
        setErrors(error.response?.data || {});
      }
    );
  };

  return (
    <main className="container">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h2>Adicionar Venda</h2>
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
