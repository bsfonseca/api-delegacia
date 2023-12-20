-- CreateTable
CREATE TABLE "criminoso" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "idade" SMALLINT,
    "cidade" VARCHAR(50) NOT NULL,
    "estado" VARCHAR(50) NOT NULL,
    "data_entrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "genero" CHAR(1) NOT NULL,
    "nacionalidade" VARCHAR(50) NOT NULL,

    CONSTRAINT "criminoso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crime" (
    "id" UUID NOT NULL,
    "idCriminoso" UUID NOT NULL,
    "tipo_crime" VARCHAR(50) NOT NULL,
    "data_crime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boletim" SMALLINT NOT NULL,
    "vitima" VARCHAR(50) NOT NULL,
    "localizacao" VARCHAR(50) NOT NULL,

    CONSTRAINT "crime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arma" (
    "id" UUID NOT NULL,
    "idCrime" UUID NOT NULL,
    "modelo_arma" VARCHAR(50) NOT NULL,
    "qtd_balas" SMALLINT NOT NULL,
    "licenciada" CHAR(1) NOT NULL,
    "localizacao" VARCHAR(50) NOT NULL,
    "calibre" VARCHAR(50) NOT NULL,

    CONSTRAINT "arma_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "crime" ADD CONSTRAINT "crime_idCriminoso_fkey" FOREIGN KEY ("idCriminoso") REFERENCES "criminoso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arma" ADD CONSTRAINT "arma_idCrime_fkey" FOREIGN KEY ("idCrime") REFERENCES "crime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
