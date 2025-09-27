import { Controller } from "react-hook-form";
import type { InterfaceInputForm } from "./InterfaceInputForm";
import { Form } from "react-bootstrap";
import { CurrencyUtils } from "../Utils/CurrencyUtils";
import MessageFormCampo from "../Messages/MessageFormCampo";

export const PrecoInputForm = ({
    control,
    name,
    label = "Preço",
    disabled = false,
    errors,
}: InterfaceInputForm) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <Form.Group controlId="price">
                        <Form.Label>{label}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="R$ 0,00"
                            onChange={(e) =>
                                onChange(e.target.value.replace(/\D/g, ""))
                            }
                            value={CurrencyUtils.formatarMoeda(value)}
                            disabled={disabled}
                        />
                        {errors?.[name]?.map?.((error: string, index: number) => (
                            <MessageFormCampo key={index} message={error} />
                        ))}
                    </Form.Group>
                )}
            />
        </>
    );
};