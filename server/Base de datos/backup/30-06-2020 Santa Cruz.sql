--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-06-30 23:16:35

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 212 (class 1255 OID 40710)
-- Name: crearArchivado_Ensayo(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public."crearArchivado_Ensayo"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
INSERT INTO public."Ensayo_Archivados"(
	"idEnsayo", fecha, operador, observaciones, carga, "radioTrayectoria", "diametroBola", "distanciaTotal", "tiempoTotal", "materialBola", "codigoProbeta", "durezaProbeta", "tratamientoProbeta", "materialProbeta")
	VALUES (old."idEnsayo", old.fecha, old.operador, old.observaciones, old.carga, old."radioTrayectoria", old."diametroBola", old."distanciaTotal", old."tiempoTotal", old."materialBola", old."codigoProbeta", old."durezaProbeta", old."tratamientoProbeta", old."materialProbeta");
  return Old;
end;$$;


ALTER FUNCTION public."crearArchivado_Ensayo"() OWNER TO postgres;

--
-- TOC entry 225 (class 1255 OID 40711)
-- Name: crearArchivado_Parametros(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public."crearArchivado_Parametros"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
IF EXISTS (SELECT "idEnsayo" 
	FROM public."Ensayo_Archivados"
	where "idEnsayo" = old."idEnsayo") THEN
	INSERT INTO public."Parametros_Archivados"(
		"idParametro", "fuerzaRozamiento", "coeficienteRozamiento", vueltas, "tiempoActual", "idEnsayo")
		VALUES (old."idParametro", old."fuerzaRozamiento", old."coeficienteRozamiento", old.vueltas, old."tiempoActual", old."idEnsayo");
		return Old;
END IF;
return Old;
end;$$;


ALTER FUNCTION public."crearArchivado_Parametros"() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 40712)
-- Name: Ambiente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ambiente" (
    "idAmbiente" integer NOT NULL,
    temperatura real NOT NULL,
    humedad real NOT NULL,
    "horaActual" time without time zone NOT NULL,
    "idEnsayo" integer NOT NULL
);


ALTER TABLE public."Ambiente" OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 40715)
-- Name: Ambiente_idAmbiente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ambiente_idAmbiente_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Ambiente_idAmbiente_seq" OWNER TO postgres;

--
-- TOC entry 2872 (class 0 OID 0)
-- Dependencies: 203
-- Name: Ambiente_idAmbiente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ambiente_idAmbiente_seq" OWNED BY public."Ambiente"."idAmbiente";


--
-- TOC entry 204 (class 1259 OID 40717)
-- Name: Ensayo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ensayo" (
    "idEnsayo" integer NOT NULL,
    fecha date,
    operador character varying(50) NOT NULL,
    observaciones text,
    carga real NOT NULL,
    "radioTrayectoria" integer NOT NULL,
    "diametroBola" real NOT NULL,
    "distanciaTotal" real,
    "tiempoTotal" real,
    "materialBola" character varying(60) NOT NULL,
    "codigoProbeta" character varying(20) NOT NULL,
    "durezaProbeta" character varying(30) NOT NULL,
    "tratamientoProbeta" character varying(40) NOT NULL,
    "materialProbeta" character varying(60) NOT NULL
);


ALTER TABLE public."Ensayo" OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 40723)
-- Name: Ensayo_Archivados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ensayo_Archivados" (
    "idEnsayo" integer NOT NULL,
    fecha date,
    operador character varying(50) NOT NULL,
    observaciones text,
    carga real NOT NULL,
    "radioTrayectoria" integer NOT NULL,
    "diametroBola" real NOT NULL,
    "distanciaTotal" real,
    "tiempoTotal" real,
    "materialBola" character varying(60) NOT NULL,
    "codigoProbeta" character varying(20) NOT NULL,
    "durezaProbeta" character varying(30) NOT NULL,
    "tratamientoProbeta" character varying(40) NOT NULL,
    "materialProbeta" character varying(60) NOT NULL
);


ALTER TABLE public."Ensayo_Archivados" OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 40729)
-- Name: Ensayo_idEnsayo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ensayo_idEnsayo_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Ensayo_idEnsayo_seq" OWNER TO postgres;

--
-- TOC entry 2873 (class 0 OID 0)
-- Dependencies: 206
-- Name: Ensayo_idEnsayo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ensayo_idEnsayo_seq" OWNED BY public."Ensayo"."idEnsayo";


--
-- TOC entry 207 (class 1259 OID 40731)
-- Name: Parametros; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Parametros" (
    "idParametro" integer NOT NULL,
    "fuerzaRozamiento" real NOT NULL,
    "coeficienteRozamiento" real NOT NULL,
    vueltas integer,
    "tiempoActual" real NOT NULL,
    "idEnsayo" integer NOT NULL
);


ALTER TABLE public."Parametros" OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 40734)
-- Name: Parametros_Archivados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Parametros_Archivados" (
    "idParametro" integer NOT NULL,
    "fuerzaRozamiento" real NOT NULL,
    "coeficienteRozamiento" real NOT NULL,
    vueltas integer,
    "tiempoActual" real NOT NULL,
    "idEnsayo" integer NOT NULL
);


ALTER TABLE public."Parametros_Archivados" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 40737)
-- Name: Parametros_idParametro_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Parametros_idParametro_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Parametros_idParametro_seq" OWNER TO postgres;

