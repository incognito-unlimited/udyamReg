import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/prisma';

// Mock prisma for isolated integration tests without a real DB
jest.mock('../src/config/prisma', () => ({
  prisma: {
    registration: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe('API Foundation Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/v1/health', () => {
    it('should return 200 UP status', async () => {
      const res = await request(app).get('/api/v1/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('UP');
    });
  });

  describe('GET /api/v1/form-schema', () => {
    it('should return schema structure', async () => {
      const res = await request(app).get('/api/v1/form-schema');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBeDefined();
    });
  });

  describe('POST /api/v1/registrations', () => {
    it('should create a new registration', async () => {
      const mockRegistration = {
        id: '123',
        state: 'STARTED',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      (prisma.registration.create as jest.Mock).mockResolvedValue(mockRegistration);
      
      const res = await request(app).post('/api/v1/registrations');
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe('123');
      expect(res.body.data.state).toBe('STARTED');
    });
  });

  describe('GET /api/v1/registrations/:id', () => {
    it('should return a 404 for non-existent registration', async () => {
      (prisma.registration.findUnique as jest.Mock).mockResolvedValue(null);
      
      const res = await request(app).get('/api/v1/registrations/999');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });

    it('should return registration without sensitive fields', async () => {
      const mockRegistration = {
        id: '123',
        state: 'STARTED',
        aadhaarVerification: {
          id: 'v123',
          aadhaarHash: 'SUPER_SECRET', // Should not be in output
          otpHash: 'SECRET_OTP', // Should not be in output
          aadhaarLastFour: '9012',
          entrepreneurName: 'John',
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      (prisma.registration.findUnique as jest.Mock).mockResolvedValue(mockRegistration);
      
      const res = await request(app).get('/api/v1/registrations/123');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe('123');
      expect(res.body.data.aadhaarVerification.aadhaarLastFour).toBe('9012');
      expect(res.body.data.aadhaarVerification.aadhaarHash).toBeUndefined();
      expect(res.body.data.aadhaarVerification.otpHash).toBeUndefined();
    });
  });

  describe('Error Handling Middleware', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app).get('/api/v1/unknown');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });

    it('should enforce JSON body limits (413)', async () => {
      // Create a payload larger than 100kb
      const largeString = 'a'.repeat(105 * 1024);
      const res = await request(app)
        .post('/api/v1/registrations')
        .send({ data: largeString });
        
      expect(res.status).toBe(413);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('PAYLOAD_TOO_LARGE');
    });
  });
});
