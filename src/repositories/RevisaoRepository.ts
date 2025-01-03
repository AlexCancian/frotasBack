import connectionFrotas from "../dataBase/data";
import Revisao from "../entity/Revisao";
import IRevisao from "../interfaces/IRevisao";

const revisao = connectionFrotas.getRepository(Revisao);

const getRevisao = async (): Promise<IRevisao[]> => {
  const data = await revisao.find();
  return data;
};

const getRevisaoRelation = async (): Promise<IRevisao[]> => {
  const data = await revisao.find({
    relations: ["veiculoId"],
  });
  return data;
};

const getRevisaoById = async (id_revisao: number): Promise<any> => {
  const revisoes = await revisao.findOneBy({ id_revisao });
  if (!revisoes) {
    return { status: 404, message: "id não existe" };
  }
  return revisoes;
};

const postRevisao = async (novaRevisao: IRevisao): Promise<any> => {
  const { km_atual, veiculoId } = novaRevisao;
  const exist = await revisao
    .createQueryBuilder("rev")
    .where("rev.placa = :placa", { placa: veiculoId })
    .andWhere("rev.km_atual > :km_atual", { km_atual })
    .getOne();
  if (exist !== null) {
    return {
      status: 409,
      message: `${novaRevisao.veiculoId} já tem revisões com km maior que ${km_atual}`,
    };
  }

  const newRevisao = await revisao.create({
    nome: novaRevisao.nome,
    tipo_rev: novaRevisao.tipo_rev,
    km_atual: novaRevisao.km_atual,
    local: novaRevisao.local,
    obs_rev: novaRevisao.obs_rev,
    veiculoId: novaRevisao.veiculoId,
  });
  await revisao.save(newRevisao);
  return newRevisao;
};

const updateRevisao = async (id: number, revisaoAtualizar: IRevisao) => {
  try {
    const revisoes = await revisao.findOne({
      where: {
        id_revisao: id,
      },
    });
    if (revisoes) {
      const alteraRevisao = await revisao.update(id, {
        nome: revisaoAtualizar.nome,
        tipo_rev: revisaoAtualizar.tipo_rev,
        km_atual: revisaoAtualizar.km_atual,
        local: revisaoAtualizar.local,
        obs_rev: revisaoAtualizar.obs_rev,
        veiculoId: revisaoAtualizar.veiculoId,
      });
      return { status: 202, message: "Revisão alterada com sucesso" };
    } else {
      throw {
        status: 401,
        message: "Revisão não existe no banco de dados",
      };
    }
  } catch (error) {
    throw error;
  }
};

const removeRevisao = async (id_revisao: number): Promise<any> => {
  try {
    const revisaoExist = await revisao.findOneBy({ id_revisao });
    if (!revisaoExist) {
      return { status: 404, message: "id não existe" };
    }
    await revisao.delete(id_revisao);
    return { status: 200, message: "Revisão removida com sucesso" };
  } catch (error) {
    throw error;
  }
};

export {
  getRevisao,
  getRevisaoRelation,
  getRevisaoById,
  postRevisao,
  updateRevisao,
  removeRevisao,
};
