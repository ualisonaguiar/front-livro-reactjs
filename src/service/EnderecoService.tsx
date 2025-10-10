import type { Endereco } from "../model/Endereco";
import api, { getRequiredAuth } from "./api";

class EnderecoService {

  async buscarPorEndereco(cep: string) {
    return api.get<Endereco>('busca-cep/' + cep, getRequiredAuth());
  }
}

export default new EnderecoService();
