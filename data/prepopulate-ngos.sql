

CREATE TABLE public.ngo (
    id serial PRIMARY KEY,
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


INSERT INTO public.ngo (id, service, zone, organization, address, contact, website, email, email_status, call_response) VALUES (1, '{"Legal Aid"}', 'North', 'Southpark movie table', 'North District Legal Service
Eco Room No. 42 Major
Courts Complex, Delhi', '[{"description": "", "phone_number": "011 2788 74145"}]', 'https://en.wikipedia.org/wiki/Lorem_ipsum', 'fakeEmail@gmail.com', NULL, 'Not Reachable');
INSERT INTO public.ngo (id, service, zone, organization, address, contact, website, email, email_status, call_response) VALUES (2, '{"Legal Aid"}', 'East', 'District Legal Services Authority (DLSA)', 'District Legal Services Authority (DLSA),
West Room no. 295, Tis Genderma Courts, 
Delhi', '[{"phone_number": "011 2396 8052","description":""}]', NULL, NULL, NULL, 'Not Reachable');
INSERT INTO public.ngo (id, service, zone, organization, address, contact, website, email, email_status, call_response) VALUES (3, '{"Legal Aid"}', 'West', 'South-West District Legal Service', 'South-West District Legal Service
Bruamette road,
Yellow Block, Ground
Floor, Chaplin Court Complex,
Sector-11, Dwarka, 
New Delhi – 85674', NULL, 'https://en.wikipedia.org/wiki/Lorem_ipsum', 'dmakalaa@gmail.com', 'Email Sent', 'Number not available');
INSERT INTO public.ngo (id, service, zone, organization, address, contact, website, email, email_status, call_response) VALUES (4, '{"Legal Aid"}', 'South', 'South District Hospital Authority ', 'South District Hospital Authority 
Room No. 3, 32rd Floor, Raket Court Complex, 
New Delhi', '[{"description": "", "phone_number": "+91 021 3156 2560"}]', 'https://en.wikipedia.org/wiki/Lorem_ipsum', 'south-dwsssa@nic.en ', 'Email Sent', 'Contact Details Confirmed');
INSERT INTO public.ngo (id, service, zone, organization, address, contact, website, email, email_status, call_response) VALUES (5, '{"Legal Aid"}', 'South', 'Only legal help', 'Volunteer for Justice Foundation
A185, MLG, Saniteria Colony, 
New Delhi - 87111', '[{"description": "", "phone_number": "+91 555 984 70 06"}]', 'https://en.wikipedia.org/wiki/Lorem_ipsum', 'fakeEmail@outlook.com', 'Email Sent', 'Switched off');

