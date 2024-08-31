import { AppDataSource } from '../data-source';
import { Measure } from '../models/Measure';
import { validateConfirmData } from '../utils/validators';

export const confirmService = async (data: any) => {
  validateConfirmData(data);

  const measureRepo = AppDataSource.getRepository(Measure);
  const measure = await measureRepo.findOneBy({ uuid: data.measure_uuid });

  if (!measure) {
    throw { statusCode: 404, code: "MEASURE_NOT_FOUND", message: "Leitura não encontrada" };
  }

  if (measure.confirmed) {
    throw { statusCode: 409, code: "CONFIRMATION_DUPLICATE", message: "Leitura já confirmada" };
  }

  measure.measureValue = data.confirmed_value;
  measure.confirmed = true;
  await measureRepo.save(measure);
};
