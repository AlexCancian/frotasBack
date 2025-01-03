import { Brackets } from "typeorm";
import connectionFrotas from "../dataBase/data";
import RelVeiUser from "../entity/RelaVeiUser";
import IRel from "../interfaces/IRelVeiUser";

const relUserVei = connectionFrotas.getRepository(RelVeiUser);

const getRelUserVei = async (): Promise<IRel[]> => {
  const data = await relUserVei.find();
  return data;
};

const getRelUserVeiRelation = async (): Promise<IRel[]> => {
  const data = await relUserVei.find({
    relations: ["veiculoId", "usuarioId"],
  });
  return data;
};

const getRelUserVeiRelationById = async (id_rela: number): Promise<any> => {
  const relUserVeiculos = await relUserVei.findOne({
    where: { id_rela },
    relations: ["veiculoId", "usuarioId"],
  });
  if (!relUserVeiculos) {
    return { status: 404, message: "id não existe" };
  }
  return relUserVeiculos;
};

const getRelUserVeiById = async (id_rela: number): Promise<any> => {
  const relUserVeiculos = await relUserVei.findOneBy({ id_rela });
  if (!relUserVeiculos) {
    return { status: 404, message: "id não existe" };
  }
  return relUserVeiculos;
};

const postRelUserVei = async (novoRelUserVei: IRel): Promise<any> => {
  const { veiculoId, usuarioId, data_inicio, data_fim } = novoRelUserVei;

  const exist = await relUserVei
    .createQueryBuilder("rel")
    .where("rel.placa= :placa", { placa: veiculoId })
    .andWhere("rel.id_usuario = :id_usuario", { id_usuario: usuarioId })
    .andWhere(
      new Brackets((qb) => {
        qb.where(":data_inicio <= rel.data_fim", {
          data_inicio: data_inicio,
        }).andWhere(":data_fim >= rel.data_inicio", {
          data_fim: data_fim,
        });
      })
    )
    .getOne();

  if (exist) {
    return {
      status: 409,
      message: "Relacionamento já existe no banco de dados.",
    };
  }

  const newRelUserVei = await relUserVei.create({
    usuarioId: novoRelUserVei.usuarioId,
    veiculoId: novoRelUserVei.veiculoId,
    data_inicio: novoRelUserVei.data_inicio,
    data_fim: novoRelUserVei.data_fim,
  });
  await relUserVei.save(newRelUserVei);
  return newRelUserVei;
};

const updateRelUserVei = async (id: number, relUserVeiAtualizar: IRel) => {
  try {
    const relacionamentos = await relUserVei.findOne({
      where: {
        id_rela: id,
      },
    });
    if (relacionamentos) {
      const alteraRelUserVei = await relUserVei.update(id, {
        usuarioId: relUserVeiAtualizar.usuarioId,
        veiculoId: relUserVeiAtualizar.veiculoId,
        data_inicio: relUserVeiAtualizar.data_inicio,
        data_fim: relUserVeiAtualizar.data_fim,
      });
      return {
        status: 202,
        message: "Relacionamento usuario/veiculo alterado com sucesso",
      };
    } else {
      throw {
        status: 401,
        message: "Relacionamento usuario/veiculo não existe no banco de dados",
      };
    }
  } catch (error) {
    throw error;
  }
};

const removeRelUserVei = async (id_rela: number): Promise<any> => {
  try {
    const relUserVeiExist = await relUserVei.findOneBy({ id_rela });
    if (!relUserVeiExist) {
      return { status: 404, message: "id não existe" };
    }
    await relUserVei.delete(id_rela);
    return {
      status: 200,
      message: "Relacionamento usuario/veiculo removido com sucesso",
    };
  } catch (error) {
    throw error;
  }
};

export {
  getRelUserVei,
  getRelUserVeiById,
  getRelUserVeiRelation,
  getRelUserVeiRelationById,
  postRelUserVei,
  updateRelUserVei,
  removeRelUserVei,
};
