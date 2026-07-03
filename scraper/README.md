# Udyam Form Scraper

This package contains scripts to extract the publicly observable structure of the Udyam registration form and convert it into a normalized JSON schema for frontend rendering and backend validation.

## How to Run

1. Make sure dependencies are installed:
   ```bash
   npm install
   ```
2. Run the extraction script:
   ```bash
   npm run dev
   ```

## Limitations and Security Boundaries

In accordance with the project integrity contract:
- **Dynamic Progression Limitation**: We do not automate actual OTP submissions or bypass CAPTCHAs. This means that advancing to Stage 2 (PAN Validation) dynamically is restricted.
- **Mock Strategy for Stage 2**: Because Stage 2 requires an authenticated OTP session, the UI structure for Stage 2 is provided via a static fallback fixture (`fixtures.ts`). This ensures we can generate a complete Normalized Schema without violating security protocols or fabricating dynamic results.
- No personal Aadhaar or PAN data is used.

## Outputs
- `output/schema.json`: The fully normalized JSON schema representing the extracted fields, validation rules, and sections.
- `output/raw.json`: The raw extraction payload and metadata.
