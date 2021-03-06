PGDMP         	                x            GISDB    12.2    12.2 /    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            @           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            A           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            B           1262    35521    GISDB    DATABASE     �   CREATE DATABASE "GISDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.932' LC_CTYPE = 'English_United States.932';
    DROP DATABASE "GISDB";
                postgres    false            �            1255    35522    crearArchivado_Ensayo()    FUNCTION     �  CREATE FUNCTION public."crearArchivado_Ensayo"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
INSERT INTO public."Ensayo_Archivados"(
	"idEnsayo", fecha, operador, observaciones, carga, "radioTrayectoria", "diametroBola", "distanciaTotal", "tiempoTotal", "materialBola", "codigoProbeta", "durezaProbeta", "tratamientoProbeta", "materialProbeta")
	VALUES (old."idEnsayo", old.fecha, old.operador, old.observaciones, old.carga, old."radioTrayectoria", old."diametroBola", old."distanciaTotal", old."tiempoTotal", old."materialBola", old."codigoProbeta", old."durezaProbeta", old."tratamientoProbeta", old."materialProbeta");
  return Old;
end;$$;
 0   DROP FUNCTION public."crearArchivado_Ensayo"();
       public          postgres    false            �            1255    35523    crearArchivado_Parametros()    FUNCTION       CREATE FUNCTION public."crearArchivado_Parametros"() RETURNS trigger
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
       public          postgres    false            �            1259    35524    Ambiente    TABLE     �   CREATE TABLE public."Ambiente" (
    "idAmbiente" integer NOT NULL,
    temperatura real NOT NULL,
    humedad real NOT NULL,
    "horaActual" time without time zone NOT NULL,
    "idEnsayo" integer NOT NULL
);
    DROP TABLE public."Ambiente";
       public         heap    postgres    false            �            1259    35527    Ambiente_idAmbiente_seq    SEQUENCE     �   CREATE SEQUENCE public."Ambiente_idAmbiente_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Ambiente_idAmbiente_seq";
       public          postgres    false    202            C           0    0    Ambiente_idAmbiente_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Ambiente_idAmbiente_seq" OWNED BY public."Ambiente"."idAmbiente";
          public          postgres    false    203            �            1259    35529    Ensayo    TABLE     8  CREATE TABLE public."Ensayo" (
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
       public         heap    postgres    false            �            1259    35535    Ensayo_Archivados    TABLE     C  CREATE TABLE public."Ensayo_Archivados" (
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
       public         heap    postgres    false            �            1259    35541    Ensayo_idEnsayo_seq    SEQUENCE     �   CREATE SEQUENCE public."Ensayo_idEnsayo_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Ensayo_idEnsayo_seq";
       public          postgres    false    204            D           0    0    Ensayo_idEnsayo_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Ensayo_idEnsayo_seq" OWNED BY public."Ensayo"."idEnsayo";
          public          postgres    false    206            �            1259    35543 
   Parametros    TABLE     �   CREATE TABLE public."Parametros" (
    "idParametro" integer NOT NULL,
    "fuerzaRozamiento" real NOT NULL,
    "coeficienteRozamiento" real NOT NULL,
    vueltas integer,
    "tiempoActual" real NOT NULL,
    "idEnsayo" integer NOT NULL
);
     DROP TABLE public."Parametros";
       public         heap    postgres    false            �            1259    35546    Parametros_Archivados    TABLE     �   CREATE TABLE public."Parametros_Archivados" (
    "idParametro" integer NOT NULL,
    "fuerzaRozamiento" real NOT NULL,
    "coeficienteRozamiento" real NOT NULL,
    vueltas integer,
    "tiempoActual" real NOT NULL,
    "idEnsayo" integer NOT NULL
);
 +   DROP TABLE public."Parametros_Archivados";
       public         heap    postgres    false            �            1259    35549    Parametros_idParametro_seq    SEQUENCE     �   CREATE SEQUENCE public."Parametros_idParametro_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."Parametros_idParametro_seq";
       public          postgres    false    207            E           0    0    Parametros_idParametro_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."Parametros_idParametro_seq" OWNED BY public."Parametros"."idParametro";
          public          postgres    false    209            �            1259    35551    Usuario    TABLE     �   CREATE TABLE public."Usuario" (
    "idUsuario" integer NOT NULL,
    hash character varying NOT NULL,
    salt character varying NOT NULL,
    legajo integer NOT NULL
);
    DROP TABLE public."Usuario";
       public         heap    postgres    false            �            1259    35557    Usuario_idUsuario_seq    SEQUENCE     �   CREATE SEQUENCE public."Usuario_idUsuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Usuario_idUsuario_seq";
       public          postgres    false    210            F           0    0    Usuario_idUsuario_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Usuario_idUsuario_seq" OWNED BY public."Usuario"."idUsuario";
          public          postgres    false    211            �
           2604    35559    Ambiente idAmbiente    DEFAULT     �   ALTER TABLE ONLY public."Ambiente" ALTER COLUMN "idAmbiente" SET DEFAULT nextval('public."Ambiente_idAmbiente_seq"'::regclass);
 F   ALTER TABLE public."Ambiente" ALTER COLUMN "idAmbiente" DROP DEFAULT;
       public          postgres    false    203    202            �
           2604    35560    Ensayo idEnsayo    DEFAULT     x   ALTER TABLE ONLY public."Ensayo" ALTER COLUMN "idEnsayo" SET DEFAULT nextval('public."Ensayo_idEnsayo_seq"'::regclass);
 B   ALTER TABLE public."Ensayo" ALTER COLUMN "idEnsayo" DROP DEFAULT;
       public          postgres    false    206    204            �
           2604    35561    Parametros idParametro    DEFAULT     �   ALTER TABLE ONLY public."Parametros" ALTER COLUMN "idParametro" SET DEFAULT nextval('public."Parametros_idParametro_seq"'::regclass);
 I   ALTER TABLE public."Parametros" ALTER COLUMN "idParametro" DROP DEFAULT;
       public          postgres    false    209    207            �
           2604    35562    Usuario idUsuario    DEFAULT     |   ALTER TABLE ONLY public."Usuario" ALTER COLUMN "idUsuario" SET DEFAULT nextval('public."Usuario_idUsuario_seq"'::regclass);
 D   ALTER TABLE public."Usuario" ALTER COLUMN "idUsuario" DROP DEFAULT;
       public          postgres    false    211    210            3          0    35524    Ambiente 
   TABLE DATA           b   COPY public."Ambiente" ("idAmbiente", temperatura, humedad, "horaActual", "idEnsayo") FROM stdin;
    public          postgres    false    202   �A       5          0    35529    Ensayo 
   TABLE DATA           �   COPY public."Ensayo" ("idEnsayo", fecha, operador, observaciones, carga, "radioTrayectoria", "diametroBola", "distanciaTotal", "tiempoTotal", "materialBola", "codigoProbeta", "durezaProbeta", "tratamientoProbeta", "materialProbeta") FROM stdin;
    public          postgres    false    204   tU       6          0    35535    Ensayo_Archivados 
   TABLE DATA              COPY public."Ensayo_Archivados" ("idEnsayo", fecha, operador, observaciones, carga, "radioTrayectoria", "diametroBola", "distanciaTotal", "tiempoTotal", "materialBola", "codigoProbeta", "durezaProbeta", "tratamientoProbeta", "materialProbeta") FROM stdin;
    public          postgres    false    205   !Z       8          0    35543 
   Parametros 
   TABLE DATA           �   COPY public."Parametros" ("idParametro", "fuerzaRozamiento", "coeficienteRozamiento", vueltas, "tiempoActual", "idEnsayo") FROM stdin;
    public          postgres    false    207   �Z       9          0    35546    Parametros_Archivados 
   TABLE DATA           �   COPY public."Parametros_Archivados" ("idParametro", "fuerzaRozamiento", "coeficienteRozamiento", vueltas, "tiempoActual", "idEnsayo") FROM stdin;
    public          postgres    false    208   Rn       ;          0    35551    Usuario 
   TABLE DATA           D   COPY public."Usuario" ("idUsuario", hash, salt, legajo) FROM stdin;
    public          postgres    false    210   �n       G           0    0    Ambiente_idAmbiente_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Ambiente_idAmbiente_seq"', 923, true);
          public          postgres    false    203            H           0    0    Ensayo_idEnsayo_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Ensayo_idEnsayo_seq"', 116, true);
          public          postgres    false    206            I           0    0    Parametros_idParametro_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."Parametros_idParametro_seq"', 14204, true);
          public          postgres    false    209            J           0    0    Usuario_idUsuario_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Usuario_idUsuario_seq"', 1, false);
          public          postgres    false    211            �
           2606    35564    Ambiente Ambiente_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."Ambiente"
    ADD CONSTRAINT "Ambiente_pkey" PRIMARY KEY ("idAmbiente", "idEnsayo");
 D   ALTER TABLE ONLY public."Ambiente" DROP CONSTRAINT "Ambiente_pkey";
       public            postgres    false    202    202            �
           2606    35566 '   Ensayo_Archivados Ensayo_Archivado_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."Ensayo_Archivados"
    ADD CONSTRAINT "Ensayo_Archivado_pkey" PRIMARY KEY ("idEnsayo");
 U   ALTER TABLE ONLY public."Ensayo_Archivados" DROP CONSTRAINT "Ensayo_Archivado_pkey";
       public            postgres    false    205            �
           2606    35568    Ensayo Ensayo_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Ensayo"
    ADD CONSTRAINT "Ensayo_pkey" PRIMARY KEY ("idEnsayo");
 @   ALTER TABLE ONLY public."Ensayo" DROP CONSTRAINT "Ensayo_pkey";
       public            postgres    false    204            �
           2606    35570 0   Parametros_Archivados Parametros_Archivados_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Parametros_Archivados"
    ADD CONSTRAINT "Parametros_Archivados_pkey" PRIMARY KEY ("idParametro", "idEnsayo");
 ^   ALTER TABLE ONLY public."Parametros_Archivados" DROP CONSTRAINT "Parametros_Archivados_pkey";
       public            postgres    false    208    208            �
           2606    35572    Parametros Parametros_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY public."Parametros"
    ADD CONSTRAINT "Parametros_pkey" PRIMARY KEY ("idParametro", "idEnsayo");
 H   ALTER TABLE ONLY public."Parametros" DROP CONSTRAINT "Parametros_pkey";
       public            postgres    false    207    207            �
           2606    35574    Usuario Usuario_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario");
 B   ALTER TABLE ONLY public."Usuario" DROP CONSTRAINT "Usuario_pkey";
       public            postgres    false    210            �
           1259    35575 '   fki_Parametros_Archivados_idEnsayo_fkey    INDEX     s   CREATE INDEX "fki_Parametros_Archivados_idEnsayo_fkey" ON public."Parametros_Archivados" USING btree ("idEnsayo");
 =   DROP INDEX public."fki_Parametros_Archivados_idEnsayo_fkey";
       public            postgres    false    208            �
           1259    35576    fki_Parametros_idEnsayo_fkey    INDEX     ]   CREATE INDEX "fki_Parametros_idEnsayo_fkey" ON public."Parametros" USING btree ("idEnsayo");
 2   DROP INDEX public."fki_Parametros_idEnsayo_fkey";
       public            postgres    false    207            �
           2620    35577    Ensayo archivo_baja    TRIGGER     }   CREATE TRIGGER archivo_baja BEFORE DELETE ON public."Ensayo" FOR EACH ROW EXECUTE FUNCTION public."crearArchivado_Ensayo"();
 .   DROP TRIGGER archivo_baja ON public."Ensayo";
       public          postgres    false    204    212            �
           2620    35578    Parametros archivo_baja    TRIGGER     �   CREATE TRIGGER archivo_baja BEFORE DELETE ON public."Parametros" FOR EACH ROW EXECUTE FUNCTION public."crearArchivado_Parametros"();
 2   DROP TRIGGER archivo_baja ON public."Parametros";
       public          postgres    false    213    207            �
           2606    35579    Ambiente Ambiente_idEnsayo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Ambiente"
    ADD CONSTRAINT "Ambiente_idEnsayo_fkey" FOREIGN KEY ("idEnsayo") REFERENCES public."Ensayo"("idEnsayo");
 M   ALTER TABLE ONLY public."Ambiente" DROP CONSTRAINT "Ambiente_idEnsayo_fkey";
       public          postgres    false    202    204    2725            �
           2606    35584 9   Parametros_Archivados Parametros_Archivados_idEnsayo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Parametros_Archivados"
    ADD CONSTRAINT "Parametros_Archivados_idEnsayo_fkey" FOREIGN KEY ("idEnsayo") REFERENCES public."Ensayo_Archivados"("idEnsayo") ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 g   ALTER TABLE ONLY public."Parametros_Archivados" DROP CONSTRAINT "Parametros_Archivados_idEnsayo_fkey";
       public          postgres    false    205    2727    208            �
           2606    35589 #   Parametros Parametros_idEnsayo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Parametros"
    ADD CONSTRAINT "Parametros_idEnsayo_fkey" FOREIGN KEY ("idEnsayo") REFERENCES public."Ensayo"("idEnsayo") ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 Q   ALTER TABLE ONLY public."Parametros" DROP CONSTRAINT "Parametros_idEnsayo_fkey";
       public          postgres    false    2725    207    204            3      x�m�]�-)���o-�-���E�
