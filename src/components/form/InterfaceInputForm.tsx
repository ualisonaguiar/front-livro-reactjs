import type { Control } from "react-hook-form";

export interface InterfaceInputForm {
    control: Control;
    name: string;
    label: string;
    disabled?: boolean;
    errors?: Record<string, string[]>;
}