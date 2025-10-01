import { buildQueryParams } from "../components/Utils/Paginator/queryParamsUtils";
import type { Livro } from "../model/Livro";
import api, { getRequiredAuth } from "./api";

class LivroService {

    private contexto: string = 'livros';

    async listagem(numeroPagina: number = 1, filtros: Record<string, any> = {}) {

        const query = buildQueryParams(numeroPagina, filtros);

        return api.get<Livro[]>(`${this.contexto}?${query}`, getRequiredAuth());
    }

    async buscarPorId(id: number) {
        return api.get<Livro>(`${this.contexto}/${id}`, getRequiredAuth());
    }

    async adicionar(livro: Livro) {
        return api.post(this.contexto, livro, getRequiredAuth());
    }

    async atualizar(id: number, livro: Livro) {
        return api.put(`${this.contexto}/${id}`, livro, getRequiredAuth());
    }

    async remover(id: number) {
        return api.delete(`${this.contexto}/${id}`, getRequiredAuth());
    }
}

export default new LivroService();