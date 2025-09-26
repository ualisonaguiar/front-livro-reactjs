import { Form } from "react-bootstrap";
import type { Control, UseFormRegister, UseFormReset } from "react-hook-form";
import LivroFormButtons from "../../components/Livro/LivroFormButtons";
import type { Livro } from "../../model/Livro";
import LivroFormFields from "./LivroFormFields";

interface Props {
    register: UseFormRegister<Livro>;
    control: Control<Livro>;
    handleSubmit: (e?: React.BaseSyntheticEvent) => void;
    errors?: { [key: string]: string[] };
    action?: "pesquisa" | "cadastro" | "edicao" | "visualizacao";
    reset?: UseFormReset<Livro>;
}

const LivroFormularioPage = ({ register, control, handleSubmit, errors = {}, action, reset }: Props) => {
    return (
        <div className="main-form">
            <Form onSubmit={handleSubmit}>
                <LivroFormFields
                    register={register}
                    control={control}
                    errors={errors}
                    action={action}
                />
                <br />
                <LivroFormButtons action={action} reset={reset} />
                <br />
            </Form>
        </div>
    );
};

export default LivroFormularioPage;