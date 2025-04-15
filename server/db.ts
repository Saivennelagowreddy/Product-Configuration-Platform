import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Check if running in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// If DATABASE_URL is not provided, we'll default to a placeholder 
// which should be replaced when deployed or when manually created
if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL must be set. Using in-memory storage as fallback until database is provisioned.",
  );
}

// Create database pool
const pool = process.env.DATABASE_URL 
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

// Export the drizzle instance if pool is available
export const db = pool 
  ? drizzle({ client: pool, schema })
  : null;

// Check database connection
export const checkDatabaseConnection = async (): Promise<boolean> => {
  if (!pool) return false;
  
  try {
    const client = await pool.connect();
    client.release();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};