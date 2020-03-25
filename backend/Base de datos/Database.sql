CREATE TABLE "Ensayo" (
    "idEnsayo"  serial NOT NULL,
    "nroEnsayo" INT NOT NULL,
    "fecha" DATE NOT NULL,
    "operador" VARCHAR(50) NOT NULL,
    "observaciones" TEXT,
    "carga" REAL NOT NULL,
    "radioTrayectoria" REAL NOT NULL,
    "diametroBola" REAL NOT NULL,
    "distanciaTotal" REAL NOT NULL,
    "tiempoTotal" INT NOT NULL,
    "idDato" serial NOT NULL,
    "materialBola" VARCHAR(60) NOT NULL,
    "idEnsayo" INT NOT NULL,
    PRIMARY KEY ("idEnsayo")
);


CREATE TABLE "Parametros" (
    "idParametro" serial NOT NULL,
    "fuerzaRozamiento" REAL NOT NULL,
    "coeficienteRozamiento" REAL NOT NULL,
    "vueltas" INT,
    "tiempoActual" REAL NOT NULL,
    "idEnsayo" INT NOT NULL,
    PRIMARY KEY ("idParametro","idEnsayo"),
    FOREIGN KEY ("idEnsayo") REFERENCES "Ensayo"
);

CREATE TABLE "Ambiente" (
    "idAmbiente" serial NOT NULL,
    "temperatura" REAL NOT NULL,
    "humedad" REAL NOT NULL,
    "horaActual" TIME NOT NULL,
    "idEnsayo" INT NOT NULL,
    PRIMARY KEY ("idAmbiente","idEnsayo"),
    FOREIGN KEY ("idEnsayo") REFERENCES "Ensayo"
);

CREATE TABLE "Probeta" (
    "idProbeta" serial NOT NULL,
    "codigoProbeta" VARCHAR(20) NOT NULL,
    "dureza" VARCHAR(30) NOT NULL,
    "tratamiento" VARCHAR(40) NOT NULL,
    "materialProbeta" VARCHAR(60),
    "idEnsayo" INT NOT NULL,
    PRIMARY KEY ("idEnsayo","idProbeta"),
    FOREIGN KEY ("idEnsayo") REFERENCES "Ensayo"
);

CREATE TABLE "Usuario" (
    "idUsuario" serial NOT NULL,
    "hash" VARCHAR NOT NULL,
    "salt" VARCHAR NOT NULL,
    "legajo" INT NOT NULL,
    PRIMARY KEY ("idUsuario")
);