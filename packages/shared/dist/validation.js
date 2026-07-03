"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequired = validateRequired;
exports.validateMinLength = validateMinLength;
exports.validateMaxLength = validateMaxLength;
exports.validatePattern = validatePattern;
exports.validateAadhaar = validateAadhaar;
exports.normalizePAN = normalizePAN;
exports.validatePAN = validatePAN;
exports.validateField = validateField;
exports.validateSchemaIntegrity = validateSchemaIntegrity;
function validateRequired(value) {
    if (value === null || value === undefined)
        return false;
    if (typeof value === 'string' && value.trim() === '')
        return false;
    return true;
}
function validateMinLength(value, minLength) {
    return value.length >= minLength;
}
function validateMaxLength(value, maxLength) {
    return value.length <= maxLength;
}
function validatePattern(value, pattern) {
    const regex = new RegExp(pattern);
    return regex.test(value);
}
function validateAadhaar(value) {
    if (!value)
        return false;
    return /^\d{12}$/.test(value);
}
function normalizePAN(value) {
    if (!value)
        return '';
    return value.trim().toUpperCase();
}
function validatePAN(value) {
    if (!value)
        return false;
    const normalized = normalizePAN(value);
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(normalized);
}
function validateField(field, value) {
    if (!field.validation)
        return null;
    const { required, minLength, maxLength, pattern, messages } = field.validation;
    const strValue = value != null ? String(value) : '';
    if (required && !validateRequired(value)) {
        return messages?.required || 'This field is required';
    }
    if (strValue) {
        if (minLength !== undefined && !validateMinLength(strValue, minLength)) {
            return messages?.minLength || `Minimum length is ${minLength}`;
        }
        if (maxLength !== undefined && !validateMaxLength(strValue, maxLength)) {
            return messages?.maxLength || `Maximum length is ${maxLength}`;
        }
        // Special formats
        if (field.id === 'aadhaarNumber') {
            if (!validateAadhaar(strValue)) {
                return messages?.pattern || 'Invalid Aadhaar format';
            }
        }
        else if (field.id === 'panNumber') {
            if (!validatePAN(strValue)) {
                return messages?.pattern || 'Invalid PAN format';
            }
        }
        else if (pattern && !validatePattern(strValue, pattern)) {
            return messages?.pattern || 'Invalid format';
        }
    }
    return null;
}
function validateSchemaIntegrity(schema) {
    const errors = {};
    const fieldIds = new Set();
    if (!schema.id || !schema.title) {
        errors.schema = 'Schema is missing id or title';
    }
    if (!schema.steps || !Array.isArray(schema.steps)) {
        errors.schema = 'Schema is missing valid steps array';
        return { isValid: Object.keys(errors).length === 0, errors };
    }
    schema.steps.forEach((step, stepIndex) => {
        if (!step.id || !step.title) {
            errors[`step_${stepIndex}`] = 'Step is missing id or title';
        }
        if (step.fields && Array.isArray(step.fields)) {
            step.fields.forEach((field, fieldIndex) => {
                if (!field.id) {
                    errors[`step_${stepIndex}_field_${fieldIndex}`] = 'Field is missing id';
                }
                else {
                    if (fieldIds.has(field.id)) {
                        errors[`duplicate_field_${field.id}`] = `Duplicate field ID detected: ${field.id}`;
                    }
                    fieldIds.add(field.id);
                }
            });
        }
    });
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
