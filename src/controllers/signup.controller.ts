import { Request, Response, NextFunction } from 'express';
import { QueryConfig, QueryResult, PoolClient } from 'pg';
import { query, getClient } from '../db/index.js';
import { insertNewUser } from '../services/signup.service.js';
import { generateToken } from '../services/jwt.service.js';
import type { NewUserData } from '../types/index.d.ts';

export const isEmailUnique = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   let result: QueryResult = await query('SELECT id FROM users WHERE email = $1', [req.body.email]);
   if (result.rowCount === 0) {
     res.json({ code: 200, result: true });
   } else {
     res.json({ code: 409, result: false, message: 'email already associated with an account' });
   } 
};

export const isUserNameUnique = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   let result: QueryResult = await query('SELECT id FROM users WHERE name = $1', [req.body.name]);
   if (result.rowCount === 0) {
      res.json({ code: 200, result: true });
   } else {
      res.json({ code: 409, result: false, message: 'name already associated with an account' });
   }
};
   
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   let userCreated = false;
   try {
      userCreated = await insertNewUser(req.body); 
      if (!userCreated) throw new Error();
      let newUser: NewUserData | null;
      let result: QueryResult = await query('SELECT id, name FROM users WHERE name = $1 AND email = $2', [req.body.name, req.body.email]);
      newUser = result.rows[0] || null;
      let token: string | null = generateToken(newUser);
      res.json({
         code: 201,
         data: newUser,
         token: token,
         success: true,
         message: 'new user successfully created' 
      });
   } catch (e: any) {
      res.json({ code: 500, message: 'user creation failed', success: false });
      return;
   }
};
