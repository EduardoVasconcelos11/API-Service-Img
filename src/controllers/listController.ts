import { Request, Response } from 'express';
import { listService } from './uploadController';

function getString(param: any): string | undefined {
  if (Array.isArray(param)) {
    return param[0];
  }
  return param !== undefined ? String(param) : undefined;
}

export const listController = async (req: Request, res: Response) => {
  try {
    const customerCode = getString(req.params.customer_code);
    const measureType = getString(req.query.measure_type);

    if (!customerCode) {
      return res.status(400).json({ error_code: "INVALID_CUSTOMER_CODE", error_description: "Customer code is required" });
    }

    const result = await listService(customerCode, measureType);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      error_code: error.code,
      error_description: error.message
    });
  }
};
