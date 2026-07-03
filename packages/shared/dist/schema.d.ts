export interface FormFieldOption {
    label: string;
    value: string;
}
export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'radio' | 'checkbox' | 'select' | 'button' | string;
    required: boolean;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    options?: FormFieldOption[];
    validationMessages?: Record<string, string>;
    order: number;
}
export interface FormSection {
    title: string;
    fields: FormField[];
    order: number;
}
export interface FormStage {
    title: string;
    sections: FormSection[];
    buttonText: string;
    order: number;
}
export type NormalizedFormSchema = FormStage[];
