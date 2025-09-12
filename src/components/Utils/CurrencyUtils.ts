export class CurrencyUtils {
    static formatarMoeda(valor: number): string {

        const valorConvert = String(valor);

        if (!valorConvert)
            return "";

        const valorLimpo = valorConvert.replace(/\D/g, "");
        if (valorLimpo === "")
            return "";

        const valorEmNumero = Number(valorLimpo) / 100;

        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valorEmNumero);
    }

    static limparMoeda(valor: string): number {
        if (!valor) return 0;
        const valorLimpo = valor.replace(/\D/g, "");
        return Number(valorLimpo) / 100;
    }
}
