import { Request, Response, NextFunction } from 'express';
import { registrationService } from '../services/registrationService';
import { SuccessResponse } from '../types/ApiResponse';

export class RegistrationController {
  async initiate(req: Request, res: Response, next: NextFunction) {
    try {
      const registration = await registrationService.initiateRegistration();
      const response: SuccessResponse<typeof registration> = {
        success: true,
        data: registration
      };
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getRegistration(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const registration = await registrationService.getRegistration(id);
      const response: SuccessResponse<typeof registration> = {
        success: true,
        data: registration
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const registrationController = new RegistrationController();
