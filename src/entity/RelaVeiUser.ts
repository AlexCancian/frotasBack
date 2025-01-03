import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import User from "./User";
import Veiculo from "./Veiculo";

@Entity("rela_veiculo_user")
class RelVeiUser {
  @PrimaryGeneratedColumn("increment")
  id_rela: number;

  @ManyToOne(() => User, (usuarios) => usuarios.userRelVeiUser)
  @JoinColumn({ name: "id_usuario" })
  usuarioId: User;

  @ManyToOne(() => Veiculo, (veiculos) => veiculos.veiRelVeiUser)
  @JoinColumn({ name: "placa" })
  veiculoId: Veiculo;

  @Column("date")
  data_inicio: Date;

  @Column("date")
  data_fim: Date;
}

export default RelVeiUser;
