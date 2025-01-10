import connectionFrotas from "../dataBase/data";
import AgendaViagem from "../entity/AgendaViagem";
import IAgenda from "../interfaces/IAgenda";
import isOverlappingAgendaFrotas from "../utils/confereAgendaFrotas";
import generateDateTimeISO from "../utils/gerarHoraAtual";

const agenda = connectionFrotas.getRepository(AgendaViagem);

const getAgenda = async (): Promise<IAgenda[]> => {
  const data = await agenda.find();
  return data;
};

const getAgendaRelationUser = async (id: number): Promise<any> => {
  const data = await agenda.find({
    where: {
      usuarioId: {
        id_usuario: id,
      },
    },
    relations: { veiculoId: true },
    order: {
      data_ini_agenda: {},
    },
  });
  return data;
};

const getAgendaRelation = async (): Promise<IAgenda[]> => {
  const data = await agenda.find({ relations: ["veiculoId", "usuarioId"] });
  return data;
};

const getAgendaById = async (id_agenda: number): Promise<any> => {
  const agendas = await agenda.findOneBy({ id_agenda });
  if (!agendas) {
    return { status: 404, message: "id não existe" };
  }
  return agendas;
};

const postAgenda = async (novaAgenda: IAgenda): Promise<any> => {
  const { data_ini_agenda, data_final_agenda, veiculoId } = novaAgenda;
  const isOverlap = await isOverlappingAgendaFrotas(
    agenda,
    data_ini_agenda,
    data_final_agenda,
    veiculoId.placa,
    undefined
  );
  if (isOverlap) {
    return {
      status: 409,
      message: "O intervalo de tempo se sobrepõe a uma programação existente.",
    };
  }
  const newAgenda = await agenda.create({
    data_agendamento: generateDateTimeISO(),
    data_ini_agenda: novaAgenda.data_ini_agenda,
    data_final_agenda: novaAgenda.data_final_agenda,
    destino: novaAgenda.destino,
    n_ocupantes: novaAgenda.n_ocupantes,
    usuarioId: novaAgenda.usuarioId,
    veiculoId: novaAgenda.veiculoId,
  });
  await agenda.save(newAgenda);
  return newAgenda;
};

const updateAgenda = async (id: number, agendaAtualizar: IAgenda) => {
  try {
    const { data_ini_agenda, data_final_agenda, veiculoId } = agendaAtualizar;
    const isOverlap = await isOverlappingAgendaFrotas(
      agenda,
      data_ini_agenda,
      data_final_agenda,
      veiculoId.placa,
      id
    );
    if (isOverlap) {
      return {
        status: 409,
        message:
          "O intervalo de tempo se sobrepõe a uma programação existente.",
      };
    }

    const altAgenda = await agenda.update(id, {
      data_agendamento: generateDateTimeISO(),
      data_ini_agenda: agendaAtualizar.data_ini_agenda,
      data_final_agenda: agendaAtualizar.data_final_agenda,
      destino: agendaAtualizar.destino,
      n_ocupantes: agendaAtualizar.n_ocupantes,
      usuarioId: agendaAtualizar.usuarioId,
      veiculoId: agendaAtualizar.veiculoId,
    });
    return { status: 202, message: "Agenda alterada com sucesso" };
  } catch (error) {
    throw error;
  }
};

const removerAgenda = async (id_agenda: number): Promise<any> => {
  try {
    const agendas = await agenda.findOneBy({ id_agenda });
    if (!agendas) {
      return { status: 404, message: "id não existe" };
    }
    await agenda.delete(id_agenda);
    return { status: 200, message: "Agenda removida com sucesso" };
  } catch (error) {
    throw error;
  }
};

export {
  getAgenda,
  getAgendaRelation,
  getAgendaRelationUser,
  getAgendaById,
  postAgenda,
  updateAgenda,
  removerAgenda,
};
