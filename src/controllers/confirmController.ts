import { Request, Response } from 'express';
import { confirmService } from '../services/confirmService';

export const confirmController = async (req: Request, res: Response) => {
  try {
    await confirmService(req.body);
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      error_code: error.code,
      error_description: error.message
    });
  }
};
