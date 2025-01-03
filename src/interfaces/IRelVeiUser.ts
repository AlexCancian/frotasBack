import User from "../entity/User";
import Veiculo from "../entity/Veiculo";

interface IRel {
  veiculoId: Veiculo;
  usuarioId: User;
  data_inicio: Date;
  data_fim: Date;
}

export default IRel;
