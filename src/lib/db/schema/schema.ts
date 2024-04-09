import {
  bigserial,
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const keyStatus = pgEnum("key_status", [
  "expired",
  "invalid",
  "valid",
  "default",
]);
export const keyType = pgEnum("key_type", [
  "stream_xchacha20",
  "secretstream",
  "secretbox",
  "kdf",
  "generichash",
  "shorthash",
  "auth",
  "hmacsha256",
  "hmacsha512",
  "aead-det",
  "aead-ietf",
]);
export const factorStatus = pgEnum("factor_status", ["verified", "unverified"]);
export const factorType = pgEnum("factor_type", ["webauthn", "totp"]);
export const aalLevel = pgEnum("aal_level", ["aal3", "aal2", "aal1"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "plain",
  "s256",
]);
export const equalityOp = pgEnum("equality_op", [
  "in",
  "gte",
  "gt",
  "lte",
  "lt",
  "neq",
  "eq",
]);
export const action = pgEnum("action", [
  "ERROR",
  "TRUNCATE",
  "DELETE",
  "UPDATE",
  "INSERT",
]);

export const prayers = pgTable(
  "prayers",
  {
    id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
    name: text("name"),
    content: text("content").notNull(),
    count: integer("count").default(0).notNull(),
    prayerNames: text("prayerNames").array().notNull(),
    isAnonymous: boolean("isAnonymous").default(false),
    createdAt: timestamp("createdAt", { withTimezone: true, mode: "string" }),
  },
  (table) => {
    return {
      idx28792Id: uniqueIndex("idx_28792_id").on(table.id),
    };
  },
);

export const schedules = pgTable(
  "schedules",
  {
    id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
    title: text("title").notNull(),
    date: timestamp("date", { withTimezone: true, mode: "date" }).notNull(),
    speaker: text("speaker").notNull(),
    bibleVerse: text("bibleVerse").notNull(),
    summary: text("summary").notNull(),
    liturgos: text("liturgos"),
    musician: text("musician"),
    multimedia: text("multimedia"),
    accommodation: text("accommodation"),
    cookingGroup: text("cookingGroup"),
    cleaningGroup: text("cleaningGroup").notNull(),
    fellowshipType: text("fellowshipType").notNull(),
  },
  (table) => {
    return {
      idx28801Id: uniqueIndex("idx_28801_id").on(table.id),
    };
  },
);

export const session = pgTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).primaryKey().notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const takeaways = pgTable(
  "takeaways",
  {
    id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
    scheduleId: bigserial("scheduleId", { mode: "number" }).notNull(),
    keypoints: text("keypoints").notNull(),
    contributors: text("contributors").array().notNull(),
  },
  (table) => {
    return {
      idx28813Id: uniqueIndex("idx_28813_id").on(table.id),
    };
  },
);

export const todos = pgTable(
  "todos",
  {
    id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
    content: text("content"),
    done: integer("done"),
  },
  (table) => {
    return {
      idx28820Id: uniqueIndex("idx_28820_id").on(table.id),
    };
  },
);

export const user = pgTable("user", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    withTimezone: true,
    mode: "string",
  }),
  image: varchar("image", { length: 255 }),
  hashedPassword: varchar("hashedPassword", { length: 255 }),
});

export const verificationToken = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
  },
  (table) => {
    return {
      idx28831Primary: primaryKey(table.identifier, table.token),
    };
  },
);

export const account = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refreshToken: varchar("refresh_token", { length: 255 }),
    accessToken: varchar("access_token", { length: 255 }),
    expiresAt: integer("expires_at"),
    tokenType: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    idToken: text("id_token"),
    sessionState: varchar("session_state", { length: 255 }),
  },
  (table) => {
    return {
      idx28786Primary: primaryKey(table.provider, table.providerAccountId),
    };
  },
);
