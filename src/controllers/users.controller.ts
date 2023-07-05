import { Request, Response, NextFunction } from 'express';
import { getAllUsers, getOneUserById, updateOneUserById, deleteOneUserById } from '../services/users.service.js';

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

export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   let result: UserData | null = await getOneUserById(req.params.id);
   if (result) {
      res.json({ code: 200, success: true, data: result });
      return;
   }
   res.json({ code: 404, success: false, message: 'could not find user' });
};

export const updateOne = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   let result: boolean = await updateOneUserById(req.params.id, req.body);
   if (result) {
      (result as any) = await getOneUserById(req.params.id);
      res.json({ code: 204, success: true, data: result });
      return;
   }
   res.json({ code: 409, success: false, message: 'user update failed' });
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   let result: boolean = await deleteOneUserById(req.params.id);
   if (result) {
      res.json({ code: 202, success: true });
      return;
   }
   res.json({ code: 409, success: false, message: 'user delete failed' });
};
