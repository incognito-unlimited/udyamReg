import { 
  validateAadhaar, 
  validatePAN, 
  normalizePAN, 
  validateSchemaIntegrity
} from './validation';
import { FormSchema } from './schema';

describe('Validation Logic', () => {
  describe('PAN Validation', () => {
    it('should validate a valid uppercase PAN', () => {
      expect(validatePAN('ABCDE1234F')).toBe(true);
    });

    it('should validate and normalize a lowercase valid PAN', () => {
      expect(validatePAN('abcde1234f')).toBe(true);
      expect(normalizePAN('abcde1234f')).toBe('ABCDE1234F');
    });

    it('should invalidate a malformed PAN', () => {
      expect(validatePAN('ABCDE123F')).toBe(false);
      expect(validatePAN('12345ABCDE')).toBe(false);
      expect(validatePAN('ABCD12345F')).toBe(false);
      expect(validatePAN('ABCDE12345')).toBe(false);
    });

    it('should invalidate an empty PAN', () => {
      expect(validatePAN('')).toBe(false);
      expect(validatePAN(null as unknown as string)).toBe(false);
      expect(validatePAN(undefined as unknown as string)).toBe(false);
    });
  });

  describe('Aadhaar Validation', () => {
    it('should validate a valid 12-digit Aadhaar format', () => {
      expect(validateAadhaar('123456789012')).toBe(true);
    });

    it('should invalidate Aadhaar with letters', () => {
      expect(validateAadhaar('12345678901A')).toBe(false);
      expect(validateAadhaar('ABCDEFGHIJKL')).toBe(false);
    });

    it('should invalidate short Aadhaar', () => {
      expect(validateAadhaar('12345678901')).toBe(false); // 11 digits
    });

    it('should invalidate long Aadhaar', () => {
      expect(validateAadhaar('1234567890123')).toBe(false); // 13 digits
    });

    it('should invalidate an empty Aadhaar', () => {
      expect(validateAadhaar('')).toBe(false);
      expect(validateAadhaar(null as unknown as string)).toBe(false);
      expect(validateAadhaar(undefined as unknown as string)).toBe(false);
    });
  });

  describe('Schema Integrity', () => {
    it('should validate a correct schema', () => {
      const validSchema: FormSchema = {
        id: 'test-schema',
        title: 'Test',
        steps: [
          {
            id: 'step-1',
            title: 'Step 1',
            order: 1,
            actions: [],
            fields: [
              { id: 'field1', name: 'Field 1', label: 'L1', type: 'text', order: 1 }
            ]
          }
        ]
      };
      const result = validateSchemaIntegrity(validSchema);
      expect(result.isValid).toBe(true);
    });

    it('should invalidate a malformed schema', () => {
      const invalidSchema = {
        id: 'test',
        // missing title
        steps: []
      } as unknown as FormSchema;
      const result = validateSchemaIntegrity(invalidSchema);
      expect(result.isValid).toBe(false);
      expect(result.errors.schema).toBeDefined();
    });

    it('should detect duplicate field IDs', () => {
      const duplicateSchema: FormSchema = {
        id: 'dup-schema',
        title: 'Dup',
        steps: [
          {
            id: 's1', title: 'S1', order: 1, actions: [],
            fields: [
              { id: 'f1', name: 'N1', label: 'L1', type: 'text', order: 1 },
              { id: 'f1', name: 'N2', label: 'L2', type: 'text', order: 2 } // Duplicate ID
            ]
          }
        ]
      };
      const result = validateSchemaIntegrity(duplicateSchema);
      expect(result.isValid).toBe(false);
      expect(result.errors['duplicate_field_f1']).toBeDefined();
    });
  });
});
