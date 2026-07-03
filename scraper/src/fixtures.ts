import { FormStage } from '@udyam/shared';

export const stage2Fixture: FormStage = {
  title: 'PAN Verification',
  buttonText: 'Validate PAN',
  order: 2,
  sections: [
    {
      title: 'PAN Details',
      order: 1,
      fields: [
        {
          name: 'organizationType',
          label: 'Type of Organisation',
          type: 'select',
          required: true,
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
          validationMessages: {
            required: 'Please select Type of Organisation',
          },
        },
        {
          name: 'panNumber',
          label: 'PAN Number',
          type: 'text',
          required: true,
          order: 2,
          minLength: 10,
          maxLength: 10,
          pattern: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$',
          placeholder: 'Enter PAN Number',
          validationMessages: {
            required: 'PAN Number is required',
            pattern: 'Invalid PAN format',
          },
        },
        {
          name: 'havePan',
          label: 'Do you have PAN?',
          type: 'radio',
          required: true,
          order: 3,
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ],
        },
      ],
    },
  ],
};
