-- CreateEnum
CREATE TYPE "RegistrationState" AS ENUM ('STARTED', 'AADHAAR_PENDING', 'AADHAAR_VERIFIED', 'PAN_PENDING', 'COMPLETED');

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "state" "RegistrationState" NOT NULL DEFAULT 'STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AadhaarVerification" (
    "id" TEXT NOT NULL,
    "aadhaarHash" TEXT NOT NULL,
    "aadhaarLastFour" VARCHAR(4) NOT NULL,
    "entrepreneurName" TEXT NOT NULL,
    "otpHash" TEXT,
    "otpExpiresAt" TIMESTAMP(3),
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "registrationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AadhaarVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PanVerification" (
    "id" TEXT NOT NULL,
    "organizationType" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,
    "hasPan" BOOLEAN NOT NULL DEFAULT true,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "registrationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PanVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AadhaarVerification_registrationId_key" ON "AadhaarVerification"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "PanVerification_registrationId_key" ON "PanVerification"("registrationId");

-- AddForeignKey
ALTER TABLE "AadhaarVerification" ADD CONSTRAINT "AadhaarVerification_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanVerification" ADD CONSTRAINT "PanVerification_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
