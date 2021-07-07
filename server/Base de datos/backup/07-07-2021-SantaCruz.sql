PGDMP         %    	            y            GISDB    12.7    12.7 9    M           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            N           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            O           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            P           1262    16466    GISDB    DATABASE     �   CREATE DATABASE "GISDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_Europe.1252' LC_CTYPE = 'English_Europe.1252';
    DROP DATABASE "GISDB";
                postgres    false            �            1255    16552    crearArchivado_Ambientes()    FUNCTION     �  CREATE FUNCTION public."crearArchivado_Ambientes"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
IF EXISTS (SELECT "idEnsayo" 
	FROM public."Ensayo_Archivados"
	where "idEnsayo" = old."idEnsayo") THEN
	INSERT INTO public."Ambiente_Archivados"(
		"idAmbiente", "temperatura", "humedad", "horaActual", "idEnsayo")
		VALUES (old."idAmbiente", old."temperatura", old."humedad", old."horaActual", old."idEnsayo");
		return Old;
END IF;
return Old;
end;
$$;
 3   DROP FUNCTION public."crearArchivado_Ambientes"();
       public          postgres    false            �            1255    16467    crearArchivado_Ensayo()    FUNCTION     �  CREATE FUNCTION public."crearArchivado_Ensayo"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
INSERT INTO public."Ensayo_Archivados"(
	"idEnsayo", fecha, operador, observaciones, carga, "radioTrayectoria", "diametroBola", "distanciaTotal", "tiempoTotal", "materialBola", "codigoProbeta", "durezaProbeta", "tratamientoProbeta", "materialProbeta")
	VALUES (old."idEnsayo", old.fecha, old.operador, old.observaciones, old.carga, old."radioTrayectoria", old."diametroBola", old."distanciaTotal", old."tiempoTotal", old."materialBola", old."codigoProbeta", old."durezaProbeta", old."tratamientoProbeta", old."materialProbeta");
  return Old;
end;$$;
 0   DROP FUNCTION public."crearArchivado_Ensayo"();
       public          postgres    false            �            1255    16468    crearArchivado_Parametros()    FUNCTION       CREATE FUNCTION public."crearArchivado_Parametros"() RETURNS trigger
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
 4   DROP FUNCTION public."crearArchivado_Parametros"();
       public          postgres    false            �            1259    16469    Ambiente    TABLE     �   CREATE TABLE public."Ambiente" (
    "idAmbiente" integer NOT NULL,
    temperatura real NOT NULL,
    humedad real NOT NULL,
    "horaActual" time without time zone NOT NULL,
    "idEnsayo" integer NOT NULL
);
    DROP TABLE public."Ambiente";
       public         heap    postgres    false            �            1259    16541    Ambiente_Archivados    TABLE     �   CREATE TABLE public."Ambiente_Archivados" (
    "idAmbiente" integer NOT NULL,
    "idEnsayo" integer NOT NULL,
    temperatura real,
    humedad real,
    "horaActual" time with time zone
);
 )   DROP TABLE public."Ambiente_Archivados";
       public         heap    postgres    false            �            1259    16539 "   Ambiente_Archivados_idAmbiente_seq    SEQUENCE     �   CREATE SEQUENCE public."Ambiente_Archivados_idAmbiente_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Ambiente_Archivados_idAmbiente_seq";
       public          postgres    false    213            Q           0    0 "   Ambiente_Archivados_idAmbiente_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public."Ambiente_Archivados_idAmbiente_seq" OWNED BY public."Ambiente_Archivados"."idAmbiente";
          public          postgres    false    212            �            1259    16472    Ambiente_idAmbiente_seq    SEQUENCE     �   CREATE SEQUENCE public."Ambiente_idAmbiente_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Ambiente_idAmbiente_seq";
       public          postgres    false    202            R           0    0    Ambiente_idAmbiente_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Ambiente_idAmbiente_seq" OWNED BY public."Ambiente"."idAmbiente";
          public          postgres    false    203            �            1259    16474    Ensayo    TABLE     8  CREATE TABLE public."Ensayo" (
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
    DROP TABLE public."Ensayo";
       public         heap    postgres    false            �            1259    16480    Ensayo_Archivados    TABLE     C  CREATE TABLE public."Ensayo_Archivados" (
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
 '   DROP TABLE public."Ensayo_Archivados";
       public         heap    postgres    false            �            1259    16486    Ensayo_idEnsayo_seq    SEQUENCE     �   CREATE SEQUENCE public."Ensayo_idEnsayo_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Ensayo_idEnsayo_seq";
       public          postgres    false    204            S           0    0    Ensayo_idEnsayo_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Ensayo_idEnsayo_seq" OWNED BY public."Ensayo"."idEnsayo";
          public          postgres    false    206            �            1259    16488 
   Parametros    TABLE     �   CREATE TABLE public."Parametros" (
    "idParametro" integer NOT NULL,
    "fuerzaRozamiento" real NOT NULL,
    "coeficienteRozamiento" real NOT NULL,
    vueltas integer,
    "tiempoActual" real NOT NULL,
    "idEnsayo" integer NOT NULL
);
     DROP TABLE public."Parametros";
       public         heap    postgres    false            �            1259    16491    Parametros_Archivados    TABLE     �   CREATE TABLE public."Parametros_Archivados" (
    "idParametro" integer NOT NULL,
    "fuerzaRozamiento" real NOT NULL,
    "coeficienteRozamiento" real NOT NULL,
    vueltas integer,
    "tiempoActual" real NOT NULL,
    "idEnsayo" integer NOT NULL
);
 +   DROP TABLE public."Parametros_Archivados";
       public         heap    postgres    false            �            1259    16494    Parametros_idParametro_seq    SEQUENCE     �   CREATE SEQUENCE public."Parametros_idParametro_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."Parametros_idParametro_seq";
       public          postgres    false    207            T           0    0    Parametros_idParametro_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."Parametros_idParametro_seq" OWNED BY public."Parametros"."idParametro";
          public          postgres    false    209            �            1259    16496    Usuario    TABLE     �   CREATE TABLE public."Usuario" (
    "idUsuario" integer NOT NULL,
    hash character varying NOT NULL,
    salt character varying NOT NULL,
    legajo integer NOT NULL
);
    DROP TABLE public."Usuario";
       public         heap    postgres    false            �            1259    16502    Usuario_idUsuario_seq    SEQUENCE     �   CREATE SEQUENCE public."Usuario_idUsuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Usuario_idUsuario_seq";
       public          postgres    false    210            U           0    0    Usuario_idUsuario_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Usuario_idUsuario_seq" OWNED BY public."Usuario"."idUsuario";
          public          postgres    false    211            �
           2604    16504    Ambiente idAmbiente    DEFAULT     �   ALTER TABLE ONLY public."Ambiente" ALTER COLUMN "idAmbiente" SET DEFAULT nextval('public."Ambiente_idAmbiente_seq"'::regclass);
 F   ALTER TABLE public."Ambiente" ALTER COLUMN "idAmbiente" DROP DEFAULT;
       public          postgres    false    203    202            �
           2604    16544    Ambiente_Archivados idAmbiente    DEFAULT     �   ALTER TABLE ONLY public."Ambiente_Archivados" ALTER COLUMN "idAmbiente" SET DEFAULT nextval('public."Ambiente_Archivados_idAmbiente_seq"'::regclass);
 Q   ALTER TABLE public."Ambiente_Archivados" ALTER COLUMN "idAmbiente" DROP DEFAULT;
       public          postgres    false    212    213    213            �
           2604    16505    Ensayo idEnsayo    DEFAULT     x   ALTER TABLE ONLY public."Ensayo" ALTER COLUMN "idEnsayo" SET DEFAULT nextval('public."Ensayo_idEnsayo_seq"'::regclass);
 B   ALTER TABLE public."Ensayo" ALTER COLUMN "idEnsayo" DROP DEFAULT;
       public          postgres    false    206    204            �
           2604    16506    Parametros idParametro    DEFAULT     �   ALTER TABLE ONLY public."Parametros" ALTER COLUMN "idParametro" SET DEFAULT nextval('public."Parametros_idParametro_seq"'::regclass);
 I   ALTER TABLE public."Parametros" ALTER COLUMN "idParametro" DROP DEFAULT;
       public          postgres    false    209    207            �
           2604    16507    Usuario idUsuario    DEFAULT     |   ALTER TABLE ONLY public."Usuario" ALTER COLUMN "idUsuario" SET DEFAULT nextval('public."Usuario_idUsuario_seq"'::regclass);
 D   ALTER TABLE public."Usuario" ALTER COLUMN "idUsuario" DROP DEFAULT;
       public          postgres    false    211    210            ?          0    16469    Ambiente 
   TABLE DATA           b   COPY public."Ambiente" ("idAmbiente", temperatura, humedad, "horaActual", "idEnsayo") FROM stdin;
    public          postgres    false    202   kP       J          0    16541    Ambiente_Archivados 
   TABLE DATA           m   COPY public."Ambiente_Archivados" ("idAmbiente", "idEnsayo", temperatura, humedad, "horaActual") FROM stdin;
    public          postgres    false    213   AS       A          0    16474    Ensayo 
   TABLE DATA           �   COPY public."Ensayo" ("idEnsayo", fecha, operador, observaciones, carga, "radioTrayectoria", "diametroBola", "distanciaTotal", "tiempoTotal", "materialBola", "codigoProbeta", "durezaProbeta", "tratamientoProbeta", "materialProbeta") FROM stdin;
    public          postgres    false    204   ^S       B          0    16480    Ensayo_Archivados 
   TABLE DATA              COPY public."Ensayo_Archivados" ("idEnsayo", fecha, operador, observaciones, carga, "radioTrayectoria", "diametroBola", "distanciaTotal", "tiempoTotal", "materialBola", "codigoProbeta", "durezaProbeta", "tratamientoProbeta", "materialProbeta") FROM stdin;
    public          postgres    false    205   $U       D          0    16488 
   Parametros 
   TABLE DATA           �   COPY public."Parametros" ("idParametro", "fuerzaRozamiento", "coeficienteRozamiento", vueltas, "tiempoActual", "idEnsayo") FROM stdin;
    public          postgres    false    207   AU       E          0    16491    Parametros_Archivados 
   TABLE DATA           �   COPY public."Parametros_Archivados" ("idParametro", "fuerzaRozamiento", "coeficienteRozamiento", vueltas, "tiempoActual", "idEnsayo") FROM stdin;
    public          postgres    false    208   i9      G          0    16496    Usuario 
   TABLE DATA           D   COPY public."Usuario" ("idUsuario", hash, salt, legajo) FROM stdin;
    public          postgres    false    210   �9      V           0    0 "   Ambiente_Archivados_idAmbiente_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."Ambiente_Archivados_idAmbiente_seq"', 1, false);
          public          postgres    false    212            W           0    0    Ambiente_idAmbiente_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."Ambiente_idAmbiente_seq"', 1803, true);
          public          postgres    false    203            X           0    0    Ensayo_idEnsayo_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Ensayo_idEnsayo_seq"', 416, true);
          public          postgres    false    206            Y           0    0    Parametros_idParametro_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."Parametros_idParametro_seq"', 39849, true);
          public          postgres    false    209            Z           0    0    Usuario_idUsuario_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Usuario_idUsuario_seq"', 1, false);
          public          postgres    false    211            �
           2606    16546 ,   Ambiente_Archivados Ambiente_Archivados_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Ambiente_Archivados"
    ADD CONSTRAINT "Ambiente_Archivados_pkey" PRIMARY KEY ("idAmbiente", "idEnsayo");
 Z   ALTER TABLE ONLY public."Ambiente_Archivados" DROP CONSTRAINT "Ambiente_Archivados_pkey";
       public            postgres    false    213    213            �
           2606    16509    Ambiente Ambiente_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."Ambiente"
    ADD CONSTRAINT "Ambiente_pkey" PRIMARY KEY ("idAmbiente", "idEnsayo");
 D   ALTER TABLE ONLY public."Ambiente" DROP CONSTRAINT "Ambiente_pkey";
       public            postgres    false    202    202            �
           2606    16511 '   Ensayo_Archivados Ensayo_Archivado_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."Ensayo_Archivados"
    ADD CONSTRAINT "Ensayo_Archivado_pkey" PRIMARY KEY ("idEnsayo");
 U   ALTER TABLE ONLY public."Ensayo_Archivados" DROP CONSTRAINT "Ensayo_Archivado_pkey";
       public            postgres    false    205            �
           2606    16513    Ensayo Ensayo_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Ensayo"
    ADD CONSTRAINT "Ensayo_pkey" PRIMARY KEY ("idEnsayo");
 @   ALTER TABLE ONLY public."Ensayo" DROP CONSTRAINT "Ensayo_pkey";
       public            postgres    false    204            �
           2606    16515 0   Parametros_Archivados Parametros_Archivados_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Parametros_Archivados"
    ADD CONSTRAINT "Parametros_Archivados_pkey" PRIMARY KEY ("idParametro", "idEnsayo");
 ^   ALTER TABLE ONLY public."Parametros_Archivados" DROP CONSTRAINT "Parametros_Archivados_pkey";
       public            postgres    false    208    208            �
           2606    16517    Parametros Parametros_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY public."Parametros"
    ADD CONSTRAINT "Parametros_pkey" PRIMARY KEY ("idParametro", "idEnsayo");
 H   ALTER TABLE ONLY public."Parametros" DROP CONSTRAINT "Parametros_pkey";
       public            postgres    false    207    207            �
           2606    16519    Usuario Usuario_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario");
 B   ALTER TABLE ONLY public."Usuario" DROP CONSTRAINT "Usuario_pkey";
       public            postgres    false    210            �
           1259    16520 '   fki_Parametros_Archivados_idEnsayo_fkey    INDEX     s   CREATE INDEX "fki_Parametros_Archivados_idEnsayo_fkey" ON public."Parametros_Archivados" USING btree ("idEnsayo");
 =   DROP INDEX public."fki_Parametros_Archivados_idEnsayo_fkey";
       public            postgres    false    208            �
           1259    16521    fki_Parametros_idEnsayo_fkey    INDEX     ]   CREATE INDEX "fki_Parametros_idEnsayo_fkey" ON public."Parametros" USING btree ("idEnsayo");
 2   DROP INDEX public."fki_Parametros_idEnsayo_fkey";
       public            postgres    false    207            �
           2620    16553    Ambiente archivo_baja    TRIGGER     �   CREATE TRIGGER archivo_baja BEFORE DELETE ON public."Ambiente" FOR EACH ROW EXECUTE FUNCTION public."crearArchivado_Ambientes"();
 0   DROP TRIGGER archivo_baja ON public."Ambiente";
       public          postgres    false    202    216            �
           2620    16522    Ensayo archivo_baja    TRIGGER     }   CREATE TRIGGER archivo_baja BEFORE DELETE ON public."Ensayo" FOR EACH ROW EXECUTE FUNCTION public."crearArchivado_Ensayo"();
 .   DROP TRIGGER archivo_baja ON public."Ensayo";
       public          postgres    false    214    204            �
           2620    16523    Parametros archivo_baja    TRIGGER     �   CREATE TRIGGER archivo_baja BEFORE DELETE ON public."Parametros" FOR EACH ROW EXECUTE FUNCTION public."crearArchivado_Parametros"();
 2   DROP TRIGGER archivo_baja ON public."Parametros";
       public          postgres    false    215    207            �
           2606    16524    Ambiente Ambiente_idEnsayo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Ambiente"
    ADD CONSTRAINT "Ambiente_idEnsayo_fkey" FOREIGN KEY ("idEnsayo") REFERENCES public."Ensayo"("idEnsayo");
 M   ALTER TABLE ONLY public."Ambiente" DROP CONSTRAINT "Ambiente_idEnsayo_fkey";
       public          postgres    false    2733    204    202            �
           2606    16529 9   Parametros_Archivados Parametros_Archivados_idEnsayo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Parametros_Archivados"
    ADD CONSTRAINT "Parametros_Archivados_idEnsayo_fkey" FOREIGN KEY ("idEnsayo") REFERENCES public."Ensayo_Archivados"("idEnsayo") ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 g   ALTER TABLE ONLY public."Parametros_Archivados" DROP CONSTRAINT "Parametros_Archivados_idEnsayo_fkey";
       public          postgres    false    2735    205    208            �
           2606    16534 #   Parametros Parametros_idEnsayo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Parametros"
    ADD CONSTRAINT "Parametros_idEnsayo_fkey" FOREIGN KEY ("idEnsayo") REFERENCES public."Ensayo"("idEnsayo") ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 Q   ALTER TABLE ONLY public."Parametros" DROP CONSTRAINT "Parametros_idEnsayo_fkey";
       public          postgres    false    207    204    2733            �
           2606    16547    Ambiente_Archivados idEnsayo    FK CONSTRAINT     �   ALTER TABLE ONLY public."Ambiente_Archivados"
    ADD CONSTRAINT "idEnsayo" FOREIGN KEY ("idEnsayo") REFERENCES public."Ensayo_Archivados"("idEnsayo");
 J   ALTER TABLE ONLY public."Ambiente_Archivados" DROP CONSTRAINT "idEnsayo";
       public          postgres    false    2735    205    213            ?   �  x�}�mn� �ߙ�T|��p��`���/��1��*����G/�L�)�+����_<J@��ɔ�$�{Q�i ,�+�$ěY��Z�-Y�a�f�0V���Ȟ�&�j]#����k�#W��4֯�d���ߩ��Fm#ò�� ���sI:bx��k7�#GӼH>R<��mv���N&>-b%��Aڹ���D��&�K��!ҏ*�ܲ�6��n�k�23%���i;G��f|�X?��8;�X�m�wL��.��\�aRp)�2?�0�1�
��bY��e_]1�0�mW�\�5�m�薫G�#�l���N�9���L65���\Ԥ-x!�&R�K�T��u���HaՍ��v|Ţ"��S�(-�#39@[F�⹓H�8״r������ܭ�o���C��U38r����D}�Ĥa��~.5��R�H��˭��i/����z������b�Sd���l٩�(�#8g���&���٫��%��W�G��E�lZK;lwd��9��-�9J/��t6CE��`Y�ZfW�+*lw���,S���NᣴG����^����S0;"���a6��V�����-o���o������#/�z��|x��Juٻї�#�zR��v�����b�{*�l�J�m�/�0�NZL�S"!�k�y�gG��=����i���֩4�0�1�J�W�8R�+v߭)~��h�RX1�g�,ߌ��hVnk�O������<���      J      x������ � �      A   �  x���KO�0 ���W�l�G��#�@Z��+������jS?����3�@ã��H����x�JZj���JK8��{���:��H'w�����э�í�[���|�Q����H[g��Y�!�ژ�V$$/�)���a�&'��{څ��c�~f��:zb5�JBW�o?N�D���Rkz+�
����<�aڋ͚���Z��y�]����ճ��qWP��Է6������&���H�������
�
?k�D�P"eo-�LЗw������W;�&�J����-�G�ܽE�2��(��

