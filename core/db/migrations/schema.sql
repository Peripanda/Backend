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
-- Name: risk_profile; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.risk_profile AS ENUM (
    'high',
    'medium',
    'low'
);


<<<<<<< HEAD
--
-- Name: i_potencia(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.i_potencia(i integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    result integer;
BEGIN
    result := to_char(2 ** i);
END
$$;


--
-- Name: insercion_radical(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.insercion_radical(numero integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    temp varchar;
BEGIN
    FOR i IN 1..numero LOOP
        temp := to_char(i,'99999999');
        INSERT INTO Personas VALUES (temp, temp, temp);
    END LOOP;
END
$$;


--
-- Name: insertar_persona(character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.insertar_persona(rut character varying, nombre character varying, apellido character varying) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO Personas VALUES (rut, nombre, apellido);
END
$$;


--
-- Name: n_tuplas(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.n_tuplas() RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
    _ record;
    counter integer;
BEGIN
    counter = 0;
    for _ IN (SELECT * FROM Personas) LOOP counter = counter + 1 ;
    END LOOP;
    return counter;
END
$$;


--
-- Name: potencia(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.potencia(i integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
BEGIN
    return POWER(2, i);
END
$$;


--
-- Name: transferencia(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.transferencia() RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    tupla RECORD;
    concat varchar;
BEGIN
    FOR tupla IN SELECT * FROM Personas LOOP
        concat = tupla.nombre || tupla.apellido;
        INSERT INTO PersonasCompleto VALUES (tupla.run, concat);
    END LOOP;
END
$$;


=======
>>>>>>> f4a87e2 (Dev (#15))
SET default_tablespace = '';

--
-- Name: assets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assets (
    ticker character varying(50) NOT NULL,
    name character varying(255)
);


--
-- Name: personas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.personas (
    run character varying NOT NULL,
    nombre character varying,
    apellido character varying
);


--
-- Name: personascompleto; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.personascompleto (
    run character varying NOT NULL,
    nombrecompleto character varying
);


--
-- Name: portfolios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.portfolios (
    id integer NOT NULL,
    risk public.risk_profile,
    name character varying(255),
    btc_weight double precision,
    eth_weight double precision,
    usdc_weight double precision
);


--
-- Name: portfolios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.portfolios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: portfolios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.portfolios_id_seq OWNED BY public.portfolios.id;


--
-- Name: assets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assets (
    ticker character varying(50) NOT NULL,
    name character varying(255)
);


--
-- Name: portfolios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.portfolios (
    id integer NOT NULL,
    risk public.risk_profile,
    name character varying(255),
    btc_weight double precision,
    eth_weight double precision,
    usdc_weight double precision
);


--
-- Name: portfolios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.portfolios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: portfolios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.portfolios_id_seq OWNED BY public.portfolios.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255),
    lastname character varying(255),
    balance integer DEFAULT 0,
    birth_date date,
    net_investment integer DEFAULT 0
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: wallets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wallets (
    id integer NOT NULL,
    user_id integer NOT NULL,
    wallet_type public.risk_profile,
    btc_quantity double precision DEFAULT 0,
    eth_quantity double precision DEFAULT 0,
    usdc_quantity double precision DEFAULT 0
);


--
-- Name: wallets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wallets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wallets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wallets_id_seq OWNED BY public.wallets.id;


--
-- Name: portfolios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portfolios ALTER COLUMN id SET DEFAULT nextval('public.portfolios_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: wallets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wallets ALTER COLUMN id SET DEFAULT nextval('public.wallets_id_seq'::regclass);


--
-- Name: assets assets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (ticker);


--
<<<<<<< HEAD
-- Name: personas personas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT personas_pkey PRIMARY KEY (run);


--
-- Name: personascompleto personascompleto_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personascompleto
    ADD CONSTRAINT personascompleto_pkey PRIMARY KEY (run);


--
=======
>>>>>>> f4a87e2 (Dev (#15))
-- Name: portfolios portfolios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portfolios
    ADD CONSTRAINT portfolios_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: wallets wallets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wallets
    ADD CONSTRAINT wallets_pkey PRIMARY KEY (id);


--
-- Name: wallets wallet_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wallets
    ADD CONSTRAINT wallet_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20220511045056'),
    ('20220603204401');
