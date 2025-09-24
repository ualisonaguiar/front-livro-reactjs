import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Livro } from "../../model/livro";
import LivroFormularioPage from "../../pages/Livro/LivroFormularioPage";
import LivroService from "../../service/LivroService";

const LivrViewForm = () => {

    const { register, handleSubmit, control, reset } = useForm<Livro>({
        defaultValues: {
            id: 0,
            no_nome: "",
            no_autor: "",
            nu_quantidade: 0,
            nu_preco: 0,
            dt_lancamento: "",
        },
    });

    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    const { id } = useParams();
    const navigate = useNavigate();

    const onSubmit = (data: Livro) => {
        LivroService.atualizar(id, data).then(
            response => {
                toast.success("Livro alterado com sucesso!");
                navigate("/livro");
            },
            error => {
                toast.error("Falha ao alterar o livro");
                setErrors(error.response.data);
            }
        );
    };

    useEffect(() => {
        LivroService.buscarPorId(id).then((response) => reset(response.data));
    }, [id]);

    return (
        <>
            <div>
                <h2>Visualizar Livro</h2>
                <LivroFormularioPage
                    register={register}
                    control={control}
                    handleSubmit={handleSubmit(onSubmit)}
                    errors={errors}
                    disabledFields={true}
                />
            </div>
        </>
    )
};

export default LivrViewForm;
