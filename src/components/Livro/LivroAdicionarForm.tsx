import { useNavigate } from "react-router-dom";
import type { Livro } from "../../model/Livro";
import LivroFormularioPage from "../../pages/Livro/___LivroFormularioPage";
import LivroService from "../../service/LivroService";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import LivroFormFields from "../../pages/Livro/LivroFormFields";
import FormButtons from "../form/FormButtons";

const LivroAdicionarForm = () => {
    const { register, handleSubmit, control, reset } = useForm<Livro>();
    const [errors, setErrors] = useState<{ [key: string]: string[] }>();
    const navigate = useNavigate();

    const onSubmit = (data: Livro) => {
        LivroService.adicionar(data).then(
            () => {
                toast.success("Livro criado com sucesso!");
                reset();
                navigate("/livro");
            },
            (error) => {
                toast.error("Falha ao criar o livro");
                setErrors(error.response?.data || {});
            }
        );
    };

    return (
        <main className="container">
            <section className="mb-4">
                <h2>Adicionar Livro</h2>
            </section>

            <section className="mb-4">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <LivroFormFields
                        register={register}
                        control={control}
                        action='cadastro'
                    />
                    <FormButtons action='cadastro' reset={reset} urlVoltar="/livro" />
                </Form>
            </section>
        </main>
    );
};

export default LivroAdicionarForm;
