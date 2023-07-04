import {Request, Response, NextFunction } from 'express';
import { query } from '../db/index.js';
import { QueryResult } from 'pg';
import { compareSync } from 'bcrypt';
import { generateToken } from './jwt.service.js';

interface LoginCredentials {
  name: string,
  password: string
};

export const checkUserCredentials = async (data: LoginCredentials) => {
  let result: QueryResult = await query('SELECT id, name, pass_hash FROM users WHERE name = $1 LIMIT 1', [data.name]);
  if (result.rowCount == 0) {
    return { success: false };
  }
  let resultData = result.rows[0];
  let compareResult: boolean = await compareSync(data.password, resultData.pass_hash);
  if (!compareResult) {
    return { success: false };
  }
  let token = generateToken({ name: resultData.name, id: resultData.id });
  return {
    success: true,
    name: resultData.name,
    id: resultData.id,
    token: token
  }
};
