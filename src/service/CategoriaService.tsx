import { buildQueryParams } from "../components/Utils/Paginator/queryParamsUtils";
import type { Categoria } from "../model/Categoria";
import api, { getRequiredAuth } from "./api";

class CategoriaService {
  private contexto: string = "categorias";

  async listagem(numeroPagina: number = 1, filtros: Record<string, any> = {}) {
    const query = buildQueryParams(numeroPagina, filtros);

    return api.get<Categoria[]>(`${this.contexto}?${query}`, getRequiredAuth());
  }

  async adicionar(categoria: Categoria) {
    return api.post(this.contexto, categoria, getRequiredAuth());
  }
}

export default new CategoriaService();
