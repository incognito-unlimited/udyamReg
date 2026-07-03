import { Request, Response } from 'express';
import { schemaService } from '../services/schemaService';
import { SuccessResponse } from '../types/ApiResponse';
import { FormSchema } from '@udyam/shared';

export class SchemaController {
  async getFormSchema(req: Request, res: Response) {
    const schema = await schemaService.getSchema();
    const response: SuccessResponse<FormSchema> = {
      success: true,
      data: schema
    };
    res.json(response);
  }
}

export const schemaController = new SchemaController();
