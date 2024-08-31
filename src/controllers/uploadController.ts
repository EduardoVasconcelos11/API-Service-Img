import { Request, Response } from 'express';
import { uploadService } from '../services/uploadService';
import { AppDataSource } from '../data-source';
import { Measure } from '../models/Measure';

// Controller para o upload de medidas
export const uploadController = async (req: Request, res: Response) => {
  try {
    const result = await uploadService(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      error_code: error.code,
      error_description: error.message,
    });
  }
};

// Controller para listar medidas com base em customerCode e measureType
export const listController = async (req: Request, res: Response) => {
  const { customerCode } = req.params;
  const { measure_type: measureType } = req.query;

  try {
    const result = await listService(customerCode, measureType as string);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      error_code: error.code,
      error_description: error.message,
    });
  }
};

// Serviço para listar medidas
export const listService = async (customerCode: string, measureType?: string) => {
  const measureRepo = AppDataSource.getRepository(Measure);

  const query = measureRepo.createQueryBuilder('measure')
    .where('measure.customerCode = :customerCode', { customerCode });

  if (measureType) {
    query.andWhere('measure.measureType = :measureType', { measureType });
  }

  const measures = await query.getMany();

  if (measures.length === 0) {
    throw { statusCode: 404, code: "MEASURES_NOT_FOUND", message: "Nenhuma leitura encontrada" };
  }

  return {
    customer_code: customerCode,
    measures: measures.map(measure => ({
      measure_uuid: measure.uuid,
      measure_datetime: measure.measureDatetime,
      measure_type: measure.measureType,
      has_confirmed: measure.confirmed,
      image_url: measure.imageUrl,
    })),
  };
};
