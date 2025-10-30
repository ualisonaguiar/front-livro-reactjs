import { Form } from "react-bootstrap";
import FormButtons from "../form/FormButtons";
import { useForm } from "react-hook-form";
import type { Categoria } from "../../model/Categoria";
import CategoriaService from "../../service/CategoriaService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CategoriaFormFields from "../../pages/Categoria/CategoriaFormFields";

const CategoriaForm = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string[] }>();

  const onSubmit = (data: Categoria) => {
    CategoriaService.adicionar(data).then(
      () => {
        toast.success("Categoria criada com sucesso!");
        reset();
        navigate("/categoria");
      },
      (error) => {
        toast.error("Falha ao criar a categoria");
        setErrors(error.response?.data || {});
      }
    );
  };

  return (
    <main className="container">
      <section className="mb-4">
        <h2>Adicionar Categoria</h2>
      </section>

      <section className="mb-4">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CategoriaFormFields
            register={register}
            control={control}
            action="cadastro"
            errors={errors}
          />

          <FormButtons action="cadastro" reset={reset} urlVoltar="/categoria" />
        </Form>
      </section>
    </main>
  );
};

export default CategoriaForm;
