import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Livro } from "../../model/Livro";
import LivroFormFields from "../../pages/Livro/LivroFormFields";
import LivroService from "../../service/LivroService";
import FormButtons from "../form/FormButtons";

const LivroViewForm = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = (data: Livro) => {
    LivroService.atualizar(id, data).then(
      () => {
        toast.success("Livro alterado com sucesso!");
        navigate("/livro");
      },
      (error) => {
        toast.error("Falha ao alterar o livro");
        setErrors(error.response.data);
      }
    );
  };

  useEffect(() => {
    LivroService.buscarPorId(id).then((response) => reset(response.data));
  }, [id]);

  return (
    <main className="container">
      <section className="mb-4">
        <h2>Visualizar Livro</h2>
      </section>

      <section className="mb-4">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <LivroFormFields
            register={register}
            control={control}
            action="visualizacao"
          />
          <FormButtons action="visualizacao" reset={reset} urlVoltar="/livro" />
        </Form>
      </section>
    </main>
  );
};

export default LivroViewForm;
