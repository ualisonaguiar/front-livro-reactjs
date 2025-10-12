export class CurrencyUtils {
  static formatarMoeda(valor: number | string): string {
    if (valor === null || valor === undefined || valor === "") return "";

    let valorEmNumero: number;

    if (typeof valor === "string") {
      const valorLimpo = valor.replace(/[^\d,.-]/g, "");
      valorEmNumero = parseFloat(valorLimpo.replace(",", "."));
    } else {
      valorEmNumero = valor;
    }

    if (isNaN(valorEmNumero)) return "";

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valorEmNumero);
  }

  static limparMoeda(valor: string): number {
    if (!valor) return 0;
    const valorLimpo = valor.replace(/[^\d,.-]/g, "");
    return parseFloat(valorLimpo.replace(",", "."));
  }
}
