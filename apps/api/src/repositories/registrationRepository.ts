import { prisma } from '../config/prisma';
import { Registration, Prisma } from '@prisma/client';

export type RegistrationWithRelations = Prisma.RegistrationGetPayload<{
  include: {
    aadhaarVerification: true;
    panVerification: true;
  }
}>;

export class RegistrationRepository {
  async create(): Promise<Registration> {
    return prisma.registration.create({
      data: {
        state: 'STARTED',
      },
    });
  }

  async findById(id: string): Promise<RegistrationWithRelations | null> {
    return prisma.registration.findUnique({
      where: { id },
      include: {
        aadhaarVerification: true,
        panVerification: true,
      }
    });
  }
}

export const registrationRepository = new RegistrationRepository();
