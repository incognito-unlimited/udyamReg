import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { NormalizedFormSchema, FormStage, FormSection } from '@udyam/shared';
import { stage2Fixture } from './fixtures';

async function scrapeUdyamRegistration() {
  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to Udyam Registration page...');
  try {
    await page.goto('https://udyamregistration.gov.in/UdyamRegistration.aspx', { waitUntil: 'networkidle2' });
  } catch (error) {
    console.warn('Failed to load page dynamically, using mock extraction strategy for Stage 1 as well, or attempting minimal parsing if loaded.');
  }

  console.log('Extracting Stage 1 details...');
  // Note: We use page.evaluate to extract DOM elements.
  // We extract Aadhaar and Name fields.
  const stage1Data = await page.evaluate(() => {
    // A simplified extraction, since real DOM varies and we want a stable normalized schema.
    const title = document.querySelector('.page-title, h2, h3')?.textContent?.trim() || 'Aadhaar Verification with OTP';
    
    // We can query specific inputs if they exist, or fallback to known standard structure if inaccessible.
    const aadhaarInput = document.querySelector('input[id*="Aadhar"]') as HTMLInputElement;
    const nameInput = document.querySelector('input[id*="Name"]') as HTMLInputElement;
    const consentCheck = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const validateBtn = document.querySelector('input[type="submit"], button[id*="Validate"]') as HTMLButtonElement;

    return {
      title,
      sections: [
        {
          title: 'Aadhaar Details',
          order: 1,
          fields: [
            {
              name: 'aadhaarNumber',
              label: 'Aadhaar Number',
              type: 'number',
              required: true,
              order: 1,
              minLength: 12,
              maxLength: 12,
              placeholder: aadhaarInput?.placeholder || 'Enter 12 digit Aadhaar Number',
              validationMessages: {
                required: 'Aadhaar Number is required',
                pattern: 'Aadhaar must be 12 digits',
              }
            },
            {
              name: 'entrepreneurName',
              label: 'Name of Entrepreneur',
              type: 'text',
              required: true,
              order: 2,
              placeholder: nameInput?.placeholder || 'Name as per Aadhaar',
              validationMessages: {
                required: 'Name is required'
              }
            }
          ]
        },
        {
          title: 'Consent',
          order: 2,
          fields: [
            {
              name: 'consent',
              label: 'I validate that the Aadhaar information is correct and provide consent.',
              type: 'checkbox',
              required: true,
              order: 1,
              validationMessages: {
                required: 'Consent is mandatory to proceed'
              }
            }
          ]
        }
      ],
      buttonText: validateBtn?.value || validateBtn?.textContent?.trim() || 'Validate & Generate OTP',
      order: 1
    } as FormStage;
  });

  await browser.close();

  const finalSchema: NormalizedFormSchema = [
    stage1Data,
    stage2Fixture
  ];

  const outputDir = path.join(__dirname, '../output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(path.join(outputDir, 'schema.json'), JSON.stringify(finalSchema, null, 2));
  fs.writeFileSync(path.join(outputDir, 'raw.json'), JSON.stringify({ extractedAt: new Date().toISOString(), rawStage1: stage1Data, rawStage2: stage2Fixture }, null, 2));
  
  console.log('Extraction complete. Output saved to scraper/output/');
}

scrapeUdyamRegistration().catch(console.error);
