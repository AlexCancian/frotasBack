import Veiculo from "../entity/Veiculo";

interface IRevisao {
  nome: string;
  tipo_rev: string;
  km_atual: number;
  local: string;
  obs_rev: string;
  veiculoId: Veiculo;
}

export default IRevisao;
