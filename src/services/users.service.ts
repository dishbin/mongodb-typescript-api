import { query } from '../db/index.js';
import { QueryResult } from 'pg';

interface UserData {
  name: string,
  id: string
};

interface UpdateDocument {
  [key: string]: any
};

export const getAllUsers = async (): Promise<UserData[]>  => {
  let result: QueryResult = await query('SELECT id, name FROM users', []);
  if (result.rowCount !== 0) {
    return result.rows;
  };
  return [];
};

export const getOneUserById = async (id: string): Promise<any> => {
  let result: QueryResult = await query('SELECT id, name FROM users WHERE id = $1 LIMIT 1', [id]);
  if (result.rowCount !== 0) {
    return result.rows[0];
  }
  return null;
};

export const updateOneUserById = async (id: string, updateDocument: UpdateDocument): Promise<boolean> => {
  let paramCount: number = 0;
  let paramsEntries: Array<any> = Object.entries(updateDocument);
  let params: any[] = [];
  let queryText: string = 'UPDATE users SET ';
  for (let i: number = 0; i < paramsEntries.length; i++) {
    queryText += `${paramsEntries[i][0]}=$${++paramCount}`;
    params.push(paramsEntries[i][1]);
  }
  queryText += ` WHERE id = $${++paramCount}`;
  params.push(id);
  let result: QueryResult = await query(queryText, params);
  if (result.rowCount === 1) {
    return true;
  }
  return false;
};

export const deleteOneUserById = async (id: string): Promise<boolean> => {
  let result: QueryResult = await query('DELETE FROM users WHERE id = $1', [id]);
  if (result.rowCount === 1) {
    return true;
  }
  return false;
};
