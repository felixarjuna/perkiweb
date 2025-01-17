import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type AdapterAccount } from "next-auth/adapters";
import { z } from "zod";

export const users = pgTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    precision: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
  hashedPassword: varchar("hashedPassword", { length: 255 }),
});

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

// Schema for users - used to validate API requests
export const insertUserSchema = createInsertSchema(users, {});

export const insertUserParams = createSelectSchema(users, {})
  .omit({
    id: true,
    email: true,
    hashedPassword: true,
  })
  .extend({
    username: z.string(),
    password: z.string(),
  });

export const updateUserSchema = createSelectSchema(users);

export const updateUserParams = createSelectSchema(users)
  .omit({
    email: true,
  })
  .extend({
    username: z.string(),
  });

export const userIdSchema = updateUserSchema.pick({ id: true });

export const updatePasswordParams = z.object({
  id: z.string(),
  currentPassword: z
    .string()
    .nonempty({ message: "Password must contain at least 1 character(s)" }),
  newPassword: z
    .string()
    .nonempty({ message: "Password must contain at least 1 character(s)" }),
  retypeNewPassword: z
    .string()
    .nonempty({ message: "Password must contain at least 1 character(s)" }),
});

// Types for users - used to type API request params and within Components
export type User = z.infer<typeof updateUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
export type NewUserParams = z.infer<typeof insertUserParams>;
export type UpdateUserParams = z.infer<typeof updateUserParams>;
export type UserId = z.infer<typeof userIdSchema>["id"];
export type UpdatePasswordParams = z.infer<typeof updatePasswordParams>;
