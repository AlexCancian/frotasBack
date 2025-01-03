import connectionFrotas from "../dataBase/data";
import Veiculo from "../entity/Veiculo";
import IVeiculo from "../interfaces/IVeiculo";

const veiculo = connectionFrotas.getRepository(Veiculo);

const getVeiculo = async (): Promise<IVeiculo[]> => {
  const data = await veiculo.find();
  return data;
};

const getVeiculoRelation = async (): Promise<IVeiculo[]> => {
  const data = await veiculo.find({
    relations: ["combustivelId", "filialId"],
  });
  return data;
};

const getVeiculoRelationById = async (placa: string): Promise<any> => {
  const veiculos = await veiculo.findOne({where:{placa},
    relations: ["combustivelId", "filialId"],
  });
  if (!veiculos) {
    return { status: 404, message: "id não existe" };
  }
  return veiculos;
};

const getVeiculoById = async (placa: string): Promise<any> => {
  const veiculos = await veiculo.findOneBy({ placa });
  if (!veiculos) {
    return { status: 404, message: "id não existe" };
  }
  return veiculos;
};

const postVeiculo = async (novoVeiculo: IVeiculo): Promise<any> => {
  const exist = await veiculo.findOne({
    where: { placa: novoVeiculo.placa },
  });
  if (exist !== null) {
    return {
      status: 409,
      message: `${novoVeiculo.placa} já existe no banco de dados`,
    };
  }

  const newVeiculo = await veiculo.create({
    placa: novoVeiculo.placa,
    nome: novoVeiculo.nome,
    ano: novoVeiculo.ano,
    modelo: novoVeiculo.modelo,
    rodando: novoVeiculo.rodando,
    obs: novoVeiculo.obs,
    renavam: novoVeiculo.renavam,
    combustivelId: novoVeiculo.combustivelId,
    filialId: novoVeiculo.filialId,
  });
  await veiculo.save(newVeiculo);
  return newVeiculo;
};

const updateVeiculo = async (id: string, veiculoAtualizar: IVeiculo) => {
  try {
    const veiculos = await veiculo.findOne({
      where: {
        placa: id,
      },
    });
    if (veiculos) {
      const alteraVeiculo = await veiculo.update(id, {
        placa: veiculoAtualizar.placa,
        nome: veiculoAtualizar.nome,
        ano: veiculoAtualizar.ano,
        modelo: veiculoAtualizar.modelo,
        rodando: veiculoAtualizar.rodando,
        obs: veiculoAtualizar.obs,
        renavam: veiculoAtualizar.renavam,
        combustivelId: veiculoAtualizar.combustivelId,
        filialId: veiculoAtualizar.filialId,
      });
      return { status: 202, message: "Veiculo alterado com sucesso" };
    } else {
      throw { status: 401, message: "Veiculo não existe no banco de dados" };
    }
  } catch (error) {
    throw error;
  }
};

const removeVeiculo = async (placa: string): Promise<any> => {
  try {
    const veiculoExist = await veiculo.findOneBy({ placa });
    if (!veiculoExist) {
      return { status: 404, message: "id não existe" };
    }
    await veiculo.delete(placa);
    return { status: 200, message: "Veiculo removido com sucesso" };
  } catch (error) {
    throw error;
  }
};

const desativaVeiculo = async (id: string, status: boolean) => {
  try {
    const veiculos = await veiculo.findOne({
      where: {
        placa: id,
      },
    });
    if (veiculos) {
      const desativarVeiculos = await veiculo.update(id, { rodando: status });
      return "Veiculo atualizado com sucesso";
    } else {
      throw { status: 401, message: "Veiculo não existe no banco de dados" };
    }
  } catch (error) {
    throw error;
  }
};

export {
  getVeiculo,
  getVeiculoById,
  postVeiculo,
  updateVeiculo,
  removeVeiculo,
  desativaVeiculo,
  getVeiculoRelation,
  getVeiculoRelationById
};
