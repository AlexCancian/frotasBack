import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import Filial from "./Filial";
import Combustivel from "./Combustivel";
import RelVeiUser from "./RelaVeiUser";
import Revisao from "./Revisao";
import AgendaViagem from "./AgendaViagem";
import Abastece from "./Abastecer";

@Entity("veiculo")
class Veiculo {
  @PrimaryColumn("char", { length: 7 })
  placa: string;

  @Column("varchar", { length: 120 })
  nome: string;

  @Column("smallint")
  ano: number;

  @Column("smallint")
  modelo: number;

  @Column("boolean", { default: true })
  rodando: boolean;

  @Column("varchar", { length: 250 })
  obs: string;

  @Column("char", { length: 15 })
  renavam: string;

  @ManyToOne(() => Filial, (empresas) => empresas.empresasVeiculo)
  @JoinColumn({ name: "id_filial" })
  filialId: Filial;

  @ManyToOne(() => Combustivel, (combustivel) => combustivel.combustivelVeiculo)
  @JoinColumn({ name: "id_tipo_combus" })
  combustivelId: Combustivel;

  @OneToMany(() => RelVeiUser, (relacionamento) => relacionamento.veiculoId)
  veiRelVeiUser: RelVeiUser[];

  @OneToMany(() => Revisao, (revisoes) => revisoes.veiculoId)
  veiculosRevisao: Revisao[];

  @OneToMany(() => AgendaViagem, (viagem) => viagem.veiculoId)
  veiculosAgendaViagem: AgendaViagem[];

  @OneToMany(() => Abastece, (abastecer) => abastecer.veiculoId)
  veiAbastecimento: Abastece[];
}

export default Veiculo;
