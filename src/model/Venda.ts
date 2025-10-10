import type { Livro } from "./Livro";

export interface Venda {
    id: number;
    nu_cpf: string;
    livro_id: number;
    livro: Livro;
    nu_preco: number;
    nu_quantidade: number;
    nu_preco_total: number;
}
