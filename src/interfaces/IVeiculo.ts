import Combustivel from "../entity/Combustivel";
import Filial from "../entity/Filial";

interface IVeiculo {
  placa: string;
  nome: string;
  ano: number;
  modelo: number;
  rodando: boolean;
  obs: string;
  renavam: string;
  filialId: Filial;
  combustivelId: Combustivel;
}

export default IVeiculo;
