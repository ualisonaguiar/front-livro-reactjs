import { Button } from "react-bootstrap";
import type { UseFormReset } from "react-hook-form";
import type { Livro } from "../../model/livro";

interface Props {
    reset?: UseFormReset<Livro>;
}

const ButtonPesquisarLimpar = ({ reset }: Props) => {
    const handleClear = () => {
        reset();
    };

    return (
        <div className="d-flex justify-content-end">
            <Button type="button" variant="secondary" onClick={handleClear}>
                Limpar
            </Button>
            <Button type="submit" variant="primary" className="ms-2">
                Pesquisar
            </Button>
        </div>
    );
};

export default ButtonPesquisarLimpar;
