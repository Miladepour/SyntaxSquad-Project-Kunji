# Data Structure

```json
user = {
  user_id: auto int NOT NULL,
  name: varchar(300) NOT NULL,
  email: varchar(256),
  gender: varchar(50) NOT NULL,
  date_of_birth: date NOT NULL,
  current_location: varchar(50) NOT NULL,
  pin_code: integer,
  phone_number: varchar(13) NOT NULL,
  qualification: varchar(50) NOT NULL,
  date_of_release: date NOT NULL,
  case_status: varchar(50) NOT NULL
}
```

```json
ngo = {
  id: auto int NOT NULL,
  service: varchar(50)[] NOT NULL,
  zone: varchar(50) NOT NULL,
  organization: varchar(100) NOT NULL,
  address: varchar(300) NOT NULL,
  contact: jsonb NOT NULL,
  website: varchar(100),
  email: varchar(256)[],
  email_status: varchar(100),
  call_response: varchar(100)
}
```