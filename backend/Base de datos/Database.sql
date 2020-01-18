CREATE TABLE "Ensayo" (
    "idEnsayo" INT NOT NULL,
    "nroEnsayo" INT NOT NULL,
    "fecha" DATE NOT NULL,
    "operador" VARCHAR(50) NOT NULL,
    "observaciones" TEXT,
    PRIMARY KEY ("idEnsayo")
);

CREATE TABLE "Datos" (
    "radio" INT NOT NULL,
    "distciaTotal" INT NOT NULL,
    "tiempoTotal" INT NOT NULL,
    "idDato" INT NOT NULL,
    "materialBola" VARCHAR(60) NOT NULL,
    "idEnsayo" INT NOT NULL,
    PRIMARY KEY ("idDato"),
    FOREIGN KEY ("idEnsayo") REFERENCES "Ensayo"
);

CREATE TABLE "Parametros" (
    "carga" INT NOT NULL,
    "vueltas" INT NOT NULL,
    "idParametro" INT NOT NULL,
    "tiempoActual" INT NOT NULL,
    "horaActual" TIME NOT NULL,
    "idDato" INT NOT NULL,
    PRIMARY KEY ("idParametro","idDato"),
    FOREIGN KEY ("idDato") REFERENCES "Datos"
);

CREATE TABLE "Ambiente" (
    "temperatura" REAL NOT NULL,
    "humedad" REAL NOT NULL,
    "horaActual" TIME NOT NULL,
    "idAmbiente" INT NOT NULL,
    "idDato" INT NOT NULL,
    PRIMARY KEY ("idAmbiente","idDato"),
    FOREIGN KEY ("idDato") REFERENCES "Datos"
);

CREATE TABLE "Probeta" (
    "idProbeta" INT NOT NULL,
    "codigoProbeta" VARCHAR(20) NOT NULL,
    "dureza" INT NOT NULL,
    "tratamiento" VARCHAR(40) NOT NULL,
    "idEnsayo" INT NOT NULL,
    PRIMARY KEY ("idEnsayo","idProbeta"),
    FOREIGN KEY ("idEnsayo") REFERENCES "Ensayo"
);

CREATE TABLE "Usuario" (
    "idUsuario" INT NOT NULL,
    "hash" VARCHAR NOT NULL,
    "salt" VARCHAR NOT NULL,
    "legajo" INT NOT NULL,
    PRIMARY KEY ("idUsuario")
);