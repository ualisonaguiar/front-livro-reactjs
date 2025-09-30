import { Form } from "react-bootstrap";
import type { Control, UseFormRegister, UseFormReset } from "react-hook-form";
import FormButtons from "../../components/form/FormButtons";
import type { Livro } from "../../model/Livro";
import LivroFormFields from "./LivroFormFields";

interface Props {
    register: UseFormRegister<Livro>;
    control: Control<Livro>;
    handleSubmit: (e?: React.BaseSyntheticEvent) => void;
    errors?: { [key: string]: string[] };
    action?: "pesquisa" | "cadastro" | "edicao" | "visualizacao";
    reset?: UseFormReset<Livro>;
    title: string;
}

const LivroFormularioPage = ({ register, control, handleSubmit, errors = {}, action, reset, title }: Props) => {
    return (
        <main className="container">
            <br />
            <section className="mb-4">
                <h2>{title}</h2>
            </section>

            <section className="mb-4">
                <Form onSubmit={handleSubmit}>
                    <LivroFormFields
                        register={register}
                        control={control}
                        errors={errors}
                        action={action}
                    />
                    <br />
                    <FormButtons action={action} reset={reset} urlVoltar="/livro" />
                </Form>
            </section>
        </main>
    );
};

export default LivroFormularioPage;