�e������d66�Z_�)<�!O��)����+��w��_�O����b��?����W�*����gG��߳������P]�Z
����+�P����yZ�r<]��Rc��zu�S�>N}�z��g���+��y^�X?�Ͷ*���%ԋ}��y�5����z�u{�����#����՞_��N]?�#���up&���OO &�=�����A�	��n�������	������Z�*�љ L���U��=�x�o~LP1�V� f0�N����~��=���o^����7Ls�h�͘	@o��j�������:˺�/M �Y3{��=/8>����	X �ߠB������ ���=�"��T��{�㪾�BQM@	���;�r��1����W���Uo� L���J�o~�60����w���=����M`�c$ ��Ա���g�7�������&&N>t�����=M!��YZ��%�;`��"�C`$`�#B���m�En�������� �Mɱ��2�L�� '��;}a�dP�8T��&Nu���A���^�۸�C/��ɢR�`���K4|fO.�ӟ��'��?kF �����|=!aˑ��D?��Rv
�jF�:�F�|Z$#�gr	u��t����v01�m���M���xT�gԷ5�(
ki���:�x��6���zF A�̡�ah���:0�A%����@�ѳ!�����C4���K yW͇xBɻ�@��%[�J�����Wɻ�,��|��Wɻ�����A%�A��w/�QjC�֪�Q��w/���K y��1
�w� �U���*y�H�ZF A{�P;`d��5#Р�[e5�!��Q2F��RW�!r_Ԛ�:5#�`Rk��	V�$X-#�`Q�PĿ�iF:u`>D l�dd���,�����D3R@���m��{���iɆT��H�ok��$تfTj�|�,�Z�$ �:Al�];#Tn/jF�:0"6��%Ѐ�{	4 �63"2a#�^Ȣ��T�Ȣ�@���Fm~!�5�d�K�:0�!v��%�e��PfD��N�d���A��zY�<`�E/���><m~���X�!��Rk~�	Z�$h-#��h~�$���<d���T#���� !���!�`P͈D�@�)�H0��n�/#�`Ռ@�E���ܖ`|��B�E�(_F
H͈�P���`�d����糽�~�A���l$з5��ioo˒D�Q�5�����$h5#���kW��8Ȼ�@��yp�w/���K�y��DW� �� ��y'��.�2	ȡ�@r����$�^�@��*�_u�C/ 5#�:0�u?ɡN����P;��ÓzI�.P��H@�k��n�C/��P;��R`�N��@r�%����H��z	$ ��9_�g_�C3����s>n,��d$n@���F�@�\�K��8�fE@\_Ɉ�P�C$����l	Vь4������dd���9_�����K5!�R��  .}[�ԒHP�5�!�+#��iF A�̡����@�N�y�	�"�^Ȼv���JF4
jnC>\��K 9�H@� ���JF&I`n�q��o���5#�:��?��}�Ēy;��<��6Yٚ}��K�f`�|� 9�H@��C혯�C/���K 9�. �@��e�w��c���_���4�^m�|-�`~��:8vS����`�l$X�H��5�uꖠ|_F�Q��Z3�=[�73�%(E22A�s趠���E)�v`�yݛ�����(�ہ��Uk��HP�l$�Ԛ�P!A��M2	�f����{	$ ��1_+$ �^	Ȼ���]� �
Ȼ�@��B��%��|$ �:i�����?��%B����dfdK ��K������(B޽d���A�	�_U���C��x�� �x���v�d� ��݇@��6���w�"�m�C �s��H��&t��	���@�N�;$�#!���`P����4�ԁ�m@�92Ң� �*�H��5s�kedK��f>ܫP��h)��?�� +#[��;����22�5P- ov��ڈ���
R;X���k�]���{	$ �^	Ȼv3��w/��];��J���K y�H@޵�E@T��zJ��k Qɻ�@��%� y�H@޽dKPɻv3P+y��-A%�^�@���Њ�Xɻ�l	*yW��U�3�mP��Hywq�@[�̌@����vPï� 	jφ@��%D A���#Y��͌@�N�٧�k����$ԁ9����`R�C�:{F���~���f�"�E�9�kfdK�>j�|��I��{�2�A�s(b+3#[�&ov3Py�	b#�^R@��j ��df�w�?KX���J޽�w/��]�3�o�7���]���ؤg�w/��]�3����{	l@޵���S��{	4 ���@E@ld�Kf��$ �:A>�߻�ڝA��p��Y����v�P{�wy;�;�*������m��oviP���  �J��{m� ����l$hԚF��HЩ5�!b�-#����@�A�C���:0�" ��2��4Xԁ������ ��� > �I��Y���]�E�����`�E�j�"!��%
�2�5dQ���36�dQ��H��,zI�.�dQ�h��,z	$ �^	Ȣ�?�	Ȣ�@��]4$�A��E/�dQ�hH��,z	4 �� ^����d�K�np��`�w�j o�MjF��Ȗ`��=b�7���l	�s�0�j �٤&	q>���a�� ��&=#РRbԚhPgF�A�̈H����@�N�_@�^�+��gF�����
�����:0#""�Y3��4Xԁ�q��������&Y5`	q}Ԁ�
	qɈ��l	���W���xIy;��<r�,2�%�gd�`��8��	"�"#�q�bA/���K 9�H@�s>>�I�$ ��9�!!.r�%��z	$ ��H��<6xn�[��}|Zm��h�\?ηޢ���>͆����I��̡���IK�N�����9��O4#22���ہ� �\�I�H�̡T�4�##РQfı��&$h-2!A��̡t�$�Ԛ�pB�Q2	F�$ԁ�pB��%���+��Y�y�ɂ��K�y׎�mI�����C�4���r�%�e����i�����z�y;��<>h��j�� ��zI��ȶA!�^ȡvh�4 �^7� 9�H@��|� 9�H@��|/��z	$5#�`�{���qZ�2%#��	>ʇ� �\���S�ީ��~����|륜-��o����Y���_�H Ձ�; �|M�P�K�|�ෑ � Ԁ~�� J>Bh>B#�<s=��E�#z ��0"�f �#V6�~���%!T���8��#x���� =�a`P|Č�G� �F�/�J �#$[8M�j �VT�3o>�gn���@�+ѿ �VT/����Z� �������=��w��3���� ��������(��� |�o �F`�`����#�# � ƌ�G� |��/ _�D�#$�j�`j �A��V��ϻ�g�������[m� �嵾l�@���� |9��������W��ܾF �V[3 _�kEpF����3n[�@������n|4s���6�����|�@|Ċ�F�/ [Σ�|�`o�Q4��F��̋���	���l�����X��18�m�J ��g8 �4Q#�<s�u>8É��|p���^^�3��`Ep�����:(�:�� |�`����g8QG�p >bP|Č�G� l�� lg�|������n�� �  �F`�3�T���3�Իp��z7 �pR��N�� 8�I����'��j�3�Ի�9�I��:8�I�@�3��3���p���/��N��g8i�^g8iw�'����'�n ����3���p��毻�N����N�]��{H���u�N���g8�w�'���8�I��3����9�ɸ�3����9�ɸ�3����9�ɸo5�p2�[�3���V����s�p >����3��3�̻p��3 r���_w�� l�p��@}�D�#4 � 8����o +��߃��d��g�|�s�8#&g��A	�����#4 {N�p4-�i�f��/���G� �G��2���6P% [Γ3��� ���_Γ3������ ���8������������GH �Gh� �\�U49�m`�sr�S��99é�✜�6P�"���T�59é�;jr�S�w����sr�S��:9é�����T}�N�p >b >bE`���p��������B��_����4��ƺ}��[�_��z�z�u�:#ԛ=?�����_}���:�u�@Q/�.V�X�����|�j���uz��/���X�����}�W_�~��_���|/�n�K��=��n��PW{���:��� ���f�8�f_��;���>�P/V/�~�ΐP��󡡮��ƺ=�B���=����͞��n��|����r�?K��z|���
�ux�٩����eV��[����IeV��G�����d����.�+�˙�Ȭ~�٩��qI���qi���5���Z�=Wuۗֈu{��+�_���績/����P{^bݞ�P�q�5��~����|�fu�������X��W��}f�/�穗PW{^bݞ�P��|�u{��z��{���<�j��*3�ש�P?�Ғ/��</%�՞�X��5��~�����_� �O�      5   �  x��W_o�6&?�އ"y���M�lK�:.�}Ql�N�؃�>�D:J7̱-����_Ϫ���Y��L)nڗ���h���n�����OJ8aM5�Z�%�����i�iŭ`˫�b�=�9)�*����8���.@�R�'�V'��'�6'Ćb��a��;��.~ٷ����o�]�yi��n�71� ��,�e����B��~�+NN�����۽l��vS̮?����B����2��K�H��#Zp� ��\��;|����N�	���x8�`@K~����n�Ɣc��c���G5�31.s�1Ԙ(����ʪ��:�F����aōfD��-CO��݄{�x1p�"�=��Q3�%s�zE�@
r�B�@��A_v����	�,�q#�MA֏�]=F�$A�uh*���B��$Z���Wi�C�Z��k�a�{v'k`cQ�HS� K��6���v$��}h�2I�>0ͻ�@򄂏7	}��v᱈��ژ�E���޻OJȢy�\,W>�����`�U��[!�d�T�yX)�v��v�;�C�v���ù��򝌻���f���]k	.�x�
�m����S�A��Pu3ڂ�!�P��bp�f?_�����[���{=���/�A��0�=1r3��}�,��C0�%�sڡ�1��A8��pB�"@Lc�hH7� ׁ�#��tj��«>�����]s�iu&/z� o���lj�$�ɰ��g�LhdHu�#A0�=~�O�a��:��欴��� ,�v^Pa��=�0�z�El��-��Wc��xc��^��H�O����.I�$N�&��!_�Yƒ�C����?*��I�ý'誊�y�L.B٨�<��绔o@��uX04:���'�T.�#,3gH�v��aPL6&��3��c�Y���S�n0�[%}��ǸI����X�����&8�qG#T)B��u��U:���+Q6uJ�
M������֡Ѳiގ���A\�^#|����*����!m��h��\�U�R����g���墸_-�-�U
��w���s��)�:oI<�<���@_3Y��`C&�(��(�|�R�Z�\)�����i���:���wѓ�.�X�a�F��1�欑�P�r wy����4�$�����hs4�`�Fp)��y��Xf�v_qg�^�_�N��� ���      6   �   x���Aj�0F���S�l��HN������1�B6�"�!��z�&�u6!���5�\�l�]���}�_��y{���=g,v��?�Ec��"#�ϟSX��|�4v���gc�����ѻ��~�y���t�������X�0�C��^�3���0��KC8�h�mGR�����nի+zw����^��ޕJ�?nF��      8      x���m��
��L-񛹜���"E!�����/;aK��`)�������? 	H�X����_"�DR)��� ���
b�s�}��5�٧$Z'
�u�'$�?����q�P;k�Z�!�_~�8�`�5Hr^�%���G��Jg��"}�������>;�B�#g�����۩v��E�v����vo9ɏc�\~ϙ8b%��B�e����[.���1��b�,�����r�{��|E�?�%lQ��%��(�`FJG���R	�+J%��(��{�R	�+J%ԯ(�о�TB�R	���=J�=J�W�
�-J`F���(���#J`2��LTQ��R�Q����(��Z�4��Fi�ō��K����(MьԌҔ�=kFI�d2qFi�&g��l2��4���)�(M��Di��=J�}E)��(%��R�Q���lF�R6��#J�d��l2�R6�����g��
ޣ��3J��C]Q*��.�����0E���S��a�o�0�7|��>L�D�>>L����S~Ç)�����9�re��!���̪i�8��gȦAs$l�@�$��i�����M ���n�p�3tS��*��j�����[q��
���{�nZT�bFoZh�����N���ES��蚔�c��oh�|�������,c�7D
9ߖ���J��� c�|ǁ���`�x:��v��R�wid�Ϗйo�g�~�]䑬|ǅH��Q�N��˸q�*+�C����Y�,�A���v��J��P��\���m3�eg�	�y�����)TN'����puL�8��晌��nwL(�`�/&�+g�m�~D��^8Trs�P���˰y|��b8t͕>��=$�P�PQ��X"?V^7X���Xׂ��nO��!�X�|�c1����m�yܶ�ݳ���=c�#C�L�x�³����+�*/+���W�!R�ry����L �Icɳ|�5�1��c��*��.q����v��H�_�4֑=��;lW�k3�`�ڇ�܄h�I'"lGq�|���r�8̦��A�)��J��SY@��C�(_��7�\�t0φ]�T��km�M�ʦJ~y6�����ΪX=��ǝY��6���ch!�4I�`�n��;��mǱ!��4��'j�<�2+��Jp�m�,O�[�P�����j\�t�1� RDJ��j���1�	Ɛ���J�����;��R��k�9�פĊ;�S�m$�U��Ù�3R��1�U�i5Jx)��0��mS?�"��kV�����gy:n��G�.�*'D��*�́S�rJ�A	��r6������+,�Lieŕu�%\^p�����.Ue��ͩj���ϗ�H�2��"�J��S�$Yi]s��$+e��&k�Fle-<d�e���Le-ű�DY�7��
��|�a��v��#k���7Fւ��(��p_d�c��=EY(h��C1�b+��4H֚�ő<\FVY�?:�Zj�yp�
ǱH�R�-�	r,�����g�9����Yx&�"k�����%�d3dm�3�Y�=�'@�v�I���[?б�n�	t�-zl� كcB����gr`d��ҽ(�'�DAdϞ����8&'B����,��w�+z�hԃ18� �N�_ �΀^ �N� �N�_��z�#V�'>�}�^������ّ��nl�I�i����y&[p��dFr�19��ͧv<��DF��gs cݵ��؂s'=���s'=���7�86��`���*|l��A���=�A�L4?6p��8s����{�c��{�c�`t���6aF�87�Lf��|wa� ��w�/�h�0Q�Qdۅ���Y[���"�.Lfd���t�F�m&
1�l�0����va_��օ��[f���T��C�E�F��(��,<��2�bf%�8�D���6��js�L�P�d�Ʌ"�X��a	tQ>`(r1�$C�y�fm���^\(z��P�����ج����b!p3�2xxP�,�h�E��
�(�o9_��@��-?(r���"���
_�ufQ�n� � ��*!�A֠M�����_�c0�O�5(~"'+��>1��,��1�AK�ĠX�6�O�1�䀝ܤyj~���W�D�V�I}b�ƀRv�p�f���t�"�s�{4J��!�S��[.�y"���B!���<1Ȼ
HS��<1(���<1��FaP��<1h�H(��	y"�] ���ܵ�8���<6��<�'`�A�x"'+?x'�,��b���}�о+��f��Dv7�L�e���o�����f�o�h��o����&�)�m����&�)�m�����f�o�hX��n�)z��h��.���M?�n�K�5l��07,��	i�A��Y'4��v3��o=jX.13?s��i��ܰnz�)�����8Ɨ�ᆇ�,�-6l犙��{���pX.v���悢���v--w�]�ki.��:��*.�X�&�����bᒳ���ˠ+.�<��':��i}ԕv.���2�:�.,
:��I��I�C^=\]aA���↨�@f�sZ�N�-��3�2�
:;��2��눃��c�uaA�uąAaA�F�9�s�h9ǝ�ˠ+,��9�`��w~�ta�,-��-�=�)��b;X�AWX�ss�bgI�.X,,���YR,�0V,�&]aA/��)�6����,9��_�i�|�ΒR�����%��� ��:v����ǎ��v�ro)T����$
;z�
v�j�daG�fC�Ǝ^�B��Z*Q�ѫ�P���WK%;z5
쨆J�hz��Ŏ�o�}k�Jv4�$;������ǎv!�������2�������PɁ���;���;�C%vt���În��Ď�pɁ�r�Ǝ�v9��������74.��PI�؁zÑ�t���t���4\rbߨ��.Q؁�JN����v`p�Dc�%v /"^����;08\��e��v`�����J6v���z����h��O>�!�cB����?�����K�@p�dc���;.�؁�����;v`4X��y/�v`�\r`�>�W��X_���cS�s��������1�)��9LѴ"�x.��O%�[ɣ�}=%�J�c��3������Z*Y������>�<�e�J��2�r,�T�8&-���$������֛,�j�`6LB��o�҉8�6v`�TR6v`�[�h"�7�b�$-���J6t`���'t��,�X�jɾ��_-Y�W���Fj�(�I@A��IƜ���j
%����-̐�b�IF�d�@})�,�_,�yP�h��A-;����; X�R�N��7=10�l(	�9�_,ى���gan�<��$Q3G3P2��Ύ��;34����"	9������8�C�a��o�D���&a���!�9�n��4 r�� Ai>�t���:��t�Q7@�;��� �n�d�_;G�E��5qt���s�!�T5r�A��%GCL�E�L�=��"�9�7��e�q������j*oc��]�1�Z.���{tL)N��)�+��y�d�xQq���zH��8uA�����m'/�!9���g-��=$�N]ГC�Ւ���d���zH����sf�=����d�L����l{8���dK&z��S~��D��izH6�Jچ��6Ά����=��.N�=�.���l{8eA��ȸ��d�Z���n�8em� ��O+�!�I�����Q�C��
{���.�{rHM��l�%
{H6=�=$��J���,I���tp��,�q���=d`���b�b���C��)�pO�|�j-is8���'�6ܫ��{� Y����l�d��:���I�{ȠZ����L�6�dy��!�>$�-�>9�⪵�>d`:8c����͇k�l�!�dK-es�Ԃ��Xl�%m�ɼ��������B	l�!��S6����%�pO�)��>d�4p�2�;KJ��CN'o�!�l�>$;����L��-n��V���],)� I  �],A��K��f�%mq��̹�(nh�X2B��:�:74�N�����bI[��L��jZ�}'���U,ɡ�b	*n�XB�m��)n�I+��Y,��7�~KPqC7�:�:�m�4��K7tS,���M�Qa�b����h�%�hl@�Z�46��o��W?:=���2��xWK�)���Z�46���I�������r	.l��qE��)�4�,�P� ��Kn��Q.��r��0J�\RՆ��)���t[�咦6�f [.ik�(�V\�X.��É
@?.U/� w�U��d��Y��`�%��%d`�%1�zIpz8�^�!�zI�� �.�@X� іK +l��K���N'*l��K���N',l��pIV��[�nU/�\¼�B�K2$[/ɪ^�!�zIY����K���dHNG�K2��^�رs��;@�R������)� �*�����v�󦪅����v�}S��p�T��웪4v�󦪅 M�7� ��*����$;�yS��(�J6v@�L�����P�Ko.�/�c���;�X&Q�E���`K%
;����j�DcTC%v@�O���rɁP.���ᒍ ��ް���Po*9��*9����H4v4K%'v4�K�h�KN��v4�%;�������__3�"j�h�T��rI;�~w�䊼��;T�5vt�%'vt��;�M%'vtC%
;����������!M�w���vp��;Ю�O�@�%'v��%v����PɁ�pɁ�l-9��;�)�w�����c��21ZI2*X'u(Y)2�jw��6�����1�2�      9   <   x�}��  �3CX~�����dn��R�0'�H�2��4\��|�,��ma�=m!+      ;      x������ � �     