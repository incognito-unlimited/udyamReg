import { NormalizedFormSchema } from './schema';

describe('NormalizedFormSchema', () => {
  it('should allow valid form schema structures', () => {
    const mockSchema: NormalizedFormSchema = [
      {
        title: 'Stage 1',
        buttonText: 'Next',
        order: 1,
        sections: [
          {
            title: 'Personal Details',
            order: 1,
            fields: [
              {
                name: 'firstName',
                label: 'First Name',
                type: 'text',
                required: true,
                order: 1,
                minLength: 2,
                maxLength: 50,
                validationMessages: {
                  required: 'First Name is required',
                },
              },
            ],
          },
        ],
      },
    ];

    expect(mockSchema).toBeDefined();
    expect(mockSchema[0].sections[0].fields[0].name).toBe('firstName');
  });
});