--
-- TOC entry 2874 (class 0 OID 0)
-- Dependencies: 209
-- Name: Parametros_idParametro_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Parametros_idParametro_seq" OWNED BY public."Parametros"."idParametro";


--
-- TOC entry 210 (class 1259 OID 40739)
-- Name: Usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Usuario" (
    "idUsuario" integer NOT NULL,
    hash character varying NOT NULL,
    salt character varying NOT NULL,
    legajo integer NOT NULL
);


ALTER TABLE public."Usuario" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 40745)
-- Name: Usuario_idUsuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Usuario_idUsuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Usuario_idUsuario_seq" OWNER TO postgres;

--
-- TOC entry 2875 (class 0 OID 0)
-- Dependencies: 211
-- Name: Usuario_idUsuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Usuario_idUsuario_seq" OWNED BY public."Usuario"."idUsuario";


--
-- TOC entry 2718 (class 2604 OID 40747)
-- Name: Ambiente idAmbiente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ambiente" ALTER COLUMN "idAmbiente" SET DEFAULT nextval('public."Ambiente_idAmbiente_seq"'::regclass);


--
-- TOC entry 2719 (class 2604 OID 40748)
-- Name: Ensayo idEnsayo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ensayo" ALTER COLUMN "idEnsayo" SET DEFAULT nextval('public."Ensayo_idEnsayo_seq"'::regclass);


--
-- TOC entry 2720 (class 2604 OID 40749)
-- Name: Parametros idParametro; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parametros" ALTER COLUMN "idParametro" SET DEFAULT nextval('public."Parametros_idParametro_seq"'::regclass);


--
-- TOC entry 2721 (class 2604 OID 40750)
-- Name: Usuario idUsuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario" ALTER COLUMN "idUsuario" SET DEFAULT nextval('public."Usuario_idUsuario_seq"'::regclass);


--
-- TOC entry 2723 (class 2606 OID 40752)
-- Name: Ambiente Ambiente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ambiente"
    ADD CONSTRAINT "Ambiente_pkey" PRIMARY KEY ("idAmbiente", "idEnsayo");


--
-- TOC entry 2727 (class 2606 OID 40754)
-- Name: Ensayo_Archivados Ensayo_Archivado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ensayo_Archivados"
    ADD CONSTRAINT "Ensayo_Archivado_pkey" PRIMARY KEY ("idEnsayo");


--
-- TOC entry 2725 (class 2606 OID 40756)
-- Name: Ensayo Ensayo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ensayo"
    ADD CONSTRAINT "Ensayo_pkey" PRIMARY KEY ("idEnsayo");


--
-- TOC entry 2732 (class 2606 OID 40758)
-- Name: Parametros_Archivados Parametros_Archivados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parametros_Archivados"
    ADD CONSTRAINT "Parametros_Archivados_pkey" PRIMARY KEY ("idParametro", "idEnsayo");


--
-- TOC entry 2729 (class 2606 OID 40760)
-- Name: Parametros Parametros_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parametros"
    ADD CONSTRAINT "Parametros_pkey" PRIMARY KEY ("idParametro", "idEnsayo");


--
-- TOC entry 2735 (class 2606 OID 40762)
-- Name: Usuario Usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario");


--
-- TOC entry 2733 (class 1259 OID 40791)
-- Name: fki_Parametros_Archivados_idEnsayo_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_Parametros_Archivados_idEnsayo_fkey" ON public."Parametros_Archivados" USING btree ("idEnsayo");


--
-- TOC entry 2730 (class 1259 OID 40785)
-- Name: fki_Parametros_idEnsayo_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_Parametros_idEnsayo_fkey" ON public."Parametros" USING btree ("idEnsayo");


--
-- TOC entry 2739 (class 2620 OID 40763)
-- Name: Ensayo archivo_baja; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER archivo_baja BEFORE DELETE ON public."Ensayo" FOR EACH ROW EXECUTE FUNCTION public."crearArchivado_Ensayo"();


--
-- TOC entry 2740 (class 2620 OID 40764)
-- Name: Parametros archivo_baja; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER archivo_baja BEFORE DELETE ON public."Parametros" FOR EACH ROW EXECUTE FUNCTION public."crearArchivado_Parametros"();


--
-- TOC entry 2736 (class 2606 OID 40765)
-- Name: Ambiente Ambiente_idEnsayo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ambiente"
    ADD CONSTRAINT "Ambiente_idEnsayo_fkey" FOREIGN KEY ("idEnsayo") REFERENCES public."Ensayo"("idEnsayo");


--
-- TOC entry 2738 (class 2606 OID 40786)
-- Name: Parametros_Archivados Parametros_Archivados_idEnsayo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parametros_Archivados"
    ADD CONSTRAINT "Parametros_Archivados_idEnsayo_fkey" FOREIGN KEY ("idEnsayo") REFERENCES public."Ensayo_Archivados"("idEnsayo") ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2737 (class 2606 OID 40780)
-- Name: Parametros Parametros_idEnsayo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parametros"
    ADD CONSTRAINT "Parametros_idEnsayo_fkey" FOREIGN KEY ("idEnsayo") REFERENCES public."Ensayo"("idEnsayo") ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


-- Completed on 2020-06-30 23:16:36

--
-- PostgreSQL database dump complete
--

