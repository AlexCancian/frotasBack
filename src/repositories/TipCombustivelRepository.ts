import connectionFrotas from "../dataBase/data";
import Combustivel from "../entity/Combustivel";
import ITipComb from "../interfaces/ITipoCombustivel";


const combustivel = connectionFrotas.getRepository(Combustivel);

const getCombustivel = async (): Promise<ITipComb[]> => {
  const data = await combustivel.find();
  return data;
};

const getCombustivelById = async (id_tipo_combus: number): Promise<any> => {
  const tipCombus = await combustivel.findOneBy({ id_tipo_combus });
  if (!tipCombus) {
    return { status: 404, message: "id não existe" };
  }
  return tipCombus;
};

const postCombustivel = async (novoTipCombus: ITipComb): Promise<any> => {
  const exist = await combustivel.findOne({
    where: { nome_combus: novoTipCombus.nome_combus },
  });
  if (exist !== null) {
    return {
      status: 409,
      message: `${novoTipCombus.nome_combus} já existe no banco de dados`,
    };
  }

  const newTipCombus = await combustivel.create({
    nome_combus: novoTipCombus.nome_combus,
    ativo: novoTipCombus.ativo,
  });
  await combustivel.save(newTipCombus);
  return newTipCombus;
};

const updateTipComb = async (id: number, tipCombusAtualizar: ITipComb) => {
  try {
    const combustiveis = await combustivel.findOne({
      where: {
        id_tipo_combus: id,
      },
    });
    if (combustiveis) {
      const alteraTipCombus = await combustivel.update(id, {
        nome_combus: tipCombusAtualizar.nome_combus,
        ativo: tipCombusAtualizar.ativo,
      });
      return { status: 202, message: "Tipo Combustivel alterado com sucesso" };
    } else {
      throw { status: 401, message: "Tipo Combustivel não existe no banco de dados" };
    }
  } catch (error) {
    throw error;
  }
};

const removeTipCombus = async (id_tipo_combus: number): Promise<any> => {
  try {
    const combustivelExist = await combustivel.findOneBy({ id_tipo_combus });
    if (!combustivelExist) {
      return { status: 404, message: "id não existe" };
    }
    await combustivel.delete(id_tipo_combus);
    return { status: 200, message: "Tipo combustivel removido com sucesso" };
  } catch (error) {
    throw error;
  }
};

const desativaTipCombus = async (id: number, status: boolean) => {
  try {
    const tipCombus = await combustivel.findOne({
      where: {
        id_tipo_combus: id,
      },
    });
    if (tipCombus) {
      const desativarTipCombus = await combustivel.update(id, { ativo: status });
      return "Tipo combustivel atualizado com sucesso";
    } else {
      throw { status: 401, message: "Tipo combustivel não existe no banco de dados" };
    }
  } catch (error) {
    throw error;
  }
};

export {
getCombustivel,
getCombustivelById,
postCombustivel,
updateTipComb,
desativaTipCombus,
removeTipCombus
};
