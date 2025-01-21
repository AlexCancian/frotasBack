import connectionFrotas from "../dataBase/data";
import Abastece from "../entity/Abastecer";
import IAbastecer from "../interfaces/IAbastecer";

const abastece = connectionFrotas.getRepository(Abastece);

const getAbastece = async (): Promise<IAbastecer[]> => {
  const data = await abastece.find();
  return data;
};
const getAbasteceRelation = async (): Promise<IAbastecer[]> => {
  const data = await abastece.find({ relations: ["veiculoId", "usuarioId"] });
  return data;
};

const getAbasteceById = async (id_abastecimento: number): Promise<any> => {
  const abastecer = await abastece.findOneBy({ id_abastecimento });
  if (!abastecer) {
    return { status: 404, message: "id não existe" };
  }
  return abastecer;
};

const postAbastece = async (novoAbastecimento: IAbastecer): Promise<any> => {
  const newAbastecimento = await abastece.create({
    km: novoAbastecimento.km,
    data_hr_abas: novoAbastecimento.data_hr_abas,
    litro: novoAbastecimento.litro,
    preco_litro: novoAbastecimento.preco_litro,
    vlr_abast_nota: novoAbastecimento.vlr_abast_nota,
    veiculoId: novoAbastecimento.veiculoId,
    usuarioId: novoAbastecimento.usuarioId,
  });
  await abastece.save(newAbastecimento);
  return newAbastecimento;
};

const updateAbastecimento = async (
  id: number,
  abastecimentoAtualizar: IAbastecer
) => {
  try {
    const abastecer = await abastece.findOne({
      where: {
        id_abastecimento: id,
      },
    });
    if (abastecer) {
      const alteraAbastecimento = await abastece.update(id, {
        km: abastecimentoAtualizar.km,
        data_hr_abas: abastecimentoAtualizar.data_hr_abas,
        litro: abastecimentoAtualizar.litro,
        preco_litro: abastecimentoAtualizar.preco_litro,
        vlr_abast_nota: abastecimentoAtualizar.vlr_abast_nota,
        veiculoId: abastecimentoAtualizar.veiculoId,
        usuarioId: abastecimentoAtualizar.usuarioId,
      });
      return { status: 202, message: "Abastecimento alterado com sucesso" };
    } else {
      throw {
        status: 401,
        message: "Abastecimento não existe no banco de dados",
      };
    }
  } catch (error) {
    throw error;
  }
};

const removeAbastecimento = async (id_abastecimento: number): Promise<any> => {
  try {
    const abastecimentoExist = await abastece.findOneBy({ id_abastecimento });
    if (!abastecimentoExist) {
      return { status: 404, message: "id não existe" };
    }
    await abastece.delete(id_abastecimento);
    return { status: 200, message: "Abastecimento removido com sucesso" };
  } catch (error) {
    throw error;
  }
};

export {
  getAbastece,
  getAbasteceById,
  postAbastece,
  updateAbastecimento,
  removeAbastecimento,
  getAbasteceRelation,
};
