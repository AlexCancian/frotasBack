import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import AgendaViagem from "./AgendaViagem";

@Entity("viagem")
class Viagem {
  @PrimaryGeneratedColumn("increment")
  id_viagem: number;

  @Column("int")
  km_ini: number;

  @Column("datetime")
  data_hr_ini: Date;

  @Column("varchar", { length: 200 })
  local_saida: string;

  @Column("varchar", { length: 500 })
  observacao_ini: string;

  @Column("int")
  km_final: number;

  @Column("datetime")
  data_hr_chegada: Date;

  @Column("boolean", { default: false })
  lavagem: boolean;

  @Column("varchar", { length: 500 })
  observacao_final: string;

  @Column("varchar", { length: 120 })
  nome_veiculo: string;

  @Column("char", { length: 7 })
  placa: string;

  @Column("int")
  id_usuario: number;

  @ManyToOne(() => AgendaViagem, (agenda) => agenda.agendaViagem)
  @JoinColumn({ name: "id_agenda" })
  agendaId: AgendaViagem;
}

export default Viagem;
