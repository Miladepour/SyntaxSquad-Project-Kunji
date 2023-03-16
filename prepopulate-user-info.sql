

CREATE TABLE public."user-informations" (
    id serial PRIMARY KEY,
    name VARCHAR ( 50 ) NOT NULL,
    email VARCHAR,
    gender VARCHAR (20) NOT NULL,
    date_of_birth date NOT NULL,
    current_location VARCHAR ( 50 ) NOT NULL,
    pin_code integer NOT NULL,
    phone_number VARCHAR ( 20 ) NOT NULL,
    qualification VARCHAR ( 50 ) NOT NULL,
    date_of_release date NOT NULL,
    case_status VARCHAR NOT NULL,
   
);




