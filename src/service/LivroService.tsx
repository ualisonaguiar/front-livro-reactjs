import { buildQueryParams } from "../components/Utils/Paginator/queryParamsUtils";
import type { Livro } from "../model/Livro";
import api from "./api";

class LivroService {

    private contexto: string = 'livros';

    async listagem(numeroPagina: number = 1, filtros: Record<string, any> = {}) {

        const query = buildQueryParams(numeroPagina, filtros);

        console.log(this.getRequiredAuth());

        return api.get<Livro[]>(`${this.contexto}?${query}`, this.getRequiredAuth());
    }

    async buscarPorId(id: number) {
        return api.get<Livro>(`${this.contexto}/${id}`, this.getRequiredAuth());
    }

    async adicionar(livro: Livro) {
        return api.post(this.contexto, livro, this.getRequiredAuth());
    }

    async atualizar(id: number, livro: Livro) {
        return api.put(`${this.contexto}/${id}`, livro, this.getRequiredAuth());
    }

    async remover(id: number) {
        return api.delete(`${this.contexto}/${id}`, this.getRequiredAuth());
    }

    getRequiredAuth() {
        return {
            headers: {
                requiresAuth: true
            }
        };
    }
}

export default new LivroService();