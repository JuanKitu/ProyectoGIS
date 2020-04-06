CREATE TABLE "Ensayo" (
    "idEnsayo"  serial NOT NULL,
    "nroEnsayo" INT NOT NULL,
    "fecha" DATE NOT NULL,
    "operador" VARCHAR(50) NOT NULL,
    "observaciones" TEXT,
    "carga" REAL NOT NULL,
    "radioTrayectoria" INT NOT NULL,
    "diametroBola" REAL NOT NULL,
    "distanciaTotal" REAL NOT NULL,
    "tiempoTotal" REAL NOT NULL,
    "idDato" serial NOT NULL,
    "materialBola" VARCHAR(60) NOT NULL,
	"codigoProbeta" VARCHAR(20) NOT NULL,
    "durezaProbeta" VARCHAR(30) NOT NULL,
    "tratamientoProbeta" VARCHAR(40) NOT NULL,
    "materialProbeta" VARCHAR(60),
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

CREATE TABLE "Usuario" (
    "idUsuario" serial NOT NULL,
    "hash" VARCHAR NOT NULL,
    "salt" VARCHAR NOT NULL,
    "legajo" INT NOT NULL,
    PRIMARY KEY ("idUsuario")
);