import { Repository } from 'typeorm';
import { parseISO, isBefore, isAfter } from 'date-fns';
import AgendaViagem from '../entity/AgendaViagem';

async function isOverlappingAgendaFrotas(
  agenda: Repository<AgendaViagem>,
  novaDataIniAgenda: Date,
  novaDataFinalAgenda: Date,
  placa: string,
  idAgenda?: number
): Promise<boolean> {

  const agendas = await agenda.find({
    where: { veiculoId:{ placa }},
    relations: ["veiculoId"],
  });

  for (const agenda of agendas) {
    if (idAgenda && agenda.id_agenda === idAgenda) {
      // Ignora o registro que está sendo atualizado
      continue;
    }

    const existingStart = new Date(agenda.data_ini_agenda);
    const existingEnd = new Date(agenda.data_final_agenda);

    // Verifica se há sobreposição de horários
    if (
      (isBefore(novaDataIniAgenda, existingEnd) && 
       isAfter(novaDataFinalAgenda, existingStart))
    ) {
      return true;
    }
  }

  return false;
}

export default isOverlappingAgendaFrotas;
