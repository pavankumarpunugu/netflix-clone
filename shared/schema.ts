import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const content = pgTable("content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  posterUrl: text("poster_url").notNull(),
  backdropUrl: text("backdrop_url"),
  videoUrl: text("video_url"),
  type: text("type").notNull(), // 'movie' or 'tv'
  genre: text("genre").notNull(),
  rating: integer("rating").notNull(), // percentage match
  year: integer("year").notNull(),
  duration: integer("duration"), // in minutes for movies, null for TV shows
  seasons: integer("seasons"), // for TV shows, null for movies
  isNetflixOriginal: boolean("is_netflix_original").default(false),
  isTrending: boolean("is_trending").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userWatchlist = pgTable("user_watchlist", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  contentId: varchar("content_id").notNull().references(() => content.id),
  addedAt: timestamp("added_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  watchlist: many(userWatchlist),
}));

export const contentRelations = relations(content, ({ many }) => ({
  watchlist: many(userWatchlist),
}));

export const userWatchlistRelations = relations(userWatchlist, ({ one }) => ({
  user: one(users, { fields: [userWatchlist.userId], references: [users.id] }),
  content: one(content, { fields: [userWatchlist.contentId], references: [content.id] }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertContentSchema = createInsertSchema(content).omit({
  id: true,
  createdAt: true,
});

export const insertWatchlistSchema = createInsertSchema(userWatchlist).omit({
  id: true,
  addedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;
export type Content = typeof content.$inferSelect;
export type InsertWatchlist = z.infer<typeof insertWatchlistSchema>;
export type Watchlist = typeof userWatchlist.$inferSelect;
