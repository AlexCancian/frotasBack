import AgendaViagem from "../entity/AgendaViagem";

interface IViagem {
  km_ini: number;
  data_hr_ini: Date;
  local_saida: string;
  observacao_ini: string;
  km_final: number;
  data_hr_chegada: Date;
  lavagem: boolean;
  observacao_final: string;
  agendaId: AgendaViagem;
}
export default IViagem;
