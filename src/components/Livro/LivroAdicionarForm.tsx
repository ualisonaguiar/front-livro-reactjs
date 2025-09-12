import { useNavigate } from "react-router-dom";
import type { Livro } from "../../model/livro";
import LivroFormularioPage from "../../pages/Livro/LivroFormularioPage";
import LivroService from "../../service/LivroService";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LivroAdicionarForm = () => {
    const { register, handleSubmit, control, reset } = useForm<Livro>({
        defaultValues: { nu_preco: 0.00 }
    });

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
        <div>
            <h2>Adicionar Livro</h2>
            <LivroFormularioPage
                register={register}
                control={control}
                handleSubmit={handleSubmit(onSubmit)}
                errors={errors}
            />
        </div>
    );
};

export default LivroAdicionarForm;
