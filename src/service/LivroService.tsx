import type { Livro } from "../model/livro";
import api from "./api";

class LivroService {

    private contexto: string = "livros";

    async listagem() {
        return api.get<Livro[]>(this.contexto);
    }

    async buscarPorId(id: any) {
        return api.get<Livro>(`${this.contexto}/${id}`);
    }

    async adicionar(livro: Livro) {
        return api.post(this.contexto, livro);
    }

    async atualizar(id: any, livro: Livro) {
        return api.put(`${this.contexto}/${id}`, livro);
    }

    async remover(id: any) {
        return api.delete(`${this.contexto}/${id}`);
    }
}

export default new LivroService();