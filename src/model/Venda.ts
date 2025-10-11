import type { Livro } from "./Livro";
import type { Usuario } from "./Usuario";

export interface Venda {
  id: number;
  livro_id: number;
  livro: Livro;
  nu_preco: number;
  nu_quantidade: number;
  nu_preco_total: number;
  nu_cep: string;
  ds_complemento: string;
  ds_numero: string;
  usuario: Usuario;
}
