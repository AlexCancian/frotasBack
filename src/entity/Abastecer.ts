import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Veiculo from "./Veiculo";
import User from "./User";

@Entity("abastecimento")
class Abastece {
  @PrimaryGeneratedColumn("increment")
  id_abastecimento: number;

  @Column("int")
  km: number;

  @Column("datetime")
  data_hr_abas: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  litro: number;

  @Column("decimal", { precision: 10, scale: 2 })
  preco_litro: number;

  @Column("decimal", { precision: 10, scale: 2 })
  vlr_abast_nota: number;

  @ManyToOne(
    () => Veiculo,
    (veiculosServicos) => veiculosServicos.veiAbastecimento
  )
  @JoinColumn({ name: "placa" })
  veiculoId: Veiculo;

  @ManyToOne(() => User, (usuario) => usuario.userAbastecimento)
  @JoinColumn({ name: "id_usuario" })
  usuarioId: User;
}

export default Abastece;
