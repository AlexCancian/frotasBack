import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import bcrypt from "bcrypt";
import AgendaViagem from "./AgendaViagem";
import RelVeiUser from "./RelaVeiUser";
import Abastece from "./Abastecer";

@Entity("usuario")
class User {
  @PrimaryGeneratedColumn("increment")
  id_usuario: number;

  @Column("varchar", { length: 150 })
  nome: string;

  @Column("int")
  numero_user_ERP: number;

  @Column("boolean", { default: false })
  admin: boolean;

  @Column("char", { length: 11 })
  celular: string;

  @Column("boolean", { default: true })
  status: boolean;

  @Column("varchar", { length: 255 })
  senha: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashSenha() {
    if (this.senha) {
      this.senha = bcrypt.hashSync(this.senha, 8);
    }
  }

  @OneToMany(() => RelVeiUser, (relacionamento) => relacionamento.usuarioId)
  userRelVeiUser: RelVeiUser[];

  @OneToMany(() => AgendaViagem, (viagem) => viagem.usuarioId)
  usuariosAgendaViagem: AgendaViagem[];

  @OneToMany(() => Abastece, (abastecer) => abastecer.usuarioId)
  userAbastecimento: Abastece[];
}

export default User;
