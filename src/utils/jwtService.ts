import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface UserData {
  id: string,
  name: string
}

interface AuthenticatedRequest extends Request {
  token: string | JwtPayload
}

const SECRET: Secret = process.env.JWT_SECRET;
const EXPIRATION: string = process.env.JWT_EXPIRATION;

export function generateToken(data: UserData): string {
  return jwt.sign(data, SECRET, { expiresIn: EXPIRATION });
};

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    let token = req.header('Authorization').replace('Bearer: ', '');
    if (!token) {
      throw new Error();
    }
    let decodedToken = jwt.verify(token, SECRET);
    (req as AuthenticatedRequest).token = decodedToken;
    next();
 } catch (e: any) {
    res.json({ code: 401, message: 'authenticate failed' });
 }
};
