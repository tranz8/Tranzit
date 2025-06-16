import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteSchema, insertShipmentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Track shipment endpoint
  app.get("/api/track/:trackingNumber", async (req, res) => {
    try {
      const { trackingNumber } = req.params;
      const shipment = await storage.getShipmentByTrackingNumber(trackingNumber);
      
      if (!shipment) {
        return res.status(404).json({ 
          message: "رقم التتبع غير صحيح أو غير موجود",
          error: "TRACKING_NOT_FOUND" 
        });
      }

      res.json(shipment);
    } catch (error) {
      res.status(500).json({ 
        message: "خطأ في الخادم",
        error: "SERVER_ERROR" 
      });
    }
  });

  // Create quote endpoint
  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(validatedData);
      
      res.status(201).json({ 
        message: "تم إرسال طلبك بنجاح! سنتواصل معك قريباً",
        quote 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "بيانات غير صحيحة",
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        message: "خطأ في الخادم",
        error: "SERVER_ERROR" 
      });
    }
  });

  // Get all quotes (admin endpoint)
  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getAllQuotes();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ 
        message: "خطأ في الخادم",
        error: "SERVER_ERROR" 
      });
    }
  });

  // Create shipment endpoint
  app.post("/api/shipments", async (req, res) => {
    try {
      const validatedData = insertShipmentSchema.parse(req.body);
      const shipment = await storage.createShipment(validatedData);
      
      res.status(201).json(shipment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "بيانات غير صحيحة",
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        message: "خطأ في الخادم",
        error: "SERVER_ERROR" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
