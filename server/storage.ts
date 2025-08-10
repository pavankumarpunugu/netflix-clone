import { type User, type InsertUser, type Content, type InsertContent, type Watchlist, type InsertWatchlist, users, content, userWatchlist } from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, ilike } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Content methods
  getAllContent(): Promise<Content[]>;
  getContentById(id: string): Promise<Content | undefined>;
  getContentByType(type: 'movie' | 'tv'): Promise<Content[]>;
  getContentByGenre(genre: string): Promise<Content[]>;
  getTrendingContent(): Promise<Content[]>;
  getNetflixOriginals(): Promise<Content[]>;
  searchContent(query: string): Promise<Content[]>;
  createContent(contentData: InsertContent): Promise<Content>;
  
  // Watchlist methods
  getUserWatchlist(userId: string): Promise<(Watchlist & { content: Content })[]>;
  addToWatchlist(watchlistData: InsertWatchlist): Promise<Watchlist>;
  removeFromWatchlist(userId: string, contentId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Content methods
  async getAllContent(): Promise<Content[]> {
    return await db.select().from(content).orderBy(desc(content.createdAt));
  }

  async getContentById(id: string): Promise<Content | undefined> {
    const [contentItem] = await db.select().from(content).where(eq(content.id, id));
    return contentItem || undefined;
  }

  async getContentByType(type: 'movie' | 'tv'): Promise<Content[]> {
    return await db.select().from(content).where(eq(content.type, type)).orderBy(desc(content.rating));
  }

  async getContentByGenre(genre: string): Promise<Content[]> {
    return await db.select().from(content).where(eq(content.genre, genre)).orderBy(desc(content.rating));
  }

  async getTrendingContent(): Promise<Content[]> {
    return await db.select().from(content).where(eq(content.isTrending, true)).orderBy(desc(content.rating));
  }

  async getNetflixOriginals(): Promise<Content[]> {
    return await db.select().from(content).where(eq(content.isNetflixOriginal, true)).orderBy(desc(content.rating));
  }

  async searchContent(query: string): Promise<Content[]> {
    return await db.select().from(content)
      .where(ilike(content.title, `%${query}%`))
      .orderBy(desc(content.rating));
  }

  async createContent(contentData: InsertContent): Promise<Content> {
    const [newContent] = await db
      .insert(content)
      .values(contentData)
      .returning();
    return newContent;
  }

  // Watchlist methods
  async getUserWatchlist(userId: string): Promise<(Watchlist & { content: Content })[]> {
    return await db
      .select({
        id: userWatchlist.id,
        userId: userWatchlist.userId,
        contentId: userWatchlist.contentId,
        addedAt: userWatchlist.addedAt,
        content: content,
      })
      .from(userWatchlist)
      .innerJoin(content, eq(userWatchlist.contentId, content.id))
      .where(eq(userWatchlist.userId, userId))
      .orderBy(desc(userWatchlist.addedAt));
  }

  async addToWatchlist(watchlistData: InsertWatchlist): Promise<Watchlist> {
    const [watchlistItem] = await db
      .insert(userWatchlist)
      .values(watchlistData)
      .returning();
    return watchlistItem;
  }

  async removeFromWatchlist(userId: string, contentId: string): Promise<void> {
    await db
      .delete(userWatchlist)
      .where(and(
        eq(userWatchlist.userId, userId),
        eq(userWatchlist.contentId, contentId)
      ));
  }
}

export const storage = new DatabaseStorage();
