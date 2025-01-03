import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import Veiculo from "./Veiculo";
import User from "./User";
import Viagem from "./Viagem";

@Entity("agenda")
class AgendaViagem {
  @PrimaryGeneratedColumn("increment")
  id_agenda: number;

  @Column("datetime")
  data_agendamento: Date;

  @Column("datetime")
  data_ini_agenda: Date;

  @Column("datetime")
  data_final_agenda: Date;

  @Column("varchar", { length: 500 })
  destino: string;

  @Column("smallint")
  n_ocupantes: number;

  @ManyToOne(() => Veiculo, (veiculos) => veiculos.veiculosAgendaViagem)
  @JoinColumn({ name: "placa" })
  veiculoId: Veiculo;

  @ManyToOne(() => User, (usuarios) => usuarios.usuariosAgendaViagem)
  @JoinColumn({ name: "id_usuario" })
  usuarioId: User;

  @OneToMany(() => Viagem, (viagem) => viagem.agendaId)
  agendaViagem: Viagem[];
}

export default AgendaViagem;
