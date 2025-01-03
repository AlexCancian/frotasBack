import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import User from "../entity/User";
import Filial from "../entity/Filial";
import Combustivel from "../entity/Combustivel";
import Veiculo from "../entity/Veiculo";
import RelVeiUser from "../entity/RelaVeiUser";
import Revisao from "../entity/Revisao";
import AgendaViagem from "../entity/AgendaViagem";
import Abastece from "../entity/Abastecer";
import Viagem from "../entity/Viagem";

dotenv.config();

const connectionFrotas = new DataSource({
  type: "mysql",
  host: process.env.DB_HOSTNAME,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  extra: { decimalNumbers: true },
  logging: false,
  timezone: "Z",
  entities: [
    User,
    Filial,
    Combustivel,
    Veiculo,
    RelVeiUser,
    Revisao,
    AgendaViagem,
    Abastece,
    Viagem,
  ],
  migrations: [],
  subscribers: [],
});

export default connectionFrotas;
