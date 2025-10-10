import type { CEP } from "../model/CEP";
import api, { getRequiredAuth } from "./api";

class CEPService {
  private contexto: string = "busca-cep";

  async buscarPorEndereco(cep: string) {
    return api.get<CEP>(`${this.contexto}/${cep}`, getRequiredAuth());
  }
}

export default new CEPService();
