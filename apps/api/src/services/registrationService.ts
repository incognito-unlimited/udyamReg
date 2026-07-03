import { registrationRepository } from '../repositories/registrationRepository';
import { NotFoundError } from '../types/errors';

export class RegistrationService {
  async initiateRegistration() {
    return registrationRepository.create();
  }

  async getRegistration(id: string) {
    const registration = await registrationRepository.findById(id);
    if (!registration) {
      throw new NotFoundError(`Registration with ID ${id} not found`);
    }
    
    // Do not return sensitive fields like otpHash or aadhaarHash
    const safeData = {
      ...registration,
      aadhaarVerification: registration.aadhaarVerification ? {
        id: registration.aadhaarVerification.id,
        aadhaarLastFour: registration.aadhaarVerification.aadhaarLastFour,
        entrepreneurName: registration.aadhaarVerification.entrepreneurName,
        verified: registration.aadhaarVerification.verified,
        createdAt: registration.aadhaarVerification.createdAt,
        updatedAt: registration.aadhaarVerification.updatedAt
      } : null,
      // pan verification is safe
      panVerification: registration.panVerification,
    };
    
    return safeData;
  }
}

export const registrationService = new RegistrationService();
