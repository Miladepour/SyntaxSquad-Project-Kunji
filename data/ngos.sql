CREATE TABLE public.ngo (
    id SERIAL PRIMARY KEY,
    service character varying(50)[] NOT NULL,
    zone character varying(50) NOT NULL,
    organization character varying(100) NOT NULL,
    address character varying(300) NOT NULL,
    contact jsonb NOT NULL,
    website character varying(100),
    email character varying(256)[],
    email_status character varying(100),
    call_response character varying(100)
);

insert into public.ngo (service, zone, organization, address, contact, website, email, email_status, call_response) values (ARRAY ['etiam','gravida'], 'Real', 'Swaniawski-Roob', '2240 Paget Lane', '[{"phone_number":"460-898-5564","description":"eu"},{"phone_number":"133-785-7006","description":"porta volutpat quam"},{"phone_number":"304-411-4718","description":"vitae consectetuer eget rutrum"}]', 'scleveland0@gnu.org', ARRAY ['tbriggs0@dropbox.com','zkelsow0@army.mil'], false, true);
insert into public.ngo (service, zone, organization, address, contact, website, email, email_status, call_response) values (ARRAY ['dui','diam','urna'], 'Bamiantong', 'Wyman, Hagenes and Stoltenberg', '925 Mockingbird Lane', '[{"phone_number":"625-821-6596","description":"libero non mattis pulvinar nulla"},{"phone_number":"173-291-4367","description":"dolor sit amet consectetuer adipiscing"},{"phone_number":"906-454-0071","description":"in consequat ut nulla sed"},{"phone_number":"849-119-0412","description":"nisl nunc nisl duis"},{"phone_number":"693-654-3231","description":"varius integer ac leo pellentesque"}]', 'oweatherill1@dropbox.com', ARRAY ['tkruszelnicki1@wsj.com','crudloff1@wired.com'], true, false);
insert into public.ngo (service, zone, organization, address, contact, website, email, email_status, call_response) values (ARRAY ['nascetur','nullam','dolor','vestibulum'], 'Luojiang', 'Macejkovic, Kihn and Hills', '3837 Farmco Circle', '[{"phone_number":"213-992-6701","description":"id pretium iaculis"},{"phone_number":"416-647-2394","description":"id ligula suspendisse"},{"phone_number":"616-195-7801","description":"congue"},{"phone_number":"212-168-7188","description":"gravida"},{"phone_number":"344-103-9913","description":"leo maecenas"}]', 'agarmon2@wikipedia.org', ARRAY ['ahedau2@usa.gov','kferriman2@scribd.com','breynoldson2@skyrock.com'], true, false);
insert into public.ngo (service, zone, organization, address, contact, website, email, email_status, call_response) values (ARRAY ['erat','mi','curabitur'], 'Shchastya', 'Farrell and Sons', '572 Grim Avenue', '[{"phone_number":"282-979-1135","description":"platea dictumst morbi vestibulum velit"}]', 'hrobke3@bloglines.com', ARRAY ['bgrealy3@amazon.com'], true, true);
insert into public.ngo (service, zone, organization, address, contact, website, email, email_status, call_response) values (ARRAY ['tristique','sed','consectetuer','amet'], 'Nabeul', 'Roob, Kiehn and McLaughlin', '5571 Karstens Way', '[{"phone_number":"805-130-2516","description":"nam tristique tortor eu pede"},{"phone_number":"188-450-4607","description":"nulla facilisi cras non velit"}]', 'sfipp4@abc.net.au', ARRAY ['esprey4@usatoday.com','wpawley4@salon.com','nfrood4@skype.com'], false, false);