import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Veiculo from "./Veiculo";

@Entity("filial_local")
class Filial {
  @PrimaryGeneratedColumn("increment")
  id_filial: number;

  @Column("varchar", { length: 150 })
  nome: string;

  @Column("char", { length: 14 })
  cnpj: string;

  @Column("boolean", { default: true })
  ativo: boolean;

  @OneToMany(() => Veiculo, (veiculos) => veiculos.filialId)
  empresasVeiculo: Veiculo[];
}
export default Filial;
