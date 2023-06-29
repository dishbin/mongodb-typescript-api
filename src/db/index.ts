import { Pool, QueryResult, PoolClient, QueryConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT)
});

// export async function query (text: string, params: any[]): Promise<QueryResult> {
//  return await pool.query(text, params);
// };

export async function query (queryConfig: QueryConfig): Promise<QueryResult> {
  return await pool.query(queryConfig);
};

export async function getClient (): Promise<PoolClient> {
  return await pool.connect();
} 
