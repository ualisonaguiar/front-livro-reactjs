import type { Control, UseFormRegister, FieldValues } from "react-hook-form";

export interface FormProps<T extends FieldValues> {
    register?: UseFormRegister<T>;
    control?: Control<T>;
    errors?: { [key: string]: string[] };
    disabledFields?: boolean;
    action?: "pesquisa" | "cadastro" | "edicao" | "visualizacao";
}
