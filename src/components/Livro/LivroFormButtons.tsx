import type { UseFormReset } from "react-hook-form";
import ButtonPesquisarLimpar from "../Buttons/ButtonPesquisarLimpar";
import ButtonVoltar from "../Buttons/ButtonVoltar";
import ButtonVoltarSalvar from "../Buttons/ButtonVoltarSalvar";
import type { Livro } from "../../model/Livro";

interface ButtonProps {
    action?: "pesquisa" | "cadastro" | "edicao" | "visualizacao";
    reset?: UseFormReset<Livro>;
}

const LivroFormButtons = ({ action, reset }: ButtonProps) => {

    if (action === 'pesquisa') {
        return <ButtonPesquisarLimpar reset={reset} />;
    }

    if (action === 'cadastro' || action === 'edicao') {
        return <ButtonVoltarSalvar urlVoltar="/livro" />;
    }

    return <ButtonVoltar urlVoltar="/livro" />;

};

export default LivroFormButtons;