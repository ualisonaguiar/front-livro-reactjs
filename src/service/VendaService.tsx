import { buildQueryParams } from "../components/Utils/Paginator/queryParamsUtils";
import type { Venda } from "../model/Venda";
import api from "./api";

class VendaService {

    private contexto: string = 'vendas';

    async listagem(numeroPagina: number = 1, filtros: Record<string, any> = {}) {

        const query = buildQueryParams(numeroPagina, filtros);

        return api.get<Venda[]>(`${this.contexto}?${query}`);
    }

}

export default new VendaService();