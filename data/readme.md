# Data Structure

```json
user = {
  user_id: auto int,
  name: varchar(50),
  email: varchar,
  gender: varchar(20),
  date_of_birth: date,
  current_location: varchar(50),
  pin_code: integer,
  phone_number: varchar(20),
  qualification: varchar(50),
  date_of_release: date,
  case_status: varchar
}
```

```json
ngo = {
  id: auto int,
  service: character varying[],
  zone: character varying(50),
  organization: character varying,
  address: character varying,
  contact: jsonb,
  website: character varying,
  email: character varying,
  email_status: character varying,
  call_response: character varying
}
```