��XC����>I����o���Z�:Oܨ��3���	�O�����ǟSZ؇�T�Y��e���;�9��ɤ�j'Q�H�9_��1����3jr�9�c�'�#݈
ի�ǋ�~Is/(�*\.o��������Pvl�?5M����      B      x������ � �      D      x�l}[�,)��w�`�
�0��2�Xa��۷���A`��\��<����Nu|���ԧ�W�e���1��>m�_�g����gt�[Z��ZS��O���5�G�m��\^1���Yߦ��l}V���Iu�=���S(���̵�O���QM��G_���T�m>ўw�=��Ğ?ͣ3��^��F7���ǭU���)�&���]L]��A��h^��o��\����1�G��h.�|�z�h��偭�}�o`�D�����F�Ą��[Y�{l1iu9B��Y�v�.���O�y�(J���������9�Ӎ�=1uu�ޯ=�=���s׀F�.�e�=�d�?�Qx�V@�Q|�ց�9����hI��n�I �w-	b{��!	d{�9�k�������cN�%�}�`Q���>��!J����k^��x/	�����&Xop9��{&wl����
�+��a����^!���	���V������"�xY���	YR����/��a�ؙQd����	E��4��p{^��"n���fp{n΄�"n�Ι0Qd��	8&��=g�D�,�Y8�$�{΄�*Yܳl&LT��f3a�J�L�	U���\Z.(j(Q�DZU���TZU���tZUK�=aBH�beϘş��ʞ0!�I&Ӟ3��I*S���q�7�ӞA��:oO���҈b���Z0w�=����T��	��.�ӞɊW0�������X��q��lV#]��g�B �E=:�����}�~�Io�����ⱇx!�����(Ω��k�#ٿ��iMF�h�q�'��,�l$���24�{����'~�eh>+�9�S�'�J`��=�T���|�����s�%�P35�{������sE%�� �=QT����s@uc ��*agP�9�vf ��*gPo�WB��� ��� ��JxY����R0�)+dl�LV�؆o�Y!c�� �B�6(�c��mD6��
ۀl��26�L�C�6̚#�?!cc��П����X�O��FOs �'dlC���C��Pn���w��U�M�ߍ��(<]���E��fAA���#M4(��i��h�)6pi�9z�\�Ii���b��8o���å=�ۤe�e��6)D�qY�(���=bۢc�����5K��쎏���vy�qc̺�gw���[/{|vJϺ��Ga�'��d~��Q�-�;�a��鄕Ж�=�:a%�A���������V���XI��3���`F�ꁕ����2��A't��1l?4J�����]H��Ɲ��mH����_ �s�vaC��-7�v"�n�mE�����E2��.>�����A �v$��A �!���m:j~�_n4j~��f�߆��aᢅ��U�B����]A�iw�����m����kw�a�iwN���z�wN!�逴m�S���p�ȝ�A��: w��k>w�k>w�k>����;���lب�85���N�|�?8]�����ad�_>	5C���$�Mfǖ�94���M���d�_6�	���$�0O�'!hh�'�gh�x&agh�p��9$p`?���;�I��aeٯ���Ђ���I`��,d�o�]�_8	,���N��A�;	,S�Ėũ�p���w(��qX����G���t�?����p��I`Y�������|���/K�{Hqj>w��/K��ExY��].���Ro9^�#�,��[��H>��F��f�ޥ�Jp9jF�]�.�����NA��Z0O�=����7
�粋��(�p�ۇ����7;^Fz���|K)��ov��2�+��0)dlׂ�2�K�5)���]��I����2p-
,dl׀kQ`!c{�ϵ���2~[=�p<����olဤd�.:F8")�X��FI�.��������o[)���]����	^K��l
0d�t�{�!}v��(X�|��G&�>�r��C��S؇`��&�ACNJ����s��T۔�`e
,8�}&z|Rp��T�u)u���"�`���������!�h�Rp��tj�	!��0<���Y�����={����7����ax�p���GhZ
�f��}T�l-8|���:��K۔��8�����d����N�G�������l�w]�4�f���ґ�Dv�� ���d���l.��_������tTs�`CNG����5�tع���Vʘf�1��J��w'���J��\n=̙�|�gs"	����f��s�7lz�4�4�G2���t�Gh[ʮ�ɏ2�k�D��cP��$ѱ�О��f.7�@�*����ҷ섌��%[��:����`B�R�dv�n;�o_���O8	]K}��ot�m�~;!$�-u�ɉ�G8;�ϲ���������	����dv�.�.�ND��'5U���C�~�?=�.�0�JM�����JM���p�R�c�]8E�{̥{(?�L�u�G��ǒI��d~,�k�cO
S&���懵)̍�y~OF�]��*j?:��O$_VTt8?�H�����p~Z���(�ѯG��=�=�*�;���c������h��e�$5^q�;r�ЙI����g�|��s��$�����~&�'Χ��C�i��IqJ>Q�ѹ�L�O0���~&�(���~����RΡ��A�h�Sq5KTA�����%�(��~f�)
A:��Yr�R��$�`����̒ST�tv?������,c��?�)c�`�(d�����Yd��Σ��Y$�� ,�'JA:�����d�tjl�y��: �&ku��q(Ԯ.���Z��2��c������!�Oku�K2��ku�rB��n'�Ts��V��l�>�u��N�WP��Y�t�?�fv/͉��g�̢����Y5���?C3���%`5�,�I��&#�$1f���7�6��<ԑ�]f �D	�-�  G'��&I?:'`6I*(҉H�IR��N�$� B'��.I:1`ZԳ��	$,p�1�uAo�e7�.�����%2XAxND�]+(ω�k^QUE`ZC��%q��Do�/E�k_b��{��[�@uI,�9$� K`�)*Pb	L���p���*v|�B�����������a�#�S��sH>Q\v���i���wȠ�#(���<n��)�=6�=0�Wz{4�qZ����F��٫؍@EqJ>QZ�`N�'v�L0�kz��'�	��$o�bT��]�Ғ��z�~��J ̀E��L0���'�	�|��$2�\�Ol-^2�\�O�D&��B�=�yx�]<
�e爿;�D)��zy4���K��O�q�G򉲒��O/��q�N������h���呍���K>��H܂uڧ��yx�]<��Fq��DaI܂�H>��8�.�D�I܂��(+�[���Ol0�`%��;�[���O���!�F��8e|��$n�J�O��-XI�'�E��$�����$�D5I�e|N�)z�Y�'6�^���O�D/XY�'j��O�|&����{(Ц.�\<Ү.HA�tOo�b.�T��#Yꀌ�N�v�r�=��e������WP]�V�y�5M�W�#!��qRk"��*q��ך�~�J�=x�����u	��4�q]k5�`�X7����~�j��@[MD?X5���D�Uc�fj��Uc�bj"����`�&���%0O�V�|b����F܃}��?!�a���"��,MD?X-���D��d|��$�j2>Q#.�B�'�'�����OԐDEXM�'jHb#�&�a4#a5I(v(�����&"&�.�w49auI)�D�'�.C{�DQX=.M`����K؟��
���%qV��(؟��
KZ%�?1V�/gau��1�	J#.�`xf�-��z�831֐|�d7Ni�@�̏?A �u&�V��6�)�l�AIZ%53Q�����L�~����\��@�'�qN�� (�V�5�����`X�Wz�4c��d��2�aMY�A���`XS�n�N�t��	����0���K/�d���ݒz�rw2=�&��:�ۥ��}���.�����2�]�`ﱞ���2�d�s���@�6q���DgX�mz�d��)ء    .�\<ة.{$�f�8��-ϣ��W��k�.�ى�\dm�,�5v^�v)q�c��T�##�Bռ�kcg5l�+�7vV�vѼ�cg5l�+�:N�y�W��m(OҼ�c�7l�+�����E�
:bvz�v�JbN���%f'9l�,���y��2k�A���D�� y1;�a�H^�C�?��vX�%;E���9��)$vo�����z:���·��KV�j.7T���N(�@t���g�b�w),k���<<R�F��l7����L��Njd���"̙`e�TxH��W~K��5R�ž��X��
.H�����<n�E����WyIABV�I�d.��� #��K�@���Lu9����: #��N�p.��3N7����*��c.7Ъ�ߏ�傪*��cs!XU����\VUfVp�r!XU�P��U� �f�g��
f^.�&3+�y��NWEk	�y���&g!d5Ml��=��Ak�,��&Ei!d���+2B�j���.VӴ�.-�iE�YY]�ڋ��P�.X�K!�k^Q�B��h��i����5��c	U��"ԛ�P��R5�S	U]Ꮒ����g���
���P5t�B�Y	UC+���P5t�B�Y	U��z��]5������P5d���jT�_�=��9
u�G7�t�~�G�Ď�J�����2����z{ �)+��J���Qԑ�4�˾�H��s�P�� ��cud%@M����ꯑ�
�X��%cl�\	V�`�0�+K,0�r%`i�BXnX+����F�:���c���w�@�ʍP�d�
|��UK��Q���ϐ�*0��S&J:���2�%=q��+;c���[�<�y��[+��r�($��"�1�=$�("�1Q��)0��&Jz�2&Vv�DI���D���,�xX��%�'>a��3Ʉ
�Uv�DII&T���%JJa��*7�,�`Qe�J��XTٹ%%�����Ε()IJQA:W���V@��?�Ķ�E�d���p
���d���p
���d����X����-QR�A����#d�
ԧ�	Mz:^S��,��c'8e�)��Np�RM�ה���TP�r'8�MQ:v�S���<�{��O���;�I�)0�rw��S�=���;��S���[;Nԍ� u�)~
�Nx�f���b�d�߱Ď\���z{�ϰVJ=L�K�=�y�8��z�V��ォJ>QY5Ro�b��u� ,Y��_�ʃ�T��(�4�`�A`j��(�R�!��r��Q�b�R�!��sxRG����IO�&uh<y���Q���ApjqyBe9�Q��r�z\��D�RO�� (���9�b��M�����=�آ�4�,J ��A8�q�&�Q�	�</���� ��IHҎ��$(��N�g�$$��9�@G���>���<	C�4��'aH�&�b�$I��K���!h�%OC��K��)[|���I ��	Ė<	C�o��Ė<	B3Π��v{�AAZɓ@4�
�J���gP���I0�2����'ijNQJN��4#��9E�9	NK�M�7ɓ��
�I�'k��C�]��s�}S0N�"8-��$�iɶ)%y�����"D-�+����м��t�D��4�����5Q�5Mo$�Q��i
���ү��������j�y%?2XQm:o��G��R�y�C���q�M���M0>�r����|d�M�l}����2�#
�̀L�s�^�ו?M�c���浖`�ik�W�� �	/Y�b�\�}I��?�Kֹ1<l^U�cG�����8��� ǌW�C��9��_Y�cG��ma;�f5�� f�vh����OLW�X�X� ǎ��sA\NF@��s��(�1�h�is�/�jk���8�!��8v�[��''[)�� Ǽ��'	`�"Y���>�H֮(��g��T����+p�U���p쒸�0�1�̹0��y�U83:�4�q�A�� �`���+p̖@[3f�8��W��%}�j���Js{�� ����]�8��]�8��W��W��se s�N����0���h�� �� �^��wY�c��~U��E�W�X{�^M�c�~%�=���]�� ���?E�c�(�q�.�q�S�+{��\��[���5B���=>W8�)�_��� 	t� sq��d�U��2�A��2ǡ�Õ	81��p�1��+p�1��p�1�.p���p�+گ@�٧L|?��c��s���� �A��s���o����a�Ȼ�0�k����O��G�ן8���h�?i�c_�>~� f�&�e�G�XS���K�o|+,v�?dI����;�z��.��h�ю4������=�(4 B�5 <�8M�qR��p�Z�)�z=r����]+�S�W _�e�c\L��5w�q����T�&0)ȸ�|U <�X	b��8d�5o�����M��h]��p}�>�� ��)�x��O"�8�5���O��� ������=�!�'p$���Œ'��8�9�>��Џ6�1K���� �]��)�9�w��{���1+�q�I���dr`F)t ������C�!@��qu�� x���ᜎ Sd�9b ׮S�Q�A�8E�Њs����\���%'I���#
p�:;U P� �h���� �h��O=�<�E9׮�<"7ΪC:�*��W*�ߢcj����I\{�x�z��^ !GZ��\�G)��8ҳ��ke�W+���␄T ��!y�n|�iyU5�
 �4�{L-��cݳ�F�i�P
 �X���R����a����t.���8��_����]��'&p<B�B7�.�ф5]F�Q�vA�W.�����	hz�_� ��0�@���k���W:�b�c�mc��7�!�8�
��W�##p�R�|u<J��� gH���0#�MI��3#����5������r�"6�:SSydn�S��:�	;SG�^'��Δ��#"�A�i:�)K�WJ���LBL���$�&(pͲ�|n�K�CS �h{�U�(ġ(@�Ya{�(
\k����8v�$�:k�'������h�?���Zģ$p�)Z�Og��s������)�(�k���~
��w6i~�.S�Q���z�����Бx�<Ƙ��v�KMR��kL��d����.5����1&�4���#p��#�1�@�~@�5�GB�_"����c�fͤ)	\�b�H	��L�p�T=c9r7H=e�� &K&MN��u�>b��b��1}�<�%�R��"���v- @ȱ��+,�	 �Xc�v(?���Pš����T�G'���P	 ��7T9%��"�4� BN�T��k�T�F a�J%i2��siB�sib�*�<z�.�4� �N�\�f a����x��@�ia�9�ת��z ��i.! @�9���c���$:�mo����k2�%@�i�L�	|�&3����С�'�E �1�GU��5�&+@ �&�(�b�s�B�F�|�	����\��t�B]�i���	�s\BQ׌�Y-��z�W(Gd�ړ���)8q�<��!h7}�ѐj���־��n)=d�l�Eu���;�G�+Qp<b~�J#��؜�	�ǔ�m�k���� aiJB����9%�8�}K��Ӂ-͇�d]OpY_��� ��tMS2j2���ԔNS����.I�}�
��"��QK�ob���3����l�B�R���렳�������TK3kz����5��U���Wu��� Eǟ�1��*��ê=JX1��U{��<��B��W|��{4��]pFt�W��8�����>�bcdDhI��� �:NqQZ��%����>�����>�A�0c&��5�L�L!��<J�����J�G���Բd�q�t���Tz$	G-�*��e�&p�,�?���,��
\��T�' �ß#P@(�M�Q( ���80��D���88�H�2�BP<�9*��x�c2�/h���d
�`�J�    �+tp��l���B�5�( �EQ[W��\�"�=_��� ��Q) $U�<�L!�Ɯ�J!I�j&S@8�#��N�uЬ�LIO��N�jVM�������*  5��+��U�* (5ͪ��Z�9b��&+��+ <��3��+����t�
QM�jj���iEAI��4�����z�<��\�P*�<8�&U@��m�Q* HŶ�H�z��Q*�f�&T@p�NS* 8uM�I�z�GM�� 5t����w@�T�i�}�#U@p2BQE!����* 4��W���#����F�v���9$"��Q) (���8��I2G��c���?@H��������f����IDMh3eL~��	m
u��\M9u;���O0�� AI��� �i*�M}���pG|�>aI�d��&�^�� 4Y�\֕88.։��'2v
�s$�(4k���+qp�������K��^���2ե_���$�q5�ѭ]
�_�����J�=Lz��I�pD��L�K��E�����[4�&=0)��ޛ� ��7LL|����&&>@̅�M�Qx�CX���#�ǖ�(8�z���8�zl���@�0#�%c���Ѽ���q��������

RP��;w�����:�7�s�D��p,�g�#,�P�Y�y�ԉ�gv{�. ,	[�H�=n?�ZND`�YƧI���O $���� $����tI]��� AIN�L]�x��E�HD�.L�t1z��� ��R���� aIO�P�&�2�";OG��Ф�LG���T��t��7>�>$!<ů|�� �)6NG]���#.@X�/}P)� BޤI5BޔH5���,��6LG{�`���cMU�@�s�Q��/�lL�j�r�ttCz�/�l���P��H$nCJ�D܆.<:� vC�q��h\Y����Lz�0ԥp:����I5��P�]��>@�wS�G�z�i�&;@ �C��*@0��*�D,���ґ�Qi�� AiHKdLCV%TR��]>:���!{%GX��=���!](�D��.�	���Y=����D���78����5�b<�)�Ԕ��ЧR:�X}����s\��� �IN��� �IO�P�$�=t=e:��&=e:��zʄ"%���)ӑ H�)�Q  H�8�}2�
I���������"�����,P�11 �#�?����8��1�zHD��1ё p@���H
T�o
��>���1��ܣJHă�@�"� �ic(� F��yG�����t$S#���#1��I�SP��1�l��D�F�!۟���$2E���vb�%G��P�q�?2���㺏5:_"��
~�!p@=m:2����?*���V�Ld�������L���2a*ˎ	��Ll��e�������TT�<������Lb���hZ�Y2"F<x2��C�x�dĆ��;S��'�+tpFt�W��8��ԤO%��&,@h�=����<,Y�X��>��
��.O�+@`��胉H$���<�H9y 2BMT�Ф��#+@hR��� 4�8B��d�@��D����@PR���L��=ԑ (�GHGT���M�)$M�X(2q F��$�1ڌ�
Y�M-�X#����˒�9�ӴH��H��Qf�L����� ()G�	�3di:J�S�ݙh�ǆ�H	���O�	 (�A�P�c�1/g�A��CԴKC��	����sbM�H	�]�jB�!�?J�����\D��:b��?�N�%C��?�J �!�^���3b�u&$@��!�&�H 1"Ɣ?p/ץD�)E� @��IGF� 5cUz4S�}�L��!(�����#@�Z�*=� �%��@���cIFMA� �0} #��c��D����Q <-��?
�'m��<��ij�)w���$�!f�b�8����0�d�B�����f���bp�q]���'
I�A���3� bA���3a �@���k.b�c���0���8�fd�� �Ќ�LG3 Q�1�&����)d
2��&�)H��P(̘I�p�3i�7k���_O���8~�����8|�\�p�=3����@���Z�;��y�>��w�>��w�<��wt<��w�z�/��$��0�p�D��0��%	 �Ô�%	 �Ô���p�_/� BP�ӑ �X0� 5I���h��������*{�������	 $�GLG&��$_1� BR�N��x�O:2�%퓎P �I��#@h��?z�NJ�;R� ��G*���<��L��d=:b)��� U�E���k�"oZD�-��X �f�U���a�X5�X ��^9w�.��ҹ�@��k�Z K.�ø�Ā�]�dG-���#���#��t�WrÑ X�G-�`��-t&@��+��C䟃f��X\Fg��?��3� ���f k�:uD�AƪI��b�s�?�jȺ�Lg�B�!�� XŮ�4.bƮ�$�qL/�r����S��Ă��2�  � ��LG�"J�s8r (��9 4LG��=��L��tF5A��i�� �IZ�#@x�����QS <-A��x]��
�m�(��ں�	@h�{�(��i��uG���H�.��i=�Sp0-9n:� ��%�MG`P��z����S� F�z�}��
@���HJM�(��Ԕ���̦G�q�q GԒ�#��Z)�s�8�#j�EvG Q��S�G�
u�2E*IE�H��S$����cp\�OpD����adI��8�V�Z�8��2��<�#j��G�%@q �kNM���mq �T֤�8 a*�H5u U��b���"�޽m� D�Xz���1b�?����T�&@��%�m��)���H���Fk� ��W�#@�*2PM�0U%�&p��zG� �zG���zG���zG����MG�c�������Z(��"_oa�����0�z�9D��B���s�R��KϚV7��Ŷtu�Hģ��"Q!V���B9���+]�%���B��R��Ko�X�x$*��+!*J�B,�뭁�B.��R�5p�H/�X�^(ĆX��[��,ĆX]��k�Bd�%t��W���t�b�kfs�P� ���)�ִ+\<N=qZ��.?��bq!��
��2��8��t��P!�J����ZŮ��9�P]v��w���C��{!�B>Rr/�Z�<nS���]Z�s����ABUr5�v��⏉��.H�JI{ۧ���+w�>n����2X�n�&`M��g���+�@p!b��k�w��K;���������fnbG,�!o�T���q8�T� ��j�s���'!3��Mo�@��P��5�đX+� ��!��e�O.���>z�}��V����v@Z.��#}�v�2��\
�d��B�>zUDzpk�3%�T���b�������Ζ�����K1�f� &����n.7\��m�a�4�4�7�?�4X�ٕ[q�D}�V����+��m�l.���Z�B��C,\���E�jfw�V�:Qm���R(Zi��2��
FOCbn0�=y��ܳ�]��܀妽킼4�Wz��b�`Q���&�~���܆MH�+�$�K&�e�Lд/���ǅ�P�/����D�K����Jq�֗LH+L�}��?'��Y��	ir�8t�K&���%d�K�8�$���Rf�}T��|)��H�K��/�`�~	�����E�R�3�헠(_
�,�^	���b_
�,6_	����wR	��x�U������%㐃/����5�R^��J�/��ۯ5�R�o��{)�,�k2����*A�`��\�F������,��?f�����+Aʽ��b%ܩW
!KY	�0����&S/���b�S	^]�Y���J��h�@&��DF)�RL%�    u�hM��Cd��h���4+�bL%��qV2ɘJ�R!��)� ��P��sCя��э!��WT�H���މ��R	gCG���TB�~H�LA����Ug%�ɩV2�Jh�/����T��Q�LH����{�J���db2��6u�.�59�J�'S	jr���l^*!Mη.�)�Mo�H��)��6U���Ԧ�`�ަ4����2�֖�`�{����%.���4�ڒ}����lK3p-Ki��O�fJ#��iW�yi�	�H�m�s�ə�k�7{���l��%�B�)�˨��#�v'�{h��aS��Q��Gz�0�y}�H/�S�fԤ�MP�)�ͨIO���K����1&ū%�f��3jһ�D��34j����+�34j�*4gʏ�QS�����S4jJ�s���S4j�[*Tg��4���
��������gJ�g������4j�4Oʋ�4j�7�%(��iԤW�%�s�i���	_Z�~�Я��g��4j�Ϯ��.NԨ)�2��iԔ�XԦ]4J�����L��%>�-���uUC�	hz���l������N@�Ӱ����{�Vd�턳��ڹ;գUAڄ�;K'��X���T�	6e\�ɑX�G�e��P���e��T,A���%|
X��(��2�C�d��e���·qe������M��*��o�� �U�v��X�.k��)��VeY�W]eت,k���B[�eJ�eؚ��K�2�Aj(ܔAP;���E� ���m�G@e�D�6A�B���&|�S���R�v��	iMd��uS!Mn>Y)����	_��A@S�a�*u�iJ:L�b�IPS�a��M�����-vE�G��Ä�$��ѭA��L��(U'�M�5���$�i��2	jڭ��_&!MTp��e�H��dJ��p�G��z�4��"A �LBڈ�7�l�I@��U��M���Ǽ��	jګم������o�$�i�~q�5����-�F4�4p�$��?�.�G'aM�L�)��6���A'aM�L���u��G�=��ktk���EX��[5�,����q�"��ѭ�<Y�}��cv@�l֮�)�����͂��������cDJ빋���?�'k��9?�X{��f�]�l/:�ٍx`�]�����V�%}+he7�l-X=�Ze�{������_/��g��e��"f�O�S����A��f�:�{�.RH-�˧QH���4�וm�4
	�j�_#��Ȳ]#�َXr��d��o?�%���=0k������Dw!;<0������ ��Y�w�����H�8�]]����Y�4�ƽ�/�c�26��]ð�E�!U߯�����,
�.T��W�=�:�������D�D8<�s9Ź��J�]�#?���ϵ�6�p��ls�:�Tp�q����Q���Ä;K|��s#�9�����h��T�������|�(���ю��)���1lH��;��պ���#����س���9�m�5��������:,�ܚ��9w�ژ�]wn-��˔�Qp�a��{����lHl���T���k�(:�.�׆��;��K�Xh����t����W���;���t3���v·��xp�b�_:j6��CP� �A�/�����KH��D+����0D���ק��$��8�P|H@��=�q%�f�;D��>"�F��9��8M���j��i/:v��y !�;���Ԕ��%
f�*����^fl&�����}9��ҭY� �}f��a�cN��.�W�\�v|;E�!u�\��!�� ��lC79�S�͗	���|��!/����v��=�ni;�X[`�])���h��Z��rN�{3�O&8�~��lxt���?��yٱ�	�O���x�vr�ō��bֵ�h%��[������#�}E�my�#/�n���x|�928���3[���_��PvF�U���8�`�B�–b
�Rx9�H8g\�<Ō�-
q��y<���v�=ę�v3�6#�ٲxn���DB�%�!�*ؒ�-��ػ������=
o3z�k�o#6!Ӳw>!���N�"���J�P>�0�,{�;+�+X/HV3��C\UƧLV�m#���z�	.����J�İ�W�律��`��/�C�T�	���z7D(6F���p�����z�E̻�s���p�X)�&;�B��P>�Q��E��Y����S��E�w9L�5�G�&��dq�Oա�hp����@��ק�p�3:�O��d'�B�,v\�O!J�"Ӟk�,�U�=�dq/3��bp��Ls��>���. F��i����s>6@iA��. �E4b\ZN!vq������i���4��� o��ikB�;�B����C�6���?�͒�=�7��5"GPx�r�nQ#�X#��X�a���a���=�?�2Xl���sl5���"o��i�E��T�y;�O#�X7�ص�*֎����	*֏��T�%y;얈�b=����R�C����[��<�4��bm��a}:A����Þ%;A���C�t���&o�����&o�n	*֜�p�*�����R�]ƧT�?y;�Ow�dq�q���$�{Xw�J�,�I�X�d1�y��d�k����:��K��Fp��=Gu�K�,�9�\�Y�G�����i��)��kW��Z�C�~�퀫�<D�W��3.֯�l��g.b^�Ap�~��g�Ap�~��?��b��ۡ|�eH�42<�b��l�dq���2%�{��)Y����dqO�͒��?��2%�{�)YĽ��)Y��)Y����Q�(��1.ַ��g\�oy9t�Z�!Z��vȟAp������BÍ�y�bM�pœgY�YD���u|&A�z���$|�F�Z7���|��g2N������z����tL�Ӝ�7�ܘ�����굽�3
�y�i#cV�靧���(�w�6&f���y��#���<���@^П�Na-q��)Yz���xp�y9����_O�rX��/(Ѽ�g�!�>��P>sR�M��\bܛA!q���,Y���z(D��FĎ`�%/�A=}9�K^��c�/GC�1�h���}�"��嘨9f��u
b�"z�E��1����#�,��]A�"z�E�q,��]���"��E@)��=xa�H��Xn�,�>��X$�{l,�K�,b��R$���~\�dq��/�dq��/�K�,f|��!V��_v\N/�r�Ep9���a�v��^��r�t#/�de��oH)�.�<<�!g[�g�b�O6)�l��M�l��)��4%���B���J^�6��"v䂠s���G5��l��> f�C����a��Q�Cނl�}�pNL������= �N��!�ړ�G6���'o�s\����T�u(o�n��'~�C0�O���pdM������.��o��wnv��q�'~���tk�/k<�!����ɵK>9����뿣�>�p�9x�-8 n:�7e׷C6rD�s��3�hFB֫���z���}��!Z��r��pC�^����g�4�to����ΐ(H�x*�ɛll�0�=�)��%�;dX��Ѽ���e��e�=
��%���,�sɰD�r��Mu6؍|�q.��2�3�)�\�ԥ8%�hN�ޔi_ւdB̧5!t`o�����n��J<�P{"̭�s{ӭF����Ok=���Tky�[�A���	0���N�M�������!���<�T�N!��`$B1=��N!=Ĕ��0�C��a�A��\����������c�-��,�Y������� �xT��(�x4;2�٧��H��\�1���im���N]=N�{^(�X��r�G��ٟ��󎞖%�(��d��t��2Gn�V��Ѿ���a�dã�bG.=���<P(�����#f��:��G1���@o��=�>�"v� dM��c���)��8u�"��Xu��"�D!X��O��t�o������}F�|�P���<n�U�2    �����o�ۡ��Y%�(�ԿU�(���T�G6�S�R��$�(��U�'�@:�7U���\����"��(����=�7I�`G.GM�Z���[�|�X$@k�O��� 0������k�|c:P��OԃDh]򉊐X �K>Q�u�'���|��$"@�OԐ�h]�9��AqJ>Q�u�'j�Kh]�
�� �K>Q��'*@��!�DH��6$�� �?A���(mH>Q�'���O���F̧�w�
h���������yS����tD/�f7���<���q����1���y����:l���D;*4"���<�yx�M<����^�<<�'����|��"�@���d��sI>QcO�4�����(Ж��e
�%�DET��$����+Ж���ڒ|fcQ��OTHݟ �D�C|��$��~�0�OWԌ�>�c�1�#�D�C���H>Q�\�@?]��ȅ㨟���a\)���r�(�=P�o�����l�]�ʅ���|�2!�@O2>Q�w�'�'*"�$��������D�A�d|�� �@O2>Qw��'�?Qw��'��+.��'�'�
���#�*�D�s\��j A�q=���h=��Ȫ��O���D$�9�GV��Kd5Q	��GV��Kd5��(��n+>�	z�������ĊO|�^d|b='BA/2>������zN��^d|b='NA/2>�Z���?����Xk��C�'VZ���񌁵�����������G/�z��?��p�(f��%���R���}��#lo;�G����=�ݣ�^�����`���s:"�wң;����	5�"�4����sg��%�V�����j�g�{t-���	+�{3�G7���:V���������?/�e7����V b����<�y�8N�������C�������d�S�1d+�zYĺB܃�C�j\�A��h+1z_���~�O�p_=������F7�̇����a �A!w��s�G�fx��r���}Ě�����b��'��8��M��>�h�7���s���D;��yyL���!����v�g�#�eb��9�H}�<b�%�A�a��?�Y����	!3�A̩D8�+�A̪�7�+�A̪D7�+�A�+\�A?��;"��ϼ<�yx�M<�AM1v����QZ��Հt�����ءOh9���c��/�q����+���g^�<����l�k/bǷ���q���G7���r�(�.�<<�3n�ߺ]���S��O�
�q3�����`$�'��%��H�O|m��;$��ږ�#I>�-�F�|�["�$��G�D6I�'>��d��d|��["�$�ħ�D6Y�o�l0����`d�'>�M��'>�%��Ȓ�eD�S��Oq�n0����`d�� 7y2>�A.1F��Ǯ� �X�`��9%�?�w&��(��߯~�8ߙX������:%����:���8��`G&������7e{6�����}U��U�"�O!����Eo]����EȺ�`T�"���k0�d�\�55�J�)�`�8*����	qTO����Q	<e��Q�d��Q�d��Q���5-�X��5-�X�D6-Κ�B&��hq�2�F���q���㬉���p0Z�51�31F�|B��(�K>!�E���%��r���'丈u0��b[�:]�[}�u0�����`t�'�.�`t�'䶈u0��*��:C򉊑XcH>�B�|�",��'4\�u0��#�Ɛ|�"$���OT��:C�I��Q�Q1�`�;�Ab�)�PG.GS�OԌ�:S�OԌ��2�$���2�$���2�������`L�'\��C򉊑XcJ>Q�`,�'\�u0��5#�F��o�/�`HO4�
Bђ�	�V��%��.j!-���s0�'B~s�'�Q/�`HO��f�L鉐�L��)=���s0�'B��L鉐�L��)=���s0�'Bv2q�鉎l؀��s0OOD����}�����l7���<�Gє��-�`JO�ߖ��#��,�`JO�ߖ�s0�'B�8Sz"D��s0�'B��r��D�+�`JO��2qf�|�r$��<=��c�Ǎ��D/�e_2��%ڡ�J��yz��G2����}Iq��f�L��W�r4xjn�;rA8�2>Q�`�'�Z�s0���#qf��ڱ�]�'�B��"�7�`���s0��OԎ�9�%�F�\*7��Oȴ�`���s0k�?'*C�L�&�Z�s0�;��/�`Jw4Q9�`Jw4Q�`Jw4�q�tG�#q�tG�c�'��}�.$����O�%�`Jw4Q9�`Jw4Q�`Jw4��x9S�#���s0�;���s0�;���s0�;��K$����h�v�n�񉪏8S����B��.xGeH�����s0�̟�+���?Q9�`v�?Q9�`v�?Q�`v�?��H���e}G�x9����ʑ8����ʐ8sH>��H��9$���s0�����'H>�}��q�'jG�L�^kjG�L���<<N�'��G!�D�H��9$�v��hJ>�Z?�є|.���㜒OT���OT��9�S�D����B�H��9��\��s0g��Bm8�1�{��9�3�}�v$��\q�\��s0W�?jC���O�Ֆ/�`�8.Ԏ�;��-T��<��-�*�`J�P=�`J�����g���BeH�)��D2q��G�#���G�!���G��e",�v����?Z�����?Z������haW�	�|�z�n�|f�Ѐ�|�2$N3��]E�$,��G�$����G�;.��JX)�}aW�x	+	�Q;3a%�;jC�&����]��NX)���#���Go�b7N��|w-���<n���= ��O(b�%��e����!qV����3�V����3���G��ˣ�|bW��
+K>Q;_a�'jG�+�"�lv%��Y$��U\n�|��#��*�O�ga�'�������#�V�|�6\��g��;(N�'jGb/��w��g�/��w��gb0�*x����0�*x��qV��~x�0�*x��*qV��z�0�*�;�����P�"ê�^��{!�j�OhY�aI9�B�%��S.�a5�'T��ð��sڝ)���T�aXM�	1U�0�&�����v�'���ð���T�aX�AW��aI�K�q��G	����Ą&(�b1,�����H�;�	K�#��.�&0��9�r��Gԧ��&8����m҄�����Bd�5�D� u^�ͰF�I��K�gĩ4��B|�5�\��b^�а�YJP�+�hX�[:�x��L�1/�hX�-�=�:?��vȦ�aY���H�q�n��t��[z{T�qZ���hv���^Ď\��[z{L��8�x�m@���M��Fo�Hva�Ϯ��I�aM��J%n�Z�Q(T�a-�(���ݰ�d��R���%�F*�֒�B���kIF�;E솵$�H%v�Z�QSe��P�R�a-��FuvC{ɧ]pt�ԞG�Y��_��y$�P�����H>�G���!��n����H>!X���<�O�Q9���u���\��K>!E���!��ʔ�ړt���ړt���ړt�U���<
�)g8�'�<
!T�8�'�<
*�8�'Ū4A޺8ɡ=�6%�[��a;(�!@�4��H㔠m]����t���#�S��Gq�C{�l)=&=��е�u\��.%hR�B���)A���O	�ԥ���JP�.�#�̢x,�,C"���Ud
@yYZE� ����Ud
�jq�L(/A�P�h��"���R[��z� ���D�]��x(C]��c�s��`�Q�K]��ܧX#�r��q������!&��ef!lY+\�]��s(�����d��H*a�Jfq�Y���*�5E�Jت�Y�$��ɬ��T�V�̚.I%l5�,�I*a�z��R��kMUpiv���A3k�$����5�W�̢̬����EY	^M3�B���fJ%� f��{    (�Ԭ0k������v3��u̢ެ����	�ګ���J ��*� '0k��K1v�K�{�~S�"?
V3��F �YԜ� 64�(*lhf!x���Y��� 64��;l�Ea�`CǬ]�G :fQ|6�D�,*�F :��l����Pl�l�����P;mA�{=ة��ljfQb6���B���ӂ�Ii��X�➁�^3�¿4B��Y3)��%}��/��%}�{/�BkiN!o�	ZKs������g'h-�P]v���y ��ݟ�� ��N�Z:��t�DK���.�/�ң� 6.�0�ң� 
�c��G�ԖN�h��y {�Ιh��姓&Zz4�(@�5�ң�E}��A3��K�M��hfQ�:q����E��̉�����S'ZJ�YT��_��E�䉖N�U�R�IR����쉖N��vAN��e��;�e�]�?���R�A��i��.�\n���z�@Q��N��vi�r�=�Vo�n���,����rS��(Z:�Vo�i.�d}�A ˒Y覔A ˒Y|�U�G��E:`Y3��"V�hf��9`E�,T� ���P)�d��S�2`Ef訔A +2d��%����K�"��T���HU�M3� ��>�(� ��4U� �i��3� �i��MC��jfQ`NX��bOs��f5�$�U�,��I ��Y��ӟ!�,4V�$�U�gA�/� �d�ýLX�̢Ĝ����6��t_o� �d���J����J�I k:�Ĝ���60�;�l���I k:�����A�ۈ=خ�W��f���_��E:	`]3�
s��fE�$�u�,�9'�kfQ��0����,� ���W�"�i����,�v_ "�E ��J,e�3t6�>�"��,*�E �Y�� 64��`5��E�G�c��"��(3l��>�"�M��El�E���A�,��E ���i7\S��YT�� 65�(4ljf�׹�5�YT�� 65��DlifQh.��1���E [:f-�`KǬ���l���!�iv��%}-���C [�c ՗��3�68,ؒ� �/�)-?R��,kv���=�_ꏕѲ�`�����;G啂�� *0Չ-kvN�+��L��2�B�:7�e�����l�1=��쌖������O�U�9���H� U��􌖓t
�<rR�M]â`��s�`��L����0�a���]�����O�vɸ.ރ==�ۥ��6kfq����Y��8=�e�� S,kfq��`Y3k������ts�H4�8jH�����\n�E3�m�D +�Y(4'X��b�;��f{̉ V4��iN�����o"��,�\�hf�ל�5�Y�&X�̶a.�)U3��D ��Yl&���άcW�C�9_x���f��_�P���l�"��{�C7qD����?�y�L!Z.�9<<������t]o� u���K1����.մ~1�� @���]TV�i���Ξh��l�e��N4��tt��%�Fn::g1�h�щ����\n,]q?�)C��hň����~.s�H�
�JD��ݖu&D���mf�`�R�Z�@D�ܥr�2��yhfweW����fU'5�G�Y�	a�BD�I#��9x�-: �ѣC3qD�nb?�fd��t�+v��pC<�9�� bF��y(�Tbf�)�����CQ���No�vi��6u��%8����2��c�LZ��0�kq3����b�f�%�)e*q3���b�$nF^�YLR����f�#q3���b� nF^�Y����K3���yif�����S\�`5����(�f#����̢�$nFy4���Q�,�N܌�D��3�<���_(Ј�])Tbe�'��cu��SP����(��S�����(IfS�0V�d�$�)�c*q2��TЏ��_#��a*q2��T�Y���(�SA@�'��d*q2��kA"�^NF�s-)V�d=ׂ�L%NF�s-��T�d���^��Q����Lm���R�|$FF�q��|$>F�q���$6FɊ���(Y��y��a
A���#�1JQ���$6F)�U��n
_�o�ق�am�P�9!h�n��2���tSo ����.�yD�u�&{�s�̢�$>F)�Y��D�(U3�B��jfQH%�T�Y��~9��̊2�8��e�F��k
I�d��c�$q2J�1�B��34�(#��Q����L%NF��
�2�8E{+�V�d���@S/'�4�,$h*q2J��B!�'�4�,Dh*q2J��B��'�4�,dfjw�,� +q2J��B��'�t�l2�,�kfQZ'���	@��vI�f���kt���O�+��*q1J��!���8�C6!��yFs��B\ѡ��q<ѡC	�C<;s�!�~
�{u���,�+$�E���g*1/J� >S�wQb?e�J��2tT��c�Q���Xe�,�\n����	�2�X��Uo�d.7�)k���pY� 0S�uQ��QP��ĺ(S�(�"%�E��FAݮ�LY� 3S��f��-b]��W�SR�S���r�r�����y���z�Ts�������L��P�a���=}��e����e�XeifQD�,�,֧����vӭ�`��Ts�[����uQ�}�K�.:f1�^�E}t̢�$�E}t̢�$�E}t�b�!�E}4�ô�(X�PJNw�� �#�E}t6��%�.j�5
� �EMqn�P$�EMqn�Ȉ�"έķ�I�}T�ķ�I�}�ķ�)ίH�-jҌ�ʼl��4�( �mQ�fOl��5�ج$�~�8~�ٷ5l�g����&�FS�ػ�6�5��^kV��|�-X�w\k��9���p7E��p1��A��D�@LnQ�\c���VL�mQ�x`�k��Q��e�v��ův�;��v�;3���&*�;��;�S�����}������3=�s1��gz`�V
6�Ϣ�,c�w�>��������q���s��'��?�P���?��~���I4��l��Z�3V�Gh�[_�O" XS��_N��Ʈ�����$���3/;��k��K �F�e�>E���謅��{�+5~������7@�g��
�?��z���!���Y���p	=����(��;�O��C8�s�p=��#@X��C*ǣ���G���\kw�̆@1�3A�n�q�K	֯��)��� �ZG�.7$T���؎k�)��Y�ۣ���ؐP1#fq��}��a����أ;7��Gw��c;.s��Z��*W��G;���֘;\�M��1w�ƐP1c��C�n���lBŊ�����+��*V�./$T��;\MH�X1w�((,VL�}|q�b��`Ɗ�/�	+�Ͼvh�'&оvl�'fо���)�����}��0q���/�)Ĉ^��P����kb�׿�|�J!.q���uo|��!�8��S���8�7��Su�V�CL�E��B�,���d_��$��cR��E|�1)D�"��p��,c_�:\Z���s��e,�	���#����{�9:�BD[�(DA4������l"�dA4�����؋"��"6�.E�h���,Y��L�H� �C,�El0\J(��I%����m�V�!v�,Er�M%�i;���g�����N��*)���k��ԅ�R%����VI!��+U"��+U� ��J�$V�$q�t��"�>�h��E�qF#�4�w]���eR�e[#�H;�o.aE�|q�+M&�]�5�J�Iqo�#�Iq�m�eR��]#�4�wu�+]��	�l��X�஛e,Z���]�5BK��8��P�2w��.]��ۚ�@�₨3�(cqA1�B���Q�.C���d#����g�a�X��Ͻ�n�g��rng{�t��h�^>��2z�CT�ZG��O'�����	'cE;D��t(l_�N(9
�w����g����	#3�n;� 2c�v)�	!3�nW2� 2c�v)��s���Rt1w�J鄎s���N�X1w�J鄍s���~��bF�X1w�_#`����暢���k��b�vu1.*V��.    -�b����b*V�]��፮?1w�p�������a�_�ܙߍ�?1w��7������`�.�nW�Pt1w{���8遾>*�'=��G�����p`�'=�Ӈ#�KW~�ps\��M��.]	����ѥ+�|
1.����A!����/�08�cR�q�|L
1.�`���	����0#�L2�p~f��^q��Ĕ˃C�L��I�lQ�q�{P�+�{���X��$�HWZ�$����IX)�{�������2��KD����R"���8	)%"y@6�����n?�ؓ�r��C�F��<ļ>�t$/���ӑ��gPNK�r�V��XcMz�Zc��4	&5fp/K�PRc�P��x �c�I�G"�:��x&��"��CP���ѷ�E�ha􁻼-E{�F��+h�����
��E�h��#y<Z0ɋ��"�A9^A0�Ƌ�"�A6^�P�a���<�E�>,���8�A�#=N��/�H�� ���0"G$�/��������E(�S0~����!��p2����rJ^vU��g�� ��rK��qG�2��\3&懠r�Jܜ�����z̽���;n�$�X/�����J1�>�)Y�ST�˔4�A�bJ1>��J^��� �X_��@.3S$�ч@3cyS�[�?{�o�)�lf,p�*�n��h�GNQ��r��H��}G�S��tb�b�և�;�>�ت��!謸H�����Wi#���{_q�6�*����i���	�x�Bm�T:���0q%�00o�9�x�����N��#�LMt?�X��N�G�_�x�<�Hd��D���T�a�>R�+: ���⺍野�G�a��%�]�nL.t,?��ݘ\�`~$Y�1�����&����(N��ݑ���cb��!}��8�~�xDo4N:�9�����G�chރ��#���tT?�L� 6֏,�&�M��#˴i�I�,9���	���th?r\ʍwI��#�|���G����*��~����ޏ"�����G��cg{���[���G�ե�%��X^2�=`�&���ѡ��G����	D���n��1��=���1�#���y�N�G�q@]Lt�?b�c�����1����c*�q��}���8�F��t�?b�c�D:���1Vb�Y,v���(�N=�x������t;�@��!펑�G��!ҙ���Ǹ�t�?��1�!��iy�qH����k9��_���t=�-���!mO=��g\�EHg�C#G�/�HH��CZ��������|H�c�A:���e���~�HG�cD�����H�3b �oD	t�?�2�_�'�6��t�?�2 �i��H'�C� ���Q��6Ȉ~��̸�я���AF���!m����Hd�>:�S�'����e|�-P�2>�o@��cƍ^#�ѱ�X���7���%xG���X�w�N���#;t�?�Tf;:�B+3������!������0ˌJG��C�eF�#�n��0�\Vl��=��Ƙ#�|d=�o#�|$��>�8��i�8�La�-�y�~7^�p̌�FL�)$3#�`
�̘o��I(ʈ��]H�x+�f�x7n�f�x7r�f�x7�f�x7�Z�w��$J�LB��3�0�2����CFQ#V��~�8j�0�l�(jD�r�c$4�L9�1�f���B�e|�0�����"0��OT�D�Y�'JG�	La����S�gF&�T�)�3�Y`
���dD��a�S�!c�e`J?d���v�'*C��"�D�BāYd|�v$���2>Q=y`V��ú拓w� D �U>K@�H�Y��ԎD"�5�K��"���^2r�%��%�v�`�X/w����z���c�-����:�dYV�?��8
]�b��*����éfk!����w��fw�_�~��k?���t'�wx��wa)��H$�J �Eb	V� a�]�&?�+E�� s�Nِ0	(XS6$Lz"
����\�;�U2�)Δ� Ak�����%�!�+XSL��uC�6�k���X$�`M90aZ�J.t��,��9�����"�����)Hx�*90a*_�JL������_��!�1XREs�%b���z�(�%�4��%�:���0J/i����0J�,��9��K*j�D������"p�����H�wyڈ��%�5�8"�`�Ct�#��8D�9"�`�Ct���;X������<X������=X������>X[j�ƁPi�R�%֖�8�� �-r0�BX[j�`�����I$�~��y�}� �)H0�~D�v��w��y�<$a�Ct  ��8D���w�?a���o;�!	[������p;$A	{�p�!y��>I\-����}&��-h|@���y�C���G�[Zgߟ�y�C���G�[���=z��9D&l�y�C�����-��؋&l�yKp7Fh¶��ycD'l�yK�5F��6��Ǿ2b��(<�{��O�*W��΄���'@�?�v<c�'쎻����N؝wc'����1bv'����	��� ~1"v����b�����]R���b&lG].�	[
q���	[*q���&l)��bD&��:#4aG�Ё��	;��D�.�	;��D��'�u�'���'���'�պ'���~A. T���S. �����,�����.�۴�4H
s�a��*�<�O�R�@ĈOؒ!�a(l��0"�Pq�?l��?�
{6]�a(�}©q�Uf�0τ���'ԩ���>1�
�vb�0b����#6aW�~@f�	���2�^6a�`Fh��5:�2�Ȅ݋t ]�	�W逹0�v/�rav��.�ϕjD%�^���JؽR4����Ma�$lq�@K��$lq��J1	[\ �FL������a�$lq��B��qi���iN/�At�Jؽv����{�8#(a��^*aof�ON�#=@2q	[B@���-	!�Fd�X{ф-	!�
Fl�h#8aKB��]:��(w8�]<�3��� ��z�@�]@�3Cz��)<�[�gF���>3�?	��.����I �w�:L`P����9`���gFO '�(�g�0p���gFO 0��=�T�.����H��>3z|�~���gF�o"�oP����M����o�<a^@�3C�Y�����#���
�R$��
��?a
�
�q�w4s���g���i���uJ�:-[H���C��ւԨ�@H�[����C�����@H�[�u�uR��!�nA�] ��-�t�N�1ҟ�!onA��]�:%x�=��S G��] lO�;,g&�� �)q�q��� �)o�q���xC\ $�-Hw���;ҏ 	m�iH����NH� ��ꎴ$@�ڒtGz ]mI�#M	���$ݑ�HF[��H�4��-�D����G 9��-I�C�ْ(��D�ْH9�-�"D���TH9�-I��B&ْ�H< d�-I��B���8� 5��[�I�d�-I��G����F�B���F�(��$5��r���F�B�ג�HRB��Z�U�Б���Qu\��F�=tdpm�U7����IjT�DB��&�Qu	Z���JG��&�Q�+YZ��Fկt�bm���@:�&��y�`��*��C2�&�0rH��$=F�V��G�G<�l�Iz$�BH�ڼ�?��GR*�D�M�#I	!j��HJ���Iz$.�6���iP��G�VYN��F�VIN��E�V9N��D���V�I��V�CR*��鐔
!�iI�CJ����K%�!�BHPZ�/��;ғvل9�T�I�x�R*��]<a����E��.�0ǷT�g�:5��K,R�v�9��(v�NA��b�\��'�1z��u:�^���]�U����6�PY�x�C�	���	s�'�Ƌ'�!)!$    ��	sHJ�A��}"1hO�CRBH���搔�~v�9�����٥>F�P�t�o�����]�5EGB�.�0��BH��"�����"����ٺ_�vRv�H���Rv�H��)Rr�H���CJ�鐰qH��zW!lr�H��K�|�-R��!�f�4��Dȶ�"�.�m��p�a���G! �f��G:! �f��GZ! _f��GC#af����j�|�-R����0�E���6Rb�H}�uGJ����#���Ok���ގ	1ۤA�;�#�e�T����@mR��G�3#Όw�_��g�<- ��M��w�_��g�:3�u~=����P�<anR�y"z��*�5�d�mR����U�I��_CHE�&%��B2�6iє�	�q��~�#�d��h�k�$ۤG�_CH$�&=�r��Z��)������\C07��}���I�$5�T�m�#I!d��HRCH���QO!���Q�8�t	��,g���QO!��iQO!���������H�!��!dr�!��!�r�!�}ܐ���7rC�Ɵw��r4����VnH��C��{�!�)Oo��?�;��R0���.ō�ɤ9=)g�R��ڧ!�MO
!���Mo�܉?�l�n��xHkvߎ�Hmvߏ�Hov7��s�G���n�dG|�����9��@�tg�#s �ეg�;h ��L���Kh ��M���[h ��~�_C��p´�;�����?~�i_�w
d���)�!-v�:-q�&�N�L��t�>S�b�L�X�~�i_��w��)�b�n��?�w�&�N�6�ze���Y��´ѯ��L�_Ta��w�@.�/�0m�K~ ����L���~��iCrA��/��{�!��`f�r
~��i&�� ����4��]�W��-L��p�~Ʌi����H���H���Y��rn����y9����?�p#�~���H��_��7R��?�����	��ȿ�Ww�"�n�]�_�컑rI'kD��H���5�nw�d}�H�zo����)���FXލ��wW˻�Z��
aw��7�=����i���3vw#��wu��n�U�u�3�U7�ܧ�����>V�;iU���I�B�sB�܉h��# �#!�zԷ�����`:�`�>ǝ��i :�5�8P�o'��ă��ߕ�� ҫ��f$��z�$����Δw�S�-؛~'赵Nñ�ة��AI|�M��LH��Jv'6U�0,���J�%16uϢA6u���$��J�,"�N������0��9Xɵ�X��`%��y��H�C�yB�Ĉ=��`%F,���r�GJx�ɞgJy�ɞ�Jz����J؃-��y��]�Rɞ�JH���Y���[�gϓ%�?ؒ={-! ���lI�	�gvb l�ip�.!J��a[%�0�*Y�/a�w��	����yĄHS��]'¶�`�b!Lz�Do��!L2P�['�$5�u�!LrP!Z'�%	5�u"\�PQZ���,�OB"\�PQX'&�%5�u�"\2Qc�>N��� hޕ螅mI`�?�g�C���C��	��!7�Nl�qi)���C�ԉ��!.-�Nx�qi
u�#|�K�X� �C\ZC=�ψK�H�"�C\Z;�	��"��I��K�`�%�&����bn*Y���I��daf(ᦒ��I���J�&�n*Y��~C%[��$-�Hv���x�+�r��I����f&��*W��/.�r��I����F&�*W��DL��\��I�U��̜w��F&A�cad5ᮒ��I؄�Jf&q*Y��/8ᡒ��I䄇JF&�j��$z�%q5t�'\2Wq@	
W!>'���C�ω���A>'��S�/��(
O����ߐ��;'��S�/D�@
O���s")�C}�9'�³��������H
�.@�͉�����ݜH
�*TX��R��o^w�
�%�.Y����M�S\�Ԝp
�b d��S�:_v�ǻ?#F����H���9!>�(@<̉��� �0'��K����*�� @4̉�� �.'��K�XĻ��
/9b�r�+��ED�����h9�^r�"��Xx����a�K�XĬ�_*YX�/c�K%�� _*Yؗ�Y�Rɞv��`K%�PW��$_w��Yؗ�[�:_%9��t���$�·�YX�D\�C�"���B�ȉ��-n-�DNЅo��r�.|��0�v�[%��.|�da_x��B�ǉ��-n-b<N�E<��"���^�#n-8��7$`���}��b�q�/��s&(����3N F����5`��B�^��p ��a����'
#���T��0�È��E��@�*Y�Db� ��'#����?#M�`�&p h�Dc�� &&�ѡ������
��KcD��!_ǈ��Ü��33u��?^j�Ȉ��V+p��~C&D#�}����e��؊8F��f+�AhFH��/���B�"��w�<?�!���\'<#$߅�C���:9���>=yfB4B ���B�B	�� &L#BN ��@�97���Ɇ�B
��X�P���)��u�N��X�P�a�xY�Zp|�w�X��oҌ4+�҂��jD����f�j�XZ��c�o���>�ՈK���]l�����fR�K�s!�J�a�����a���I�o��K�^�X�Ф�7�N�5�҂��NKnt����F�I�4�7:��Mz}C¤`�w}��gt����O�Uɞ�()��]ߨ$)��]p��X�P��_V#���j��]pr�X�P��Dψ�������~�	k����Y���Ոj!C��A�F��u"<Dj�z]'�B�F���4^T#��X<��My�9�5BS^�=�h�Д�	�K,X��aw�X��3'`#�X��&b#��_2!���9�*1�A�q�×و-6��DH�z��8.�k�<� `#z�Հ7�kD���}yq������A�F��d��)�MuK�`��T<� X#5�uLl�ߐ�ֱl	�HMu���5R��cu���m���5R�-�h�w%�W�!F�Fj�>Z����:����c�����~'�)p��5R�sI���»
�5R�s{���¿
�?#�\� X#�1<W	���!�� X#M%�3�`�4�,���HS�~�� X#M%�#�`�4�,N�5�T��'�HS�����,�O�5�T�0.	�HS�B-�HW��%X#]%�����*Y��5�U��������A�F���g�]��Xh�	z��$X#��Wk�z^��dH��@k���5RhCx�����j���p�P���C��ҵb�B5R�V��)}+�� T#�qŀ7�jd�i��"5���4`���w��#�D�0+	���� L� J#���� ��$L� F#%��<�Bb0΃�Lݩ�;	�H��0σ��R��;��)1�ޑw��`{!9%F �:�H�s��B4R�\0����z����3z��$D#�߂��h��[����T�s���������7AOW��	�H�a!��!�� D#2���h�B��{c�o�da��
®�4R!���u��t�ai�+�m��F.�ba�A�Ċ��i䒄7�� H#�D�a�A�$��4� �L� H#��0I� �T�g���q���4r�da���F*d{3��-{�d��[�,�� H#��j��Z�[1^H#���b��[N؊A�Fjul� Hcju� HcjuL���9`AS�\0� ����� Hc>b����4�#V,켨��ba�qS=/XhA��T�Z�1���DjL��`~E�	*Y؟DjL�s� "5��`]�s螅yJ���g��T��=`\�1������H�9䜅�DjL���DjL��y/�1�%��uDjL�>`�S��`!�S��`��S��`�ĺ�P��%Rcjul    � Rcjul� Rcjul� RcJ��M��Ɣl̖ NcJ�VK�1%��%�Ҙ���iL�v�"�u�{d�H�1���H�1���F�1���F�1�߂�/�1�߂�Dg��|�gL��gL��g�� ��gL%a!�S�BXAp���.XAp���.\�Ap�/x��P����@SL��u��H�P����9���������*���MT�N��/D�O-�?�&9��ދ��]��hAޅ}_�������l����#(���@�c�_�z�g��%-�H	�F�W)���ꃟ��g���oҒ��`'�c}�Ժ������ϟ�.���Z�R�刺]�xp�[waߖ~@>çD�����o??���}8�mZ�����x������3��##���&~4�mI+ۿ�8�h����0�滲o�>]�Z�r���GàH�s��x`��m/.��f>
�7�$���6�j�AB�~5��0�����p����Mb83?4����2���w�f86Hv�g�<Z�l�g��z���rH�/4�x�����xO༫���'����M���I��Z=�����o_r�!���ە����.�8�G���>~���.;�;4Z]�������:Է9����Շ�l;M���~����Ո�� �q48���v �q�v��eGgWZ]�w�oxG����z�����p���Ngû:�;}�����߯[�:^�(���V�u١�5i�u١X�H-��
�za]z�
�ú�Б�I3���\#��xJ�I7�K�&���]��<�����;���ޅx�~I?��|h$� ���oY�;\2��WZb�4�"�IE|�qT�����Q�w���8��w��(*�����8
���"�8�3huG|�g��|}J/hyS& ?�K����L zN+�}J.HO�O+�U&�EGғ��J?�	��&�`��N��
@�%~]��	 �h�"�#!Zb�ZP��?�>
̃ط �SR���{!$R���3&�]�׏���d�;,z|��w�S���.���1G�&SNC��HO�����j��yD�4��a�L@���(�!�E�+%�!�E�+�g�*z�E�'Lt�X"�&�K,�"�$�+%RD��t�D����r�|Ğ�+%w��[��D��G�I��D��&��)~���)~Ė�-K��[��,�b�ا%���E����a�b�qoZ�H�#�$uY"��?;I]�H���NR�-��g��	�&��x$��MRqIP���.ⓠv7I]��̟U������$u��X��h��f�xu�]�z�͌W������̟��;�o���ͫ)�i73Jp�U��t�� wZ^�����������Pz;�V�w!
o���.D�ye�s���ye�w�����@���Ϋ(K�tÛWQ�8(���IK캌zۙ�Į˨��w��2jm�%�?ܜ�D��gS̫(K����WQ��)�������
�ye�Hѵ�)K\4���*⫠�v�������z�E|��i��*��-R�UPS[�.�mT���������DD5m��x?QK[�..����E|�+R�UPE[w���H]����"m�
ڹ)K�U켿v�"���eﰈ�cY�J�N!]	a"bB+~��HWBD�xD�~l�"]�.�υT�*�E�1�4%�?&\������o�z��G��~�|��EZ�����.�x�[�#�OA���u���o��t?岋$��>ڷH?�n
�Q��]�_7�gB�[��ݔ���?��cvO5��dvO��i��M!g���T���L��.�ȀT���L@T���e^Y�K��/�*v��T��Q��8n��%������H*rܔ�	��"9n���?���)��-q��r������D��n���H9?Ҕե�"�M���^D�j����E?�ǻ���"�[7i��{ŭ�ԥgJСk���T	N�}�g�>��&]��(����v�te���nmҕ�od��n��QPѺ�f�> ]լ�tE|Բn��QPɺIW�GA��}�_'�bݤ+�GA	�&U�>
�W�Ք�}4��WQv�QNC��y�e��z���G�!,���~dz-���N��g�2{�z�z���z���㈧�c��H<M���0{�����z���!J}���*��&�s�f��i8z�f�g��;�S�	��IZ��v�s�E�0|�I�y��y&�S�	��ڳ�oN7�՞m}w¾y�_0��'�pi�'�p�}�@�c����Y?$a��9�m����BY�m]�a�P~[�pX)���ޥ#�r�ۻa����w)��|��.E!���⸜~K���⹜vK���⺜nK�.BNJ����.N�d���v��w�_N%J��l9���@y���-�7%�wϷ��H����7$� J�oI���F����6nrJ�oI��nE��ߒs9͊(e�S�J�攴�)G%��7m�S��o#��Nɻ�.D��ߒx�oS5Z����)}�S�;��D��"��.��:���;�<O� J���qܻ��߳7�v�D�����J��=;t�+�R�{v�7*�����.TJ����ܖv��C�<s�	~&�%vd	!%�w	�t�w�ե���M���R�-H9�]]���(���KWe�wu)⒣���.E\roVw��ۡ�����i�CY�-��0����u�4ҡ����������ۧ�%��x7��e��``��(���%D��-(� �K��C���q����R��a����wG�N�J�����6~��;�"����%���G�igC)���y��P���8�j��FZ�F5��߻�ۧ������Bs���<��>Mhn������?=h�2��<=rq���T=O]��27�_��c���M������i.s���=zqZ���B_��17�_��v��8EYqf�un���W��<���ԙ�s�<qDǻ�!��	}����'N����g�<q���g����M��3d����?q���=��..7�_�x;���M��crl☼��z��s������9�Wn����*7������U%H��ꧭJ�Y7�OW�|�Ⱥ�~��$)�uC��KIR"롡�0%I�$[sڡ$)Q�zN7�����!��B��9�P�4��t�{R o�is��?>����N��P)���#?�芖؉d�=I���ӹ$Iu��sڒ��>��t��4$Iқ��v$Ij���k$Ik�Kq��w�Kq�Zb�"��$��)��@$Iiz��Iҙ��9�C�2=ks��L��tN[�I#���
2Ic��9MA&i�x:��Ǽ_����1Ig��9�>&)�x:���$��$���1Im$�sZy�w��9}<&)��qN��I�#��Ӥc��L�'�q��L�'�q�q�'�m��L�'n��L�'4n����*7I�J�	���ot���՘�A��9]5&i�T����TH
]NˌI:$�.�iF�J$��i�Q�E����H�>;1��H���H�?;1�~�g%N��"- ���(�"!�N��"-���(�"a�N���yb?i�dxN�"-��iPQ�E��9�)��H�<�=E�q-�9��]���۱H�v����th�;[�H�v������@�����4��yN��"�y���r5z����@���9 �ȁG;�.:P��h���ej<]���_x���L���5�.E�m�����i�]���^���ӥ�?�%j�.E��.APct)�/���.E��.APc4)��
� �1�Qy�+\��ƐZ��o&-����º��11L�\}B�	w���9M.EPC���3�b5�_;��z��5~�!\�����!��tC�$A����3q��@�it�Hq�{����~5Ǻ�x�lR�э��`��X�n����{t�0ؤ=ޱ���`�/�:�ӛ`������M
�"O��7i��<�oۤB.�Ŀm�Ut���ؤD�͢�u`���O�|�u��ؤD��9��>A�u��tؤC��9�6���j�Y�&X�4��'�/~*�7�Phi��i�R��_ݤB�m�S�I���D���U��6J��    !�n���R��6���!�n�5�
���f��o\
]?�{H�R�	��!J�gB�BS�9�3�]�y~�?{�UH����!�}Aվ=�BS.�	Y�
Mٟ�Ό�Nٟ�2������i��6�<չ�F�ۘ(���������{{H��ۘ�������6&j��!=�2���Cz$>*��!=���Cj�S?(���jQO����)QO��V��PO��Z��P��Gż� ���h����\���A��Ae�Ҡ%��riВKh���)��s�]�\���AK.�]g�]�\���A�_�(u�A����bww�_�(w�A�����v�A��%�6H�v�'��m���@a����RG�Ҡ�z�R���t�.sP�] T��Eʞ��O�?���j��t����P�͘g�zgt5G�]����&���"eO��P�nv� =>cv��2�`�,��)}��JdR���s��A�T砦��]��砤�.uP&�9�)���I����reR���q��A��C�7���Bٸ]��l�ke�vك�ѯ!T�ۅʬ_C(�K���O�4��0ٟ��.Pf�?�Ό�ٟq�qh��?#Ό�N���$4��Co��6'5�����I�:�"nsR"��%���I���D(�6�_���	"�	 Ti��
y��LۜT�{����B.�&�E����j��I���C(�6'�~�ۜT(�����3��5�w��zQomN*=Ջ�isR��^TL��
��C��T(����i��"�:�Z�N�'��8�P�<a-�`�r�NWR!��P�l/�`B����E0�	���BJԋyP�lD"X��ӽ�t�������rn�^$�R�M���!��@���`�| ��F�I��'��!��C�N6�L��<وC0i@��d#��*��8�(A���r��`$�f��Q�l�!�t!@���`҆ ��F�I�"�4"@)��`҉ ��F(��;�rb#��ꉍP�f��E0I	��E0iG��`#�$%��`#�$%��`#�$%���~A�	��`���~�h["O�,H�V��Q�k�#���:
{-�*ڽ��^# �V̡p׈H��s��5Bl����FL��~v�v��w���FT��O��\#,��'Bu��`��<�L��1.�Z����o��;>��}f�o�>&!�	�t�e�Ft��:[{�,e�F|��2Z#>��C%�����F!�	���Ŵ6��ݎbY#>��~��`ֈOp)Bɬ��R��X#>��e���	.E@(�5��g�Pk�'�hW;J_���'�3�.r�	v�}���Վ�V#6��%Bm���Ҹ իFl�K����	nrt�j|���Fp��K�U#:��%B������DՈNpq�P�j/��BšՈNp�`�"T#:����P��*U�Ft�K�Z�/�<a4���� u�Ft�K9*I���r T��	.�@�'���y�($:�]�y��������#-
ٟ0�N��	���\�����u�\�0	Opij��O#>�%S��O#@�%S��O��]�(�4B<����ӈQ��<�6� Ͼ?Q�iD)x'�P�i/�����lD)xop��L#J��S��L#J���CI����ɡ$���B�u��3\89\�
.�
.�P�A��4B�W���^T�{E�)�P�A��4B�W�X҈T�^�bI#P�{E�%m�aٔ0	TpI�҈Tp�PiD*��C��4"\�!T<�K*��C�w4"\�!�;�
.��P�hD*x�>��g4"�z�Y4�K*x�w�g4"�z�;�4�
^��6J�H��CԊ5�F�������x�7?= �:���ό}f����C<!D"����g�]���ྫy"�L��/�'�E"|�<a,��Ҫ��~w�[�'R�������G��oٟH��[�'B�\z!�"�Wpi���?��7D�a��[�� �
���AH�B<r	� $\!$O��>q�xD��ƸW��y�<3�;C�Y�2h�=���='\!$O��=�z��yN�BH��yN�BH��yN�BH��yN�BH��w��
!y"��9�
!y"�9�
!y"�9�
1����̸�}�v������o�b�:E���B�}ߐ�գ����sN�BX�w��8q����|�8ΉWi�6���jRHS��9'b!�W�8S�Z�	5��_j!�3�s�B
��i�C�B��@����M�@����bh�����B���ל��pi�`���5�`s�B�F%lN�BH�h�F��]�4VF�����Ԩ9!!�@�����!uhNCH�j����&�М ��6�(3s�B���:3'�!�K�>CC��VNן�	��i�a�Uۦ��)�+�8�OX���ɜp��~����3D�9�h�N����~��3�]lvKj�*�	i���@e���w�s����Ԇ9Q�҂�_NXCd?^
������|(sb�dc��JT�	��vM�lڙ�.V�Z���	nmk�B.'�!��5*���ݳ�0��개 ����(�r"B@��Z,'�!��(��qmr�J+'�!��5J��(��Fר�r�B[]��ʉsmv�j*A��v�(�rBB^���	vmy��)'�!��5*��x�ж�(�r��P���$�!��5J������ר�r�B�_�(�	{m���'���
`U�R~4P��D>���=9�!HuMN�Ch+l6��	�uMN�C����&'�!z�@ݒ��
i�pɉ~�^�4P��~�?��$'�!�'6J��臐�بMr�R�b�8ɉ~H錍�#釔���i�R@�q'!�!���� ��b9!)>�8O������� R���:"'"���C%�A�{�<UB D������+ro�X�	��!���Œ�V���~�@&I���[B4D�P�q'�Ep^/!"G�m�L�ȯ��;��*VZ�X��	!i=d5�;&/��cV�dBPDZZT�8Qi*Y�fBXDZwc�yτ��������F��c��q"#���B���{�'��ga^��{�sx�o螅�IxD��Y؟�G��da^ �����T�����w%*Y�I��da\%���MȄ,T�����Pɢ+^�	*�<=�bC%{:9���J�%�z�>S�Z�4���gT�0.	��P�¸$^"C%;!R�T�����.V=/����L�4T�81)M�,N�D��`�?�����*N�D�>`�p���VjU�����P���Mdo�=P���Md�W��8q�V�(�r�3V�&N�D���@��8�R�4Pp�N��5T�8�)uM%>�}!M�'RRW%%N EJi�@ňA��r�d�	�H}UU#�2�.�F� �,=`YE��� "��Q�d��B�8���@a�� EJk��É��� �N(E�(�pb)R�X�N0EJk����~C��v8�)����'�"%�5P��T���7���\r��~��D�-p81�T���Y����'�"����p�*r���;A�,*0������@	�Y�����pB+r���"'�"�q�a畼�3�"���Hy"u�yH�L^I��p�+�#aTR8�� ��"S�[�N�Ŕ��@��f1%�5P��ZLu�P/�DZLu�P��~C%�'��� N��T�$�m1����[L�r�<�K\LIs0�N�Ŕ<� �D]LIt��N�Ŕ����'�bʫE%	���,_Ly�h�(����� ��N�Ŕ��aߦ�w�R5Pz�/�1��l��)� ��`��|���	���� }�`��|���_c�Ҩ��'c�ڨ*�	����B��1%�b�	�������~��Z(
pB0f/�������{N����'c�yl��
�'�NB0���
��	��.f�3'c�nR؞aLy�h 	�}'�&�]IƔ���}'cj����15�VɉĘ�����ψ�ȉŘ��N0�"p �w�1� ����1�{� |/�1��:�S��Ý�1��� ]�dL�     1BLƔ� �����烨�)M$Ɓ%˘�Eb ��2��� ����϶��%3�=B>͘�Ib��>�S���U'8c��>�Θ�t�t�s'Ȟ=9f�3�:] ݃ ��N�I��1����hL�se��ј�Rb�\(1S�\�ك��y.��A���<�I�15�^=^Fcj�뛱#rp|�d�`���A���<�7�E
�y. �1�7�4 o�i̥{�dsH���j�y��L
��� LcJE��f9�J���<�ҘRS5���/)� (�)UU�h'��VTx�;��U �A�Ɣª�:�~Ie� �jL)�຃@�)-��7{F���A���*�%��*����U����i�d�N���4J�]@��(�z��8;�(Mv��A%}' � H����v���Hi�&��`A%L�8�4J��q�*i��[���4J��� H���fi��[ਃ �R�8�i��[ ������.��X�,<a�4J�-��A�FI��8.*A%EW�8�/�Q�b� i���_#H���j���4J
�`� H�0<n�i��;�;A��!h� H��%�8�=A%�WDs�QR~5�����,8f.1%�W�r�QR�5��I�F��d9�(� $��u���Xbh�x^ ����R��q�Q������^o9@��	ns���
7�%M�F���@���
7��I�F��LXq�����A�;��s��Q�e���iT�Y>�A��W���R�b��4*u���#L�4�u�4J�.�A�F��uN��ߐS�ha�nx� L�/<A�F)^�7�(���Ƌi��g��Q���a5%#s�A�FM� ��4jJ��,4���A�4j�s �6Ө��\A�F�J�'aU*Y�/�Q��i@�Fi��l�Q��%�i��]q��!S�l��F���AR0���aUrs�o�4j���5Ө��lм��� �%a�n�� L�����i��]�W�0�R�lj�]��
@�a�x!�� L�/x�i�� O�0�R��i䝠��J�F�K�Ti�Q�� U�i�TpP�A�FI	� WyF%�0���h�Q��4�x]�A��%^h�x�%^P� Bc��4�X��� ��g���|���3�#vL�y� v�N�3�#~,0� <cI[��3��X��b �4�4� 5�%4�t� 5��%���A�ƒn@� Fc��f����3� �V~������
3�X��T �A�����A�����x���-��A������ @c��|2�X�n�4�4�`#�4��[`#� �%�.�� @cI��62�X�|4���@��7� �h,eA5K�BP�A��R�\c���-�uW"�x� @c)["1�X��H4����� ��l!pè;A%� ��l!X� @c)[�0�X!�X� @ciUh¨�3�gaY�����`�����`�����`��4�0^@ci�`�������)��]��� ��l!0� @c)[�/������� �%=8� @c	]�/��XB��3�Ѕ���3��5���K��@��%�F zAtƒ��� :c��Q^�;A�.�Dg,y;j���3�<5���K^����%�G�u���T���Dg�R�b���˹�\��z��r.��X��� /��z�(.��X��� Dg,u����K�- oA|�Rw�[���	`{������h,����h,���i,�����D�W�jA��Zr�U�4���:qK�B�jA��R�$Z�;An.phA���rs�D�4֖�$Z�����̂8��h!0���gT�0@��X��!�4���`Ȃ8��h!� Nc+Z�,_Nc+Z@,��؊K�4��� �%q[S]࿒8�����+�����%q����W��9 x%q{�i �+���CN \�r{�i >+���CN ZI���T�$Nck�V��5�+�;A���<i�b��J�4�4� ��8�-�4�$NcK+��*_Nck/�UI��6=�Δ�=2!Ӻ.�SI���Tب|9���ب$Nc��6*����{��J�4��i�w#��خ����q��{�c
&q[s] ��8���.PMI�Ɩ\��$LcK�TS���n�WJ�4�亀+%A���;�+%1�?I5�+%![i E�q�{LR��5�)	�ؚ���hl�s3J4�湀�?#&,0�$@c���`�� �b!J4�d��%[3]���%4vo;8�%��������~�hl���%[�-�?i�zk}l�$@c���'	��J��I4�҅ {� �-�T�=�[��p=I�Ɩ���N������$@ck`;I���.�v��9[��$[�h��I4�v� ��hl�G8��$[K����hl-�t�hl��$[�B05I�Ɩw{��$@c�ýLM���.ٳ j� �-O� 3I��V��L����0�hl��@ä�oȭ&����w��I"4���@�$[�\@]���i.�,�w%*Y��ilMsRI�4�����$Q[�\�T�(��i.@(�wB?d��$A[�h BIb4���J����]`L��-�Y0&��g��c��hl���$A[�B $y)��<~@��X�#� $��i���𐼘�g�X�C�b�yT��=/���G%��b�yT�0-�~C%�xP�h�*�����nk���Ki��?�;�v�4��_� ;2�e���#/��u��m�e4�#��`y���{��F^Fc=�r�ȸ��my��(]&#/����d�e4֣.�����z��r�����\ .�2�Q��E^Fc=_�����]&�x��.�<E�]&�h�L�.��Y���]&�Ȁ%2I�4�X"��K�] !2�7T��0��K�] !2I�\��I��jp��L�/�=�!��ݳ0B�Lz�`��`��}�a�$�.�C&)��y�2�1��(d��I��F!�,D��2I�4�N!�L�]�2��H"B&)��� ��I
��4@"d��i+`��`)5��r�
�M��$�&�`r����`r��iC09I�RR��r�o�daaNR0mbD ')�R�`r��)e��~NR0������D�/d�s������}NR0u����I
��]H��$��.$�s�	=��|Nү�C0���$���,@Z>'i������Iڥ�.d�s����.��s�vi�9���]%�R�9I�J�-��s�v��[H�g��Ubo!��E�Ubo!_�E�Ub�"_�EڵT��B��K�ȗg�o�da`i��<��"�Z=�\x)��C乳H�V"ѝu�!���Y�Z�x!͝E�����Y�Z�~ ��E�%���Yw���A�tK{i G�Eʥ	/d��H�4�,ui��&fݟ�1�"��z��-Ү�',lЋj���	��)z�"���j������k<zw�����K伨��K伨�g�Z�B����[H�E5���.���khm��yY����{V�5���.ds�+��.�~��khmr�yi�54��o^Z�3E%��k����n�;A�,l�Kk��	/�m��kh�yۼ���.�=��m^Zc��������z_H��5�P�Iټ��g��H��"ӄ���H���!r��_�F�ȸ�&�F�ȸ�&�F�H��&S�	�ܤ`�}!���~C%t����YdKs�����ThnR0���
�M
&�kd:sߕ��<gnR0�y�ܤ`��B37�$����M�%I/�0s�q�
���MڥY/�'s�vi�	�ܤ]��B�27i�f����}����=�&��.ds�nIq���I�$��bnҬ���@nq>�bI�����^)c���|H��1D�p>�W��B�p>�W��B�p>��U?"�镖v!-8�+�y!/8�+�y!38�+�y!�7�w%�t!�7�+u�����:]��͇k���L����uB*w��    �ԛ�֔�rv�!՚�B�n>�Z%������VI� 9���?���~',L����]u&`O�}��'$J�l�|H�J���͇t�$f�d��r�����s�viC��� ���Ȥ�Aڥ=�I���K{"�6����Z���Aڵ���Ws�viC��� �Z�aW�)w��a�rW����LH��I����]
"6i���Hp�AڵU�R�t�nȄ���w�N�3�]�V�~��9H����]g�]����ܟ�=�!�.�ɩ9H���2����5�	hhHO��k,�А{���2��y��eO����y��erO�"�44d��E6�	hhH-M���ח!�4/���lCRh^bcY�xrB��z�ː���X�3^��ϴwR�eH�̋k|�x���3�]�w�=�����ņ\μ�Ʋ�x�!�3펗�C�*�:3�B{�Ő����X&�Y�yI�e�JÐ�������0�`�%5�I+C
f^Rc��[��4�+q�)�i�W��2dX��z%�.C~e:�$����W��2�W��^}ݭ��ڐ;�NJ���h�#�������]�{�3�.��b�8�@����h|��:�#�M�P9t�$W9��)w�z���tR%��2�9��.IjːŘ~'�M��IR[��tR'Im�I��o�!E1��I�R����a
[�I��o�!�0��I*���Id�I%�!1��0��2d �Kf�4�0d&�&^�!�0�̰T���$2ä��!y0��0Im�3�7�ieHL"3LR[���$2���2d&�&^�!30��0�����&^�!30	�0�q�Ip���e�O�3L�BC��aB�3�x5��'�&d�!�?	�0!��Ip�	Yh��O�3L����3L�b���+ݳ07	ΰ^�e��Ob3�s������/�a������m��fXu�
�k�a�[V��O3lu�
������aE�a�V�O�2����IP����!�=�ɰ��2��g�Ut�
��ID��nW!�=	�0Ij"ۓ���ٞd�Є����;A�)�֓����!l=	�0io�IO2L��ғ��*.CTz��9[��d�:W8O2L�+��'��!�<	�𧻭���|���j�&O2��n�!�<	�����B0y��O��}��2��8,�y��j��QZ�j�~���v���>�6>����1�8���k���_%��k�"�;	���d�8%�>��`[l��V㼣Mv0��pys���Z���e�N"-\��2D`'�.on"��%-\RU���$����-Cvi�
«�HP�^�DZ��N�Η�p��;�DZ��N��N"-\}'�N'��*YX�DZ��da2����8"�DZ��daSiᮒ�MI���J&#���B���JT��)	�p��ל[��da2lᡒE��`�����;A�,F�-\�b���`�����$��C�}-'�b�#&9����K�Pl�����[�zS7N�-\�)'�����-\�b�`�.��X�$��՛B4ql��M�M�-\���s�o�d�[xʞEpl�){a�I��Oٳ��M�-|�^V��͗��im�TR��m<����m��'�¿pZ�����I��=��)�ĝP2#���~��3�t������A�N�3�]�׃����?���~'@&�T�d
���
�&S��Vx� �M�*\2T���|�
��!�6��p�P�f��
��!t6��p�P�g��
��!86���\V�M�*\^�2��&q.*ChlW��ʖ!�5��pye�����D%㒸
�W�q�I\�/�,�H+|�d�$��wS|ؙ��6ŇIP��I�$��wۤ�2	���6)�Lb)\RR����T�LL�[E	+�h
W�	�I8E
h0M�)BP@C��^�"4������;*"*�{ѣ"�"��=*"*�{ѣz�7�v�kEDE<�"4TDT�<�e!�j?EDE
h���KT�����OQ�"?EDE
h��!(�!�SDT�����N=w����)"*B
���"�"���)"*Bڼ�7EDE
h��KT��W�!(�!4SU���)�*BsS��A!(�!�R/T�_!�RU��W��A���*EPE��b*EDE���!5�mm40z��rS����rS��Q�rS�t!᳍�_w���G���_m|�����o'R
��"l"B�{�3j�	M�Bҟh댿k���(&B�+6�+��������gd?"QLD�~D0��)�2#����"+C���y��k��)�2D����"+C���MG ���MG ���D!�Pv�!�bE�Dh&
Q�"b"4�(A2��B�����D!P/4��B��yA�(�&B^�2��E�DH����/�&B��~ٝ ��E�D�Z罈��^fe�݋����1��^�MD��	|�z����1�W^DMD��	��"h"$	����IB��.B&�w48���;
��"`"4���ima𪋀���Ǻ��imap���7t�¸$r"�R����������i)h���������D)x�EEHKA�c\�P��~߸�!��oB�R�����	z�¸$�"�����-B(B*�~mBRae�k��P�
~m����`9B�V�i-B(b�!���HMF�i-B(R�QpK�E(R�Q�K���d\�"�"5	`\B���)!��da;���H~cB��H�cB��H�cB��V�s,B(r�d�(�"9d��-,B(rȞ�[X�P�=����!{>_B�CLx}w�������
+�CW�P�TX�"�"�����!�n\�z�T�
�ZB��V�)B(R�*�kEE�[��Hu����Q�TX\�"�"�����A)VO���H��2xZEEj�
�V�����@�Դ\�"�"5m���HM[��*b)R�V�*�J�4�uI4Ej�
TN����U�S�:]�p�T�nR坠��J8E�J(���|�"�"���T�S����Uޟ�=�p�����Hu�������"�"����R/N�����R�S������i+x/EDEj�
�IT�RjepNj�o�� פ�Hi/hpM��L�g�y9Ş��Q�X�<^l�<��,R/6�E�E��Ϣ�Hu��Z�9�� ע�����85�xw�8Qٻ[�"�"��SP�\��[lp
���T�nA��E*�����H�,h������΂����Hy@�`�1)hl�z�����|s����/b.�$R S���ȥHb.r�A��d�o���$1�i,��E�Ejvvs��Ƃ�]�\���`iWݕ��Ys��Ƃ]�\��_0����T�fts�Rhe�����,,�"�"����\�\��_0����T�ps����` Wݟ���os����`�1)��ms1��
�ms1��
�k����B+��E��|�4��Z�\�GN��E�Ŕ˴������`�ֺߐ� vis1����.-b.�4�0��E�Ŕ������Ղ�Y/v15�������ՂMY_Lu�`S�S�/ؔE��z��\w��r1���X�_L�a0�S�AX�E�Ŵ����z�i�F!��Z�~����ȋi��!R*�6ng��n��^�bZ���(�n��y���T�06	��J�b+.��Y0�j�o�c����F�`�S^�2�ZE�ŔW��Vp1����ت}W"&+��"�bJ#�1U\L��Tp1C�+XSE����`Oվĺ��T�]���Ry1CLV�JE���Z+XBE���Z+XB��Ϩdaq1��T�_L�a��S�@�9E��T7f�z���.9����b]��Y�_Li#h0P�S��E���v|�����Cೕ�3�!���5
��bv1�`l�)as
��b��Ŝ����X�]�����)v�������i�^) �av1�5��;A AX����� ��E�Ŝ��m����Y�d .�E�Ŭ��!���emr ]j    P ��E��lP n�E��lP .�E��T(��z	��P ��E��T(��"�bV��F^�W�Մ����s5!~n�5�݄��o�s5!~n�Ex�\M�	��&D��]�l����_�6�;)�Zm<��]]����N��E�q?.�+����Ɲ�z���s�^�s��+ݪ�Q��4�w�"�b�&ʀ0�4QDAڲ�(c����7Q��W[�i�0���xۆ�;j�<EiZ
7�"��4-�hOQ������(��p-�)Ji?\1��7�/����(��p�,�)J�"\3�x�R���"�����E��S���p�,�)J�"�!�x�R�W�"���/����(MK�Xv'�/�;bOQ���E���(��p,*J�"\����j*���E*��F8��\#���p�j��E0E���k�)w�z����ez�N�E<E���0􈧨�����)�@N�E<E}ݤ�)�Ly�u�~�����	�b�n��;S��~ݤ�)�'�^}ݤ�)y���N��ܕ�N�LH��n��}��Ŋdq�.�)*D�8K�"Y�����pV.�)*��Y�����;
g�"��B�,N�E<E��Y����Ȟ�A�����=��pOQ!V=ιE<E�J6"��*��9�^��R�,N�E<E��Yb�x�Jٳ8����gq�-�)*U�0&�~C%k�x�j��E0E�n���|�x��w�SNU@��(j�%��gFQS,?�0��r_�tY�Q���3�.�0��N8]V�	r_�_��(�D��cFQډG�"�����EE�W�sa�Ei&
��"��4�saFQ��¹��(�DA�a��(��z1��L�~FQ%� �~FQ%�h�"��4�^�Q�TA�W�o螅QIEi&
����JA[1�\)��"���+U\y��?!
ҫ%��q=QK�+��DO��S�$���T�Ɲ��*�M�'j�
[���z�$z����5Δ���I+�ψ% %YDO�����L�_��
�&��oj���X�x�Ё���QK F%��QK 6#��QK�{������]�N�֏�w��_W]�5�kj�3~خ)��K����I��*Jؑ/.����G�%�PQ��$\b%�H�%�P�
�G�%�Ы��D���k�&�nY�L�!��e3�L$�ݲ��X&��nX/3��g�ݰ�Xͳ�nXDK��Ya7,B%VK:�O���X-鄿�z!���S�;/�$�~�;/�$�~�#.�$�~�3.�$��P7�W�oHZ�E�Ēꆿ�"HbIu��h$�����ϴ�X�z�_b�]�\��S,�$��`e�{,�$��`e�{,�$��`e�"Hbi�?{՝����I���6��"Hbic
Hr$��1$��XJ�A���ψ�
1-�$�WAL� �X��A+%�A-�$V�F!��+��#NIx�ʦ��,��X�tV#�+�0�?k�ԏ�?k��=LaV�Rl)�|�Rl),~���RX�"0bM������k�-��-#�[
�[F�)���XSl)��"0bi�	��֝��E�����y'��"0bic
|x��1>��Xژ^/��1>��X-��d�Z
����0���T�_<bi
G�"Bbij�`$HbiW
����Xڕڲ�X�D-X��~C�(l�E��R'
[g$���[9� ��8��� ��\)�t���j���S�J�߸��X-+�`V����󌿫S~J������MITĒF��sQK��YDE,i�nxg��|jê��gd��q�ET���)<����XZ>��qQ[˧6K�"��O�y��R[�Txg�5O�?��&*bk�
��l�"��O�q�MT���)<������}�?��&0b7'j,�M`�nN���DE���o�lB"vk�bx�5��k9�`���^��Cl���AIk��/�l�!��Nx0g?w�\Jx0g��w���)w�r)���M<�V�	�lB"��Nx0g�T�6���C&W���d?��&6b�J�!R'MOm�g�]�J�cR؍�Û9�����=<������v�ǔ��F��zO�lb#��{x*g�����a����Z ��t6A[��T�&Nb+���r6�����	yܕ����t6[�'<������>ᩜM��V�i�:S�Ū���r��$��r6a[ɽ=�Ly��^�لMl%��T�&rb+���r��?#�ޞ�	)�vI�k:���DⵜM�Na"�Z�&�bk_?<��_�bk�����Rl-��KrK��@
��lb)�H�)�M,���xg����ُ�����ڛ��lb)�< lx
gK�������Rl�M���+i����&�b��~xgE�[k��!
�+%��H�&�b��7p��	zYm���J=���L�+���lB(v�o�p6!��7�8�E(�׃�1�c	��@&�W�}S�8�@�]�7u�������}�ϔ8S�b{���H�~Y�]=��xgK��{��p6�����	�{u3��H�&�b�n8���~��̀�Ǆ���̀ϔ8S�����o�l)�oJ��B�&�b��Q�q�.��(�@�$Q��q6�[��9^���Ol�����gʻLq���l��w�0!	�ؿ��o�l"'�nr�}I���M����ػ��!���&G��DK�_���^�&Tb��}��p��$�#y'�K8�r����g�G��~$��x	g_Nb?�wr���/'��;9^�ٗ�������;S�b��xg��F?CO���I���g�g�<S�b�XaY^Tb?���U�}Q����O�'qv�mK ���~Fے0/!��Ѷ$,ŋG�gt��ξx�~����>Վ;�����e}Q�㸮��>�y˦DJ�˝�8��t�0��]RnD��6��s�q.��i 	�=�\�q��,{Ĺ�)a9��璧L$��~�<eb 	�=�\�g��z��{�@XΙD'y��@�͙D'�'%�B��/������':Yo�bn�������Nt�3��$��D'9��9^��>��D'Qϔ�S�bED��'F�S&bn���)A7ǫ]�h%��%O���9N�����f�>:I'j��}t�^����Ot����m����7[�x%v��t���+��������� ���2����7�os�x�r�B��q��e
��'^^� ���+d����+d�ps�x%�Py�'�Wr5���{�G�	"���7��s�%7>�� F}�|8'�N�G��ߜx�ꥁ��D��^�9A,�ꥁܛĢ��M�9A,�h� �F|h�(>������h?A���ށ8����Ⱥ9�~���dݜ �,�=��~��#I�q8'�?��;�us��#�<dݜ��GN����"�ȉ�@�Y�9q��9��#'N�7g��i <��zE��"
ɉ�@��YĢ���~Q�i$D�Ej	�7gUm����E�m���\D��Y�@��YD���Q�4���\5��&r��.B��YD���zs��"Ē�E�i��8gջ7��.�M�E�9�8�t"lNy�-J6����������p�Kz#�ܜr<�[s>as��p�K�ND؜�=�[n| ?�{8���4�rsv�G��n �����r��@��)�ù�Ƨ���S��sˍO6�|�B�؜�V"���>�{8wj$���@	��?|/�C@4�$�g������ߨ�Q|�~G��6{G��G�b����;���6�@Q/=}����Jx��3����Ϫ�T@���/��R�|��oTa�}%�0���W�<����TX��+{ E�oRY�����Z�A�s*i�5�:�!��*'5�_T9�f�j�.8)�V�Z�3|�V��:��a+{g��6��}x�m*,���Ra�?̤�v���]�)Wơg�}�tZ�)W>����r���Z�)X>���M�>��g<�����G��u�*�3�7-��(��+Z��P>��殮���3�����;�Z�ޱ�Ơ��;��w�.�ޱ���юDq�;vD�����}�A!��;h�z��G�?�(���3>�n�Dt���'RDg+z~bEt�>{�������kĊ�}��F����B Uױ[��    ����B��;ڱ{��F�X��"kĊձ{'#V���sy5b���m<^���m<�����m<����m<�����=m�+V��i��F;v��Vu�c���F����z��ݱ;��������z��݁����=m�+v�.�����:Y#Z�ޝ?r���;]�O�� f����A�8@4���q:��<G��C��s;N�=� z�"�A�8���n"���ƨ
E�cE�ŧ����ggE��}�[�]������g�((>m�*QP|����DA�a�XT���4d�>@P��J�����(��ݯ�hG���~F8�.v�+0��y����Fp^Tb��כ��t{�{s'BTboa���z}�a��͢����]�ŧ��E3A���f��LP�ARU (>m�$�������	�8O!�����f��b�"9jXPı�e�O�5�.CPď�D�!(>�$�A��f}���߾�.CP|z�It���DM���0�e�O#�/]D���r���4JNt5�^ɉ."G�,9�E��%���O3�DQ$臜�"��]D���q����<^��݉."K��8�Et	�'��0A[�DQ&�l��ŧ�q��ht.NtqAqC�P���ӻ8��ŧ5�� A�iL�����y8�%ŧ�p�K�Oc�D���"^����4At��bF�]����D��(f|/�%:�h�^�QD[D��Q�l_���(f�/�eu3ח�:���[t3ԗ�E��]���`_����KtY�"r}kXP��w��-("ӗ�E$�]���<_��3��3ɗJ3ɗJ�Ktق"�|�.[P��_�lA�D�#(�Q�D�#(�^���D�.�ql�p�-s֨��u[��Q����5s]D�����.�]pI\UA�qI\E�!���Ut�]p�[E�!��2��-q�v�5oհ��G�((���A%
�x��E�],*QP���E<|��2nA�.��[PD�E�e܂b>x�J�Eܳy�Â"�׼�DA�k^T���G}�T���{5o*QP��ʽÂb>S�J���.��.�������.��.�^�@�E<ڃ�"�W�Mt킫�&��v��`]D�X>���}7p]D�X>�J��~]D�`��D�.��w}����2�.�]�Wo��h�[3�DAO� ��v�f|^��v�V|�.�]����h쵇�"�{�!��v�^{��ő^y*Q���)O%�AT��D9�����2�0
.���3;�!�x��S���}�!�x����h��֧wXPL�����Hs���"��Ct킝�]D�`�;��"ND�.���E�6�Ct�}�]D��>u�|���E���;�E���;�E���[�E��{�U� �،.b�H��l.��h��m.⍈��n."����P��B��~ruD��rwD��ryD��q{D��qո��=�"����M�"���m�"���}�"
��ɍ��<A��H$�&��D�$�/��h���E<Q��~��$7�������3�o0�Mg��k>3,����g��o�?e��yp�o|�x`��t��sF�2#�^���g��t�?~��3����G���:�%x�{t�?/�ܣ��y	�����K���<�'�N�̢�y	�����K�o�^�'xq�g�X�t�?o�k����-x�<Ъ:o�����g����3Y������r�;#�Eu�̘9��������T<�+gT�[f�<|�7~d<��=<#�#���T=���x4S�|g����i�\�VUt<s��`Z�3W9�u<s��`Z�3W��g�6�Γ���\K��C��Z"O��'�
��<�V�0����b��'V
y�<��0����@��9O�2�!x�~s����"0����<s
����$0����\s
��G����o�|s
����(0���o��s
����*0���oiT���c��O|��.x�; ��t�����@xԸ�	��10]��d�.x�]�x�g��G.x�Q�!x?��<��f�@��3O�C΁�'�y�3O����!xz�S��'�zr�<�}`����m�;����@0�����s	���,s	���<s	��|V���9�p�(�F)�x�"�Lu��  �D)�>FN�w��?��çbP*�τ��� ��-Q5noJ6��H�f�g���+�H0�,L�9	斅�!+�ܲ0�/�%�[&���L���GKHn���6��o�G�D�H~���6c挷�#xB�x������,9��X9��<��� _�KI�7�
��}��3��7|�0��E�|��;�� C��S}&DN�w���s��7<�00*�1ɶ7�
�����;���T�}' ����"�D2dE�	+'��pw���T�wG��L~w�%���;�h �T�wGJ�L~w� ����":D2��QD����b�|�0nE4�d*p�(��#S�[G1o�)��u�FU�QDcH���"�>2�uњ�����8�NE%v�Fw���GGM7�
|t����GG�
|t�QG}@G� �
|tgZ¨Ď"�=2��(�W&S���"���Tࣣ�N�L>;�h��Tೣ�.�L>;�h�Tೣ�7j��;�hp�Tೣ�7r]fG- �
|v�ᑩ�gG��
:����T��QD�G���"�;2�wі�������o�pG��
�;��8�T��QD�G����J���QDǸ�:�h��T��QDgG���"Z;2xt���������5xt�Ց�����ӞH%v�瑩����6�LE�p�^�QDG�_Etpd*��QD{F�_Etgd*��Q<?��"�32x�2�NO��Z&���T�]�d6=�
�k�L��5|�00 �t-���d*�}�	��Rޠg��3L�\��2�wE��OĘ����9��#dV<q�'e>3"gT�[f�f��5?)��ٓh�2<=��'e>3p�.����_�G�D�s�O�9�0�#x��!����y��he�d�G�D/s�
����<�ː� .��
�<Ѯ�� .��ʩ���L_'�AtE���d5��h2y���M殓� ���P�S�y�n���MƩ�� ���0u�DW4��NV����:�+���+���+����+d���+$��U��(>���� ��Aꬑ� ��A欑� ��A⬑� ��Aެ]UAG1�Q�+d���+܆od.��h�3k�-��h"~���� D��h"��%�tE��X#_AtE��X#[AtE��X��:��3�L��c�<�B��,��c��rc�5DW4H�5�DW4��s�N]� T��M]� R��L]� P��z}G�蒕 ��A���� ��A���� ��AJ��� ��A���UAG7ꒋ ��A���� ��A���� ��A|��� ��Ax��5<�0�h�KW4�5�DW4��5�DW4�5rDW4H϶�>��a`@t�q�Fց�a�F΁�Q�FƁ�A����+���m ��Aҵ�k ��AD��i ��A@��g ��A<�Y����9�+D��+d���+����+�ÚU��&TbG�NN�;��^nd��h�
k���hV>u��;�]��A���M ��A��K vGq�]0U��(�P�Q����;��rB�CGq���(N�	UbG��j����(>��; NGq�}<U��9�B��_��!B��6���A꫑9 D� ���"d��jd2�}52��0ۨ*��A�9`��A���9`��A�9`��AƲ�9`������p��6j|�8���eF�EuF��g��9`���gƝ3��-3F�c�o��8��b��ə���{���g�����	�ό�3�:o��;�������n�3��rQ��>��9`ݲ>�I-7�)���w���N���d}��#s�2Y�;�I�:M�'�A2,��ߛU��� �	���=`�������O�|dX&x�Q�'� �  B����D.��G`��'�^�<kt<��j�X�㉠W��O��y��x"���#�F�Y�F�5:�H{5����Dޫ��5:��{5��)x�?$����':@��)xޑ3�:���&��O��XS�DH�5Oģ)x�Q$����':E�*O�dX.xZ䌷N<�*�Q`��iye��� 5.x�[$���"���,��_��j�XޯG�w5�,��#Ļ��g���]�+ϑ��V�!xN`A<
�}#yV��_��
��Y�F���>�8�m`��Ot��X!��!V�����Z����D�Hց�O��XK�DoH恵O�HOt�QU���?����_�@����ޑk��D�H��d}�7����ΐLk���E�������F��y�F>�%=�k���<���`�A�Z��Kz��j�%XrЃ�V#3�������&XrЃW#;���ĸ�	�裝O2%�>BB���`�>BD��z��#y
��#d��
��#D��
��#į�
��#�ڪ*d}�3$c��z?��y~ţ}�~~���G���<�S��[��Sm�x��#e�.آ��jd/�?}��3=1�Q�����h�M����>3������q`Q<�?}��1s��?}��,�G���>3"g�u���g����S��|Q��g��C2��PS#���O�d5�w�?�h�ޡ�O�������E#����>^hd7���'I�����D������O��9�����Q#��}�t=#��}��Q#��}�Q�5����{�@�)�A�F��-�9pFƃ-��kFƃ-�Q���3�uHF3��~�@2#����@H 5r�~��0#����@H���s��1b=�,�!D��q��1B=��!���o��1����;��-���!���l��1b����!���j��1��ʪ���^�5����������?�      E      x������ � �      G      x������ � �     