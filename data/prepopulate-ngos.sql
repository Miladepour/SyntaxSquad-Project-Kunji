
CREATE TABLE public.ngo (
    id integer NOT NULL,
    service character varying(50)[] NOT NULL,
    zone character varying(50) NOT NULL,
    organization character varying(100) NOT NULL,
    address character varying(300) NOT NULL,
    contact jsonb NOT NULL,
    website character varying(50),
    email character varying(256),
    email_status character varying(50),
    call_response character varying(50)
);
ALTER TABLE public.ngo OWNER TO postgres;

CREATE SEQUENCE public.ngo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.ngo_id_seq OWNER TO postgres;

ALTER SEQUENCE public.ngo_id_seq OWNED BY public.ngo.id;

ALTER TABLE ONLY public.ngo ALTER COLUMN id SET DEFAULT nextval('public.ngo_id_seq'::regclass);

SELECT pg_catalog.setval('public.ngo_id_seq', 1, false);

ALTER TABLE ONLY public.ngo
    ADD CONSTRAINT ngo_pkey PRIMARY KEY (id);

