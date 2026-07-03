import { Request, Response } from 'express';
import { SuccessResponse } from '../types/ApiResponse';

export class HealthController {
  check(req: Request, res: Response) {
    const response: SuccessResponse<{ status: string; timestamp: string }> = {
      success: true,
      data: {
        status: 'UP',
        timestamp: new Date().toISOString()
      }
    };
    res.json(response);
  }
}

export const healthController = new HealthController();
