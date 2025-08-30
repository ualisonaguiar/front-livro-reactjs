import type { Livro } from "../model/livro";
import api from "./api";

class LivroService {

    async listagem() {
        return api.get<Livro[]>("");
    }

    async buscarPorId(id: any) {
        return api.get<Livro>(`/${id}`);
    }

    async adicionar(livro: Livro) {
        return api.post("/", livro);
    }

    async atualizar(id: any, livro: Livro) {
        return api.put(`/${id}`, livro);
    }

    async remover(id: any) {
        return api.delete(`/${id}`);
    }
}

export default new LivroService();