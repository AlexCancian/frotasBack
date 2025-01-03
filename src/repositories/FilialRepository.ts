import connectionFrotas from "../dataBase/data";
import Filial from "../entity/Filial";
import IFilial from "../interfaces/IFilial";

const filial = connectionFrotas.getRepository(Filial);

const getFilial = async (): Promise<IFilial[]> => {
  const data = await filial.find();
  return data;
};

const getFilialById = async (id_filial: number): Promise<any> => {
  const filiais = await filial.findOneBy({ id_filial });
  if (!filiais) {
    return { status: 404, message: "id não existe" };
  }
  return filiais;
};

const postFilial = async (novaFilial: IFilial): Promise<any> => {
  const exist = await filial.findOne({
    where: { cnpj: novaFilial.cnpj },
  });
  if (exist !== null) {
    return {
      status: 409,
      message: `${novaFilial.nome} já existe no banco de dados`,
    };
  }

  const newFilial = await filial.create({
    nome: novaFilial.nome,
    cnpj: novaFilial.cnpj,
    ativo: novaFilial.ativo,
  });
  await filial.save(newFilial);
  return newFilial;
};

const updateFilial = async (id: number, filialAtualizar: IFilial) => {
  try {
    const filiais = await filial.findOne({
      where: {
        id_filial: id,
      },
    });
    if (filiais) {
      const alteraFilial = await filial.update(id, {
        nome: filialAtualizar.nome,
        cnpj: filialAtualizar.cnpj,
        ativo: filialAtualizar.ativo,
      });
      return { status: 202, message: "Filial alterada com sucesso" };
    } else {
      throw { status: 401, message: "Filial não existe no banco de dados" };
    }
  } catch (error) {
    throw error;
  }
};

const removeFilial = async (id_filial: number): Promise<any> => {
  try {
    const filialExist = await filial.findOneBy({ id_filial });
    if (!filialExist) {
      return { status: 404, message: "id não existe" };
    }
    await filial.delete(id_filial);
    return { status: 200, message: "Filial removida com sucesso" };
  } catch (error) {
    throw error;
  }
};

const desativaFilial = async (id: number, status: boolean) => {
  try {
    const filiais = await filial.findOne({
      where: {
        id_filial: id,
      },
    });
    if (filiais) {
      const desativarFilial = await filial.update(id, { ativo: status });
      return "Filial atualizado com sucesso";
    } else {
      throw { status: 401, message: "Filial não existe no banco de dados" };
    }
  } catch (error) {
    throw error;
  }
};

export {
  getFilial,
  getFilialById,
  postFilial,
  updateFilial,
  removeFilial,
  desativaFilial,
};
