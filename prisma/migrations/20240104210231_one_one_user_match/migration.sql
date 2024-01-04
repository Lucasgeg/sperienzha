-- CreateTable
CREATE TABLE "log" (
    "id_log" SERIAL NOT NULL,
    "id_user" INTEGER,
    "action" VARCHAR,
    "date" DATE,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id_log")
);

-- CreateTable
CREATE TABLE "match" (
    "id_match" SERIAL NOT NULL,
    "id_user" INTEGER,
    "id_user_autre" INTEGER,

    CONSTRAINT "match_pkey" PRIMARY KEY ("id_match")
);

-- CreateTable
CREATE TABLE "msg" (
    "id_msg" SERIAL NOT NULL,
    "id_user" INTEGER,
    "message" VARCHAR(500),
    "date_envoie" DATE,
    "id_user_r" INTEGER,

    CONSTRAINT "msg_pkey" PRIMARY KEY ("id_msg")
);

-- CreateTable
CREATE TABLE "sanction" (
    "id_sanction" SERIAL NOT NULL,
    "id_user" INTEGER,
    "raison" VARCHAR(500),
    "jour_sanction" DATE,
    "jour_fin_sanction" DATE,

    CONSTRAINT "sanction_pkey" PRIMARY KEY ("id_sanction")
);

-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "nom" VARCHAR(30),
    "prenom" VARCHAR(30),
    "age" INTEGER,
    "photo" VARCHAR,
    "description" VARCHAR(1500),
    "ecole" VARCHAR(30),
    "niveau_scolaire" VARCHAR(30),
    "genre" VARCHAR,
    "personne_lie" INTEGER,
    "email" VARCHAR NOT NULL,
    "clerk_id" VARCHAR NOT NULL,
    "first_connection" BOOLEAN NOT NULL DEFAULT true,
    "connection_autorise" BOOLEAN DEFAULT true,
    "date_inscription" DATE,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "user_match_critere" (
    "id_match_critere" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "user_match_critere_pkey" PRIMARY KEY ("id_match_critere")
);

-- CreateTable
CREATE TABLE "critere" (
    "id_critere" SERIAL NOT NULL,
    "type" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "critere_pkey" PRIMARY KEY ("id_critere")
);

-- CreateTable
CREATE TABLE "critere_match" (
    "id_critere_match" SERIAL NOT NULL,
    "id_match_critere" INTEGER,
    "id_critere" INTEGER,

    CONSTRAINT "critere_match_pkey" PRIMARY KEY ("id_critere_match")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_clerk_id_key" ON "user"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_match_critere_id_user_key" ON "user_match_critere"("id_user");

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "msg" ADD CONSTRAINT "msg_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sanction" ADD CONSTRAINT "sanction_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_match_critere" ADD CONSTRAINT "user_match_critere_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "critere_match" ADD CONSTRAINT "critere_match_id_critere_fkey" FOREIGN KEY ("id_critere") REFERENCES "critere"("id_critere") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "critere_match" ADD CONSTRAINT "critere_match_id_match_critere_fkey" FOREIGN KEY ("id_match_critere") REFERENCES "user_match_critere"("id_match_critere") ON DELETE NO ACTION ON UPDATE NO ACTION;
