export class VendaUtils {
  static calcularTotal(quantidade: number, preco: number | string): {
    total: number;
    totalFormatado: string;
  } {
    const precoFloat = Number(String(preco || "0").replace(",", ".")) || 0;
    const quantidadeInt = Number(quantidade) || 0;

    const total = Math.round(quantidadeInt * precoFloat * 100) / 100;

    const totalFormatado = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return { total, totalFormatado };
  }
}
