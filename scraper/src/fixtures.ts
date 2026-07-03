import { FormStep } from '@udyam/shared';

export const stage2Fixture: FormStep = {
  id: 'pan-verification',
  title: 'PAN Verification',
  order: 2,
  actions: [
    { label: 'Validate PAN', actionType: 'submit' }
  ],
  fields: [
    {
      id: 'organizationType',
      name: 'organizationType',
      label: 'Type of Organisation',
      type: 'select',
      order: 1,
      options: [
        { label: 'Proprietary', value: '1' },
        { label: 'Hindu Undivided Family (HUF)', value: '2' },
        { label: 'Partnership', value: '3' },
        { label: 'Co-Operative', value: '4' },
        { label: 'Private Limited Company', value: '5' },
        { label: 'Public Limited Company', value: '6' },
        { label: 'Self Help Group', value: '7' },
        { label: 'Limited Liability Partnership', value: '8' },
        { label: 'Society', value: '9' },
        { label: 'Trust', value: '10' },
      ],
      validation: {
        required: true,
        messages: {
          required: 'Please select Type of Organisation',
        },
      },
    },
    {
      id: 'panNumber',
      name: 'panNumber',
      label: 'PAN Number',
      type: 'text',
      order: 2,
      placeholder: 'Enter PAN Number',
      validation: {
        required: true,
        minLength: 10,
        maxLength: 10,
        pattern: '^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$',
        messages: {
          required: 'PAN Number is required',
          pattern: 'Invalid PAN format',
        },
      },
    },
    {
      id: 'havePan',
      name: 'havePan',
      label: 'Do you have PAN?',
      type: 'radio',
      order: 3,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
      validation: { required: true }
    },
  ],
};
