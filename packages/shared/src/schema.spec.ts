import { FormSchema } from './schema';

describe('FormSchema', () => {
  it('should allow valid form schema structures', () => {
    const mockSchema: FormSchema = {
      id: 'udyam-registration',
      title: 'Udyam Registration',
      steps: [
        {
          id: 'stage-1',
          title: 'Stage 1',
          order: 1,
          actions: [
            { label: 'Next', actionType: 'next' }
          ],
          fields: [
            {
              id: 'firstName',
              name: 'firstName',
              label: 'First Name',
              type: 'text',
              order: 1,
              validation: {
                required: true,
                minLength: 2,
                maxLength: 50,
                messages: {
                  required: 'First Name is required',
                },
              },
            },
          ],
        },
      ],
    };

    expect(mockSchema).toBeDefined();
    expect(mockSchema.steps[0].fields[0].name).toBe('firstName');
  });
});
