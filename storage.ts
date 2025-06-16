import { users, shipments, quotes, type User, type InsertUser, type Shipment, type InsertShipment, type Quote, type InsertQuote } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getShipmentByTrackingNumber(trackingNumber: string): Promise<Shipment | undefined>;
  createShipment(shipment: InsertShipment): Promise<Shipment>;
  updateShipmentStatus(trackingNumber: string, status: string): Promise<Shipment | undefined>;
  
  createQuote(quote: InsertQuote): Promise<Quote>;
  getAllQuotes(): Promise<Quote[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private shipments: Map<string, Shipment>;
  private quotes: Map<number, Quote>;
  private currentUserId: number;
  private currentShipmentId: number;
  private currentQuoteId: number;

  constructor() {
    this.users = new Map();
    this.shipments = new Map();
    this.quotes = new Map();
    this.currentUserId = 1;
    this.currentShipmentId = 1;
    this.currentQuoteId = 1;

    // Add sample shipment for demo
    this.createSampleShipment();
  }

  private createSampleShipment() {
    const sampleShipment: Shipment = {
      id: this.currentShipmentId++,
      trackingNumber: "TRZ8001234",
      senderName: "شركة التجارة العالمية",
      recipientName: "أحمد محمد",
      origin: "دبي، الإمارات",
      destination: "صنعاء، اليمن",
      status: "in_transit",
      serviceType: "full_shipping",
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      createdAt: new Date(),
    };
    this.shipments.set(sampleShipment.trackingNumber, sampleShipment);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getShipmentByTrackingNumber(trackingNumber: string): Promise<Shipment | undefined> {
    return this.shipments.get(trackingNumber);
  }

  async createShipment(insertShipment: InsertShipment): Promise<Shipment> {
    const id = this.currentShipmentId++;
    const shipment: Shipment = { 
      ...insertShipment, 
      id,
      createdAt: new Date(),
    };
    this.shipments.set(shipment.trackingNumber, shipment);
    return shipment;
  }

  async updateShipmentStatus(trackingNumber: string, status: string): Promise<Shipment | undefined> {
    const shipment = this.shipments.get(trackingNumber);
    if (shipment) {
      shipment.status = status;
      this.shipments.set(trackingNumber, shipment);
      return shipment;
    }
    return undefined;
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.currentQuoteId++;
    const quote: Quote = { 
      ...insertQuote, 
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async getAllQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }
}

export const storage = new MemStorage();
