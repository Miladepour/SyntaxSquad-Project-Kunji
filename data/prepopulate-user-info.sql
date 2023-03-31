

CREATE TABLE public."user_informations" (
    user_id serial PRIMARY KEY,
    name VARCHAR ( 50 ) NOT NULL,
    email VARCHAR,
    gender VARCHAR (20) NOT NULL,
    date_of_birth date NOT NULL,
    current_location VARCHAR ( 50 ) NOT NULL,
    pin_code integer NOT NULL,
    phone_number VARCHAR ( 20 ) NOT NULL,
    qualification VARCHAR ( 50 ) NOT NULL,
    date_of_release date NOT NULL,
    case_status VARCHAR NOT NULL
   
);

INSERT INTO public.user_informations (user_id, name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES (1, 'Kandace Hanley', 'khanley0@nifty.com', 'Genderqueer', '1994-06-21', 'Saint-Ouen', 68718, '+33 (144) 103-3479', 'Graphic Designer', '2022-09-19', 'true');
INSERT INTO public.user_informations (user_id, name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES (2, 'Darell Dodd', 'ddodd1@hc360.com', 'Female', '1990-05-08', 'Priboj', 83220, '+381 (454) 830-9718', 'Internal Auditor', '2022-12-18', 'true');
INSERT INTO public.user_informations (user_id, name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES (3, 'Etty Griffitts', 'egriffitts2@dot.gov', 'Female', '1985-10-03', 'Henglin', 91838, '+86 (387) 454-2499', 'Research Assistant I', '2023-02-07', 'true');
INSERT INTO public.user_informations (user_id, name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES (4, 'Inez Secret', 'isecret3@ocn.ne.jp', 'Female', '1982-03-22', 'Shangyuan', 55304, '+86 (660) 423-1696', 'Administrative Assistant II', '2022-10-29', 'false');
INSERT INTO public.user_informations (user_id, name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES (5, 'Mariann Ploughwright', 'mploughwright4@prweb.com', 'Female', '1987-10-07', 'Jilong', 87340, '+86 (264) 625-8957', 'Programmer Analyst II', '2023-01-15', 'false');
INSERT INTO public.user_informations (user_id, name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES (6, 'Dar Geaves', 'dgeaves5@acquirethisname.com', 'Male', '1982-07-28', 'Montreuil', 61361, '+33 (319) 546-3037', 'Financial Analyst', '2022-11-24', 'false');
INSERT INTO public.user_informations (user_id, name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES (7, 'Osgood Swepstone', 'oswepstone6@mediafire.com', 'Male', '1984-12-09', 'Dongfeng', 51821, '+86 (369) 480-4812', 'Social Worker', '2022-09-20', 'false');
INSERT INTO public.user_informations (user_id, name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES (8, 'Filberte Claus', 'fclaus7@usda.gov', 'Male', '1985-09-15', 'Fanzhuang', 36267, '+86 (658) 884-4296', 'Sales Representative', '2022-08-19', 'true');
INSERT INTO public.user_informations (user_id, name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES (9, 'Fanchette Puvia', 'fpuvia8@ebay.co.uk', 'Female', '1993-12-19', 'Pagsanahan Norte', 85674, '+63 (706) 260-1370', 'Developer IV', '2022-07-25', 'true');
INSERT INTO public.user_informations (user_id, name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release, case_status) VALUES (10, 'Zollie Blacklock', 'zblacklock9@telegraph.co.uk', 'Male', '1982-10-20', 'Espinillo', 87111, '+54 (125) 287-0511', 'Analyst Programmer', '2023-03-11', 'false');



