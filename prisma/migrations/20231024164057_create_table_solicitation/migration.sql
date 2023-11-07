-- CreateTable
CREATE TABLE "solicitations" (
    "id" SERIAL NOT NULL,
    "request_number" TEXT NOT NULL,
    "bank_proposal" TEXT NOT NULL,
    "document_name" TEXT NOT NULL,
    "sub_document" TEXT,
    "state_id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "property_registration_office" TEXT,
    "register_number" TEXT,
    "applicant_name_one" TEXT,
    "applicant_name_two" TEXT,
    "applicant_cpf_on" TEXT,
    "applicant_cpf_two" TEXT,
    "birth_date" TEXT,
    "wedding_date" TEXT,
    "death_date" TEXT,
    "municipal_registration_property" TEXT,
    "request_status" TEXT NOT NULL,
    "request_date" TEXT NOT NULL,
    "request_hour" TEXT NOT NULL,
    "requestor_name" TEXT NOT NULL,
    "requestor_register" TEXT NOT NULL,
    "bank_op" TEXT NOT NULL,
    "forecast_date" TEXT NOT NULL,
    "forecast_weeK_day" TEXT NOT NULL,
    "operator_name" TEXT,
    "operator_register" TEXT,
    "operator_op" TEXT,
    "image" TEXT,
    "image_name" TEXT,
    "image_type" TEXT,
    "image_size" INTEGER,
    "start_process_date" TEXT,
    "start_process_hour" TEXT,
    "finish_process_date" TEXT,
    "finish_process_hour" TEXT,

    CONSTRAINT "solicitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inconsistencies" (
    "id" SERIAL NOT NULL,
    "operator_name" TEXT NOT NULL,
    "operator_register" TEXT NOT NULL,
    "requestor_name" TEXT NOT NULL,
    "requestor_register" TEXT NOT NULL,
    "bank_op" TEXT NOT NULL,
    "information_date" TEXT NOT NULL,
    "correction_date" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "solicitationId" INTEGER NOT NULL,

    CONSTRAINT "inconsistencies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "solicitations_request_number_key" ON "solicitations"("request_number");

-- AddForeignKey
ALTER TABLE "inconsistencies" ADD CONSTRAINT "inconsistencies_solicitationId_fkey" FOREIGN KEY ("solicitationId") REFERENCES "solicitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
