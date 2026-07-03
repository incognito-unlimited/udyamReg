export interface SelectOption {
  label: string;
  value: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  messages?: Record<string, string>;
}

export interface FormAction {
  label: string;
  actionType: 'submit' | 'next' | 'previous' | string;
}

export interface FormField {
  id: string; // The unique identifier for the field (e.g. aadhaarNumber)
  name: string;
  label: string;
  type: 'text' | 'number' | 'radio' | 'checkbox' | 'select' | 'button' | string;
  placeholder?: string;
  options?: SelectOption[];
  validation?: ValidationRule;
  order: number;
}

export interface FormStep {
  id: string;
  title: string;
  fields: FormField[];
  actions: FormAction[];
  order: number;
}

export interface FormSchema {
  id: string;
  title: string;
  steps: FormStep[];
}
