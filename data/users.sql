CREATE TABLE IF NOT EXISTS public.user_informations (
    user_id SERIAL PRIMARY KEY,
    name character varying(300) NOT NULL,
    email character varying(256),
    gender character varying(50) NOT NULL,
    date_of_birth date NOT NULL,
    current_location character varying(50) NOT NULL,
    pin_code integer,
    phone_number character varying(13) NOT NULL,
    qualification character varying(50) NOT NULL,
    date_of_release date NOT NULL,
    case_status character varying(50) NOT NULL
);

INSERT INTO public.user_informations (name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES ('Kandace Hanley', 'khanley0@nifty.com', 'Genderqueer', '1994-06-21', 'Saint-Ouen', 68718, '+33 103-3479', 'Graphic Designer', '2022-09-19', 'true');
INSERT INTO public.user_informations (name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES ('Darell Dodd', 'ddodd1@hc360.com', 'Female', '1990-05-08', 'Priboj', 83220, '+381 830-9718', 'Internal Auditor', '2022-12-18', 'true');
INSERT INTO public.user_informations (name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES ('Etty Griffitts', 'egriffitts2@dot.gov', 'Female', '1985-10-03', 'Henglin', 91838, '+86 454-2499', 'Research Assistant I', '2023-02-07', 'true');
INSERT INTO public.user_informations (name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES ('Inez Secret', 'isecret3@ocn.ne.jp', 'Female', '1982-03-22', 'Shangyuan', 55304, '+86 423-1696', 'Administrative Assistant II', '2022-10-29', 'false');
INSERT INTO public.user_informations (name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES ('Mariann Ploughwright', 'mploughwright4@prweb.com', 'Female', '1987-10-07', 'Jilong', 87340, '+86 625-8957', 'Programmer Analyst II', '2023-01-15', 'false');