export class CpfCnpjUtils {

    static formatarCPF(valor: string): string {
        if (!valor) {
            return "";
        }

        // Remove tudo que não for número
        const apenasNumeros = valor.replace(/\D/g, "");

        // Garante no máximo 11 dígitos
        const cpf = apenasNumeros.slice(0, 11);

        // Aplica a máscara de CPF
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    static formatarCNPJ(valor: string): string {
        if (!valor) {
            return "";
        }

        // Remove tudo que não for número
        const apenasNumeros = valor.replace(/\D/g, "");

        // Garante no máximo 14 dígitos
        const cnpj = apenasNumeros.slice(0, 14);

        // Aplica a máscara de CNPJ
        return cnpj.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            "$1.$2.$3/$4-$5"
        );
    }
}