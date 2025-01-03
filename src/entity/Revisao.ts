import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Veiculo from "./Veiculo";

@Entity("revisao")
class Revisao {
  @PrimaryGeneratedColumn("increment")
  id_revisao: number;

  @Column("varchar", { length: 150 })
  nome: string;

  @Column("varchar", { length: 200 })
  tipo_rev: string;

  @Column("int")
  km_atual: number;

  @Column("varchar", { length: 120 })
  local: string;

  @Column("varchar", { length: 500 })
  obs_rev: string;

  @ManyToOne(() => Veiculo, (veiculos) => veiculos.veiculosRevisao)
  @JoinColumn({ name: "placa" })
  veiculoId: Veiculo;
}

export default Revisao;
