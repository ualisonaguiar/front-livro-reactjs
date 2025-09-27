import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import MessageFormCampo from "../Messages/MessageFormCampo";
import { CpfCnpjUtils } from "../Utils/CpfCnpjUtils";
import type { InterfaceInputForm } from "./InterfaceInputForm";

export const CPFInputForm = ({
    control,
    name,
    label = "CPF",
    disabled = false,
    errors,
}: InterfaceInputForm) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
                <Form.Group controlId={name}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                        type="text"
                        maxLength={14}
                        value={CpfCnpjUtils.formatarCPF(value)}
                        onChange={(e) => {
                            const apenasNumeros = e.target.value.replace(/\D/g, "");
                            onChange(apenasNumeros);
                        }}
                        disabled={disabled}
                    />
                    {errors?.[name]?.map?.((error: string, index: number) => (
                        <MessageFormCampo key={index} message={error} />
                    ))}
                </Form.Group>
            )}
        />
    );
};
