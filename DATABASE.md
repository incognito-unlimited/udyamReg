# Database Environment Configuration

This project uses PostgreSQL for its persistent data storage, managed via Prisma ORM.

## Setup Instructions

1. **Install PostgreSQL**: Ensure PostgreSQL is installed locally or via Docker.
   ```bash
   docker run --name udyam-postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
   ```
2. **Environment Configuration**: Set the `DATABASE_URL` in `apps/api/.env`.
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/udyam?schema=public"
   ```
3. **Run Migrations**: Apply the existing migrations to your database.
   ```bash
   npx prisma migrate dev
   ```

## Model Architecture

The data model follows Domain-Driven Design concepts with `Registration` as the aggregate root.

- **Registration**: The parent entity managing the `RegistrationState` (e.g., `STARTED`, `AADHAAR_PENDING`, `AADHAAR_VERIFIED`, etc.).
- **AadhaarVerification**: An optional, one-to-one child of `Registration`. We adhere to PII constraints by storing the hash of the Aadhaar number and only retaining the last four digits for UI masking purposes. OTPs are also securely hashed (`otpHash`), avoiding plaintext persistence.
- **PanVerification**: An optional, one-to-one child of `Registration`. Stores normalized PAN strings and verification states.

## Security Constraints Implemented
- **No OTP Plaintext**: Only `otpHash` is preserved in the database.
- **No Raw Aadhaar**: The full 12-digit Aadhaar number is never stored in plaintext. `aadhaarHash` is utilized for integrity and `aadhaarLastFour` for display.
- **Cascading Deletes**: Destroying a `Registration` will instantly purge any attached verification metadata to reduce leftover data footprints.
