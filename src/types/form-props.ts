import type { useForm } from "react-hook-form";

export interface FormProps {
    register: ReturnType<typeof useForm>["register"];
    control: ReturnType<typeof useForm>["control"];
    setValue: ReturnType<typeof useForm>["setValue"];
    errors?: { [key: string]: string[] };
    disabledFields?: boolean;
    watch?: any;
    action?: "pesquisa" | "cadastro" | "edicao" | "visualizacao";
}
