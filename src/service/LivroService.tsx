import type { Livro } from "../model/livro";
import api from "./api";

class LivroService {

    private contexto: string = 'livros';

    async listagem(numeroPagina: number = 1) {
        return api.get<Livro[]>(this.contexto + '?page=' + numeroPagina);
    }

    async buscarPorId(id: number) {
        return api.get<Livro>(`${this.contexto}/${id}`);
    }

    async adicionar(livro: Livro) {
        return api.post(this.contexto, livro);
    }

    async atualizar(id: number, livro: Livro) {
        return api.put(`${this.contexto}/${id}`, livro);
    }

    async remover(id: number) {
        return api.delete(`${this.contexto}/${id}`);
    }
}

export default new LivroService();