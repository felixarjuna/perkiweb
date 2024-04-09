import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  content: text("content"),
  done: integer("done"),
});
