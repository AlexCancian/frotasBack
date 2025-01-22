import connectionFrotas from "../dataBase/data";
import Viagem from "../entity/Viagem";
import IViagem from "../interfaces/IViagem";

const viagem = connectionFrotas.getRepository(Viagem);

const getViagem = async (): Promise<IViagem[]> => {
  const data = await viagem.find();
  return data;
};

const getViagemUserId = async (id: number): Promise<any> => {
  const viagens = await viagem.find({
    where: { id_usuario: id },
  });

  return viagens;
};

const getViagemRelation = async (): Promise<IViagem[]> => {
  const data = await viagem.find({ relations: ["agendaId"] });
  return data;
};

const getViagemById = async (id_viagem: number): Promise<any> => {
  const viagemById = await viagem.findOneBy({ id_viagem });
  if (!viagemById) {
    return { status: 404, message: "id não existe" };
  }
  return viagemById;
};

const postViagem = async (novaViagem: IViagem): Promise<any> => {
  const newViagem = await viagem.create({
    km_ini: novaViagem.km_ini,
    data_hr_ini: novaViagem.data_hr_ini,
    local_saida: novaViagem.local_saida,
    observacao_ini: novaViagem.observacao_ini,
    km_final: novaViagem.km_final,
    data_hr_chegada: novaViagem.data_hr_chegada,
    lavagem: novaViagem.lavagem,
    observacao_final: novaViagem.observacao_final,
    agendaId: novaViagem.agendaId,
    veiculo_nome: novaViagem.veiculo_nome,
    placa: novaViagem.placa,
    id_usuario: novaViagem.id_usuario,
  });
  await viagem.save(newViagem);
  return newViagem;
};

const updateViagem = async (id: number, viagemAtualizar: IViagem) => {
  try {
    const altViagem = await viagem.update(id, {
      km_ini: viagemAtualizar.km_ini,
      data_hr_ini: viagemAtualizar.data_hr_ini,
      local_saida: viagemAtualizar.local_saida,
      observacao_ini: viagemAtualizar.observacao_ini,
      km_final: viagemAtualizar.km_final,
      data_hr_chegada: viagemAtualizar.data_hr_chegada,
      lavagem: viagemAtualizar.lavagem,
      observacao_final: viagemAtualizar.observacao_final,
      agendaId: viagemAtualizar.agendaId,
      veiculo_nome: viagemAtualizar.veiculo_nome,
      placa: viagemAtualizar.placa,
      id_usuario: viagemAtualizar.id_usuario,
    });
    return { status: 202, message: "Viagem alterada com sucesso" };
  } catch (error) {
    throw error;
  }
};

const removerViagem = async (id_viagem: number): Promise<any> => {
  try {
    const viagemDelete = await viagem.findOneBy({ id_viagem });
    if (!viagemDelete) {
      return { status: 404, message: "id não existe" };
    }
    await viagem.delete(id_viagem);
    return { status: 200, message: "Viagem removida com sucesso" };
  } catch (error) {
    throw error;
  }
};

export {
  getViagem,
  getViagemById,
  getViagemRelation,
  postViagem,
  updateViagem,
  removerViagem,
  getViagemUserId,
};
