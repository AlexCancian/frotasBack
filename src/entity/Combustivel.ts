import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Veiculo from "./Veiculo";

@Entity("tipo_combustivel")
class Combustivel {
  @PrimaryGeneratedColumn("increment")
  id_tipo_combus: number;

  @Column("varchar", { length: 150 })
  nome_combus: string;

  @Column("boolean", { default: true })
  ativo: boolean;

  @OneToMany(() => Veiculo, (veiculos) => veiculos.combustivelId)
  combustivelVeiculo: Veiculo[];
}
export default Combustivel;
