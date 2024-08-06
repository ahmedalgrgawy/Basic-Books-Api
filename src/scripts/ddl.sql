CREATE SCHEMA bms;

CREATE TABLE bms.book (
	book_id serial4 NOT NULL,
	book_title varchar(300) NOT NULL,
	book_description varchar(1000) NULL,
	book_author varchar(50) NOT NULL,
	book_publisher varchar(50) NOT NULL,
	book_pages int4 NULL,
	store_code varchar(5) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT book_pkey PRIMARY KEY (book_id)
)
-- bms.store definition

-- Drop table

-- DROP TABLE bms.store;

CREATE TABLE bms.store (
	store_id serial4 NOT NULL,
	store_name varchar(100) NOT NULL,
	store_code varchar(5) NOT NULL,
	address varchar(200) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);

CREATE TABLE bms.app_audit (
	audit_id serial NOT NULL,
	audit_action varchar(100) NOT NULL,
	audit_data json NULL,
	audit_by varchar(50) NOT NULL,
	audit_on timestamp NOT NULL,
	audit_status varchar(50) NULL,
	audit_error json NULL,
	CONSTRAINT app_audit_pkey PRIMARY KEY (audit_id)
);

create table bms.app_users (
	user_id serial4 not null,
	username varchar(100) not null,
	"password" varchar(100) not null,
	email varchar(355) not null,
	user_type_code varchar(10) not null,
	full_name varchar(300) not null,
	active int2 null default 1,
	created_on timestamp null,
	created_by varchar(50) null,
	updated_on timestamp null,
	updated_by varchar(50) null,
	constraint user_email_key unique (email),
	constraint user_pkey primary key (user_id),
	constraint user_username_key unique (username)
)

create table bms.app_group (
	group_id serial4 not null,
	group_name varchar(100) not null,
	constraint group_pkey primary key (group_id),
	constraint group_group_name_key unique (group_name)
)

create table bms.app_role (
	role_id serial4 not null,
	role_name varchar(100) not null,
	constraint role_pkey primary key (role_id),
	constraint role_role_name_key unique (role_name)
)

create table bms.user_group (
	user_group_id serial4 not null,
	user_id int4 not null,
	group_id int4 not null,
	constraint user_group_pkey primary key (user_group_id)
)

create table bms.group_role (
	group_role_id serial4 not null,
	role_id int4 not null,
	group_id int4 not null,
	constraint group_role_pkey primary key (group_role_id)
)

create table bms.user_type (
	user_type_id serial4 not null,
	user_type_name varchar(500) not null,
	user_type_code varchar(10) NOT NULL,
	constraint user_type_pkey primary key (user_type_id)
)
