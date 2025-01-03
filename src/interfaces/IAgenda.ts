import User from "../entity/User";
import Veiculo from "../entity/Veiculo";

interface IAgenda {
  data_agendamento: Date;
  data_ini_agenda: Date;
  data_final_agenda: Date;
  destino: string;
  n_ocupantes: number;
  usuarioId: User;
  veiculoId: Veiculo;
}
export default IAgenda;
