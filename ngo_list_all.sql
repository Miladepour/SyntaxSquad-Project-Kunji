

CREATE TABLE public.ngo (
    id integer NOT NULL,
    service character varying[],
    zone character varying(50),
    organization character varying,
    address character varying,
    contact jsonb,
    website character varying,
    email character varying,
    email_status character varying,
    call_response character varying
);


ALTER TABLE public.ngo OWNER TO cyf_bd8n_user;

--
-- TOC entry 216 (class 1259 OID 16693)
-- Name: ngo_id_seq; Type: SEQUENCE; Schema: public; Owner: cyf_bd8n_user
--

CREATE SEQUENCE public.ngo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ngo_id_seq OWNER TO cyf_bd8n_user;

--
-- TOC entry 3147 (class 0 OID 0)
-- Dependencies: 216
-- Name: ngo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cyf_bd8n_user
--

ALTER SEQUENCE public.ngo_id_seq OWNED BY public.ngo.id;


--
-- TOC entry 2995 (class 2604 OID 16697)
-- Name: ngo id; Type: DEFAULT; Schema: public; Owner: cyf_bd8n_user
--

ALTER TABLE ONLY public.ngo ALTER COLUMN id SET DEFAULT nextval('public.ngo_id_seq'::regclass);


--
-- TOC entry 3141 (class 0 OID 16694)
-- Dependencies: 217
-- Data for Name: ngo; Type: TABLE DATA; Schema: public; Owner: cyf_bd8n_user
--

INSERT INTO public.ngo (id, service, zone, organization, address, contact, website, email, email_status, call_response) VALUES (1, '{"Legal Aid"}', 'North', 'North District Legal Service', 'North District Legal Service
Eco Room No. 42 Major
Courts Complex, Delhi', '[{"description": "", "phone_number": "011 2788 74145"}]', 'https://en.wikipedia.org/wiki/Lorem_ipsum', 'fakeEmail@gmail.com', NULL, 'Not Reachable');
INSERT INTO public.ngo (id, service, zone, organization, address, contact, website, email, email_status, call_response) VALUES (2, '{"Legal Aid"}', 'East', 'District Legal Services Authority (DLSA)', 'District Legal Services Authority (DLSA),
West Room no. 295, Tis Hazari Courts, 
Delhi', '[{"phone_number": "011 2396 8052"}]', NULL, NULL, NULL, 'Not Reachable');
INSERT INTO public.ngo (id, service, zone, organization, address, contact, website, email, email_status, call_response) VALUES (3, '{"Legal Aid"}', 'West', 'South-West District Legal Service', 'South-West District Legal Service
Bruamette road,
Yellow Block, Ground
Floor, Chaplin Court Complex,
Sector-11, Dwarka, 
New Delhi – 110075', NULL, 'https://en.wikipedia.org/wiki/Lorem_ipsum', 'dmakalaa@gmail.com', 'Email Sent', 'Number not available');
INSERT INTO public.ngo (id, service, zone, organization, address, contact, website, email, email_status, call_response) VALUES (4, '{"Legal Aid"}', 'South', 'South District Legal Services Authority ', 'South District Legal Services Authority 
Room No. 3, 32rd Floor, Raket Court Complex, 
New Delhi', '[{"description": "", "phone_number": "+91 021 3156 2560"}]', 'https://en.wikipedia.org/wiki/Lorem_ipsum', 'south-dlsa@nic.in ', 'Email Sent', 'Contact Details Confirmed');
INSERT INTO public.ngo (id, service, zone, organization, address, contact, website, email, email_status, call_response) VALUES (5, '{"Legal Aid"}', 'South', 'Volunteer for Justice Foundation', 'Volunteer for Justice Foundation
A185, MLG, Saniteria Colony, 
New Delhi - 110024', '[{"description": "", "phone_number": "+91 555 984 70 06"}]', 'https://en.wikipedia.org/wiki/Lorem_ipsum', 'fakeEmail@outlook.com', 'Email Sent', 'Switched off');


--
-- TOC entry 3148 (class 0 OID 0)
-- Dependencies: 216
-- Name: ngo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cyf_bd8n_user
--

SELECT pg_catalog.setval('public.ngo_id_seq', 91, true);


--
-- TOC entry 2997 (class 2606 OID 16701)
-- Name: ngo ngo_pkey; Type: CONSTRAINT; Schema: public; Owner: cyf_bd8n_user
--

ALTER TABLE ONLY public.ngo
    ADD CONSTRAINT ngo_pkey PRIMARY KEY (id);


-- Completed on 2023-03-16 00:20:44

--
-- PostgreSQL database dump complete
--

