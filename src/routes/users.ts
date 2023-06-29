import express, { Request, Response } from 'express';
import { QueryConfig, QueryResult, PoolClient } from 'pg';
import { query, getClient } from '../db/index.js';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/email', async (req: Request, res: Response): Promise<any> => {
  let queryConfig: QueryConfig = {
    text: 'SELECT id, email FROM users WHERE email = $1',
    values: [req.body.email]
  };
  let result: QueryResult = await query(queryConfig);
  if (result.rowCount === 0) {
    res.json({ code: 200, result: true });
  } else {
    res.json({ code: 409, result: false, message: 'email already associated with an account' });
  };
});

router.post('/name', async (req: Request, res: Response): Promise<any> => {
  let queryConfig: QueryConfig = {
    text: 'SELECT id, name FROM users WHERE name = $1',
    values: [req.body.name]
  };
  let result: QueryResult = await query(queryConfig);
  if (result.rowCount === 0) {
    res.json({ code: 200, result: true });
  } else {
    res.json({ code: 409, result: false, message: 'name already associated with an account' });
  }    
});

router.post('/create', async (req: Request, res: Response): Promise<any> => {
  let newUserValues: string[] = [];
  ['name', 'email'].map(key => newUserValues.push(req.body[key]));
  newUserValues.push(await hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS)));
  let queryConfig: QueryConfig = {
    text: 'INSERT INTO users (name, email, pass_hash) VALUES ($1, $2, $3)',
    values: newUserValues
  };
  let poolClient: PoolClient = await getClient();
  let result: QueryResult = await poolClient.query(queryConfig);
  if (result.rowCount == 1) {
    queryConfig = {
      text: 'SELECT id, name FROM users WHERE name = $1 AND email = $2 LIMIT 1',
      values: newUserValues.slice(2);
    };
  } else {
    res.json({ code: 500, message: 'could not create new user'});
    return;
  }
  result = await poolClient.query(queryConfig);
  if (result.rowCount == 1) {
    res.json({ code: 201, data: result.rows[0], success: true, message: 'new user successfully created' });
  } else {
    res.json({ code: 500, message: 'could not create new user' });
  }
  poolClient.release();
});
     
export default router;
     
     
