import { buildQueryParams } from "../components/Utils/Paginator/queryParamsUtils";
import type { Venda } from "../model/Venda";
import api, { getRequiredAuth } from "./api";

class VendaService {
  private contexto: string = "vendas";

  async listagem(numeroPagina: number = 1, filtros: Record<string, any> = {}) {
    const query = buildQueryParams(numeroPagina, filtros);
    return api.get<Venda[]>(`${this.contexto}?${query}`, getRequiredAuth());
  }

  async adicionar(venda: Venda) {
    return api.post(this.contexto, this.criarPayload(venda), getRequiredAuth());
  }

  async alterar(id: number, venda: Venda) {
    return api.put(
      `${this.contexto}/${id}`,
      this.criarPayload(venda),
      getRequiredAuth()
    );
  }

  private criarPayload(venda: Venda) {
    return {
      livro_id: venda.livro.id,
      nu_quantidade: venda.nu_quantidade,
      nu_cep: venda.nu_cep,
      ds_complemento: venda.ds_complemento,
      ds_numero: venda.ds_numero,
    };
  }

  async buscarPorId(id: number) {
    return api.get<Venda>(`${this.contexto}/${id}`, getRequiredAuth());
  }
}

export default new VendaService();
