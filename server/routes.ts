import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContentSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Content routes
  app.get("/api/content", async (req, res) => {
    try {
      const content = await storage.getAllContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });

  app.get("/api/content/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const content = await storage.getContentById(id);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });

  app.get("/api/content/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      if (type !== 'movie' && type !== 'tv') {
        return res.status(400).json({ message: "Invalid content type" });
      }
      const content = await storage.getContentByType(type);
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content by type" });
    }
  });

  app.get("/api/content/genre/:genre", async (req, res) => {
    try {
      const { genre } = req.params;
      const content = await storage.getContentByGenre(genre);
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content by genre" });
    }
  });

  app.get("/api/trending", async (req, res) => {
    try {
      const content = await storage.getTrendingContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trending content" });
    }
  });

  app.get("/api/netflix-originals", async (req, res) => {
    try {
      const content = await storage.getNetflixOriginals();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Netflix originals" });
    }
  });

  app.get("/api/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      const content = await storage.searchContent(q);
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to search content" });
    }
  });

  app.post("/api/content", async (req, res) => {
    try {
      const validatedData = insertContentSchema.parse(req.body);
      const content = await storage.createContent(validatedData);
      res.status(201).json(content);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to create content" });
    }
  });

  // Watchlist routes
  app.get("/api/watchlist/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const watchlist = await storage.getUserWatchlist(userId);
      res.json(watchlist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch watchlist" });
    }
  });

  app.post("/api/watchlist", async (req, res) => {
    try {
      const { userId, contentId } = req.body;
      if (!userId || !contentId) {
        return res.status(400).json({ message: "userId and contentId are required" });
      }
      const watchlistItem = await storage.addToWatchlist({ userId, contentId });
      res.status(201).json(watchlistItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to add to watchlist" });
    }
  });

  app.delete("/api/watchlist/:userId/:contentId", async (req, res) => {
    try {
      const { userId, contentId } = req.params;
      await storage.removeFromWatchlist(userId, contentId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from watchlist" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
