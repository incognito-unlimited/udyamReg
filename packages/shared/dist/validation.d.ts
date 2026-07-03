import { FormSchema, FormField } from './schema';
export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}
export declare function validateRequired(value: any): boolean;
export declare function validateMinLength(value: string, minLength: number): boolean;
export declare function validateMaxLength(value: string, maxLength: number): boolean;
export declare function validatePattern(value: string, pattern: string): boolean;
export declare function validateAadhaar(value: string): boolean;
export declare function normalizePAN(value: string): string;
export declare function validatePAN(value: string): boolean;
export declare function validateField(field: FormField, value: any): string | null;
export declare function validateSchemaIntegrity(schema: FormSchema): ValidationResult;
