import { query } from '../db/index.js';
import { QueryResult } from 'pg';

interface UserData {
  name: string,
  id: string
};

export const getAllUsers = async (): Promise<UserData[]>  => {
  let result: QueryResult = await query('SELECT id, name FROM users', []);
  if (result.rowCount !== 0) {
    return result.rows;
  };
  return [];
}; 
