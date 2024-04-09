CREATE TABLE IF NOT EXISTS "account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" varchar(255),
	"access_token" varchar(255),
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp (3) DEFAULT now(),
	"image" varchar(255),
	"hashedPassword" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prayers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"isAnonymous" boolean DEFAULT false,
	"content" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"prayerNames" json NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schedules" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"date" timestamp NOT NULL,
	"speaker" text NOT NULL,
	"bibleVerse" text NOT NULL,
	"summary" text NOT NULL,
	"liturgos" text,
	"musician" text,
	"multimedia" text,
	"accommodation" text,
	"cookingGroup" text,
	"cleaningGroup" text NOT NULL,
	"fellowshipType" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "takeaways" (
	"id" serial PRIMARY KEY NOT NULL,
	"scheduleId" integer NOT NULL,
	"keypoints" text NOT NULL,
	"contributors" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"done" integer
);
