import { Request, Response, NextFunction } from 'express';
import { getAllUsers } from '../services/users.service.js';

interface UserData {
   name: string,
   id: string
};

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   let result: UserData[] = await getAllUsers();
   if (result.length > 0) {
      res.json({ code: 200, success: true, data: result });
      return;
   }
   res.json({ code: 401, success: false, message: 'no users found' });
};
