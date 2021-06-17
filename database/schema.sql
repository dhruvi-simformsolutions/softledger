CREATE TABLE public."Accounts" (
    id SERIAL,
    name character varying(255),
    number character varying(255) NOT NULL,
    "type" character varying(255),
    "createdAt" timestamp with time zone DEFAULT NOW() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT NOW() NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE public."Journals" (
    id SERIAL,
    reference character varying(255),
    "AccountId" integer,
    "date" date,
    amount numeric,
    currency character varying(10),
    "createdAt" timestamp with time zone DEFAULT NOW() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT NOW() NOT NULL,
    "status" character varying(255) DEFAULT "draft" /* status = draft or approved*/
    PRIMARY KEY (id)
);