import { Request, Response, NextFunction } from 'express';
import { collections } from '../db';
import { insertNewUser } from '../services/signup.service';
import { generateToken } from '../services/jwt.service';
import { User } from '../models';


export const isEmailUnique = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   let result = (await collections.users.find({ email: req.params.email }).toArray()) as User[]; 
   if (result.length === 0) {
     res.json({ code: 200, result: true });
   } else {
     res.json({ code: 409, result: false, message: 'email already associated with an account' });
   } 
};

export const isUserNameUnique = async (req: Request, res: Response, next: NextFunction): Promise<any> => { 
   let result = (await collections.users.find({ name: req.params.name }).toArray()) as User[]; 
   if (result.length === 0) {
      res.json({ code: 200, result: true });
   } else {
      res.json({ code: 409, result: false, message: 'name already associated with an account' });
   }
};
   
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   let newUser: User | null;
   try {
      newUser = await insertNewUser(req.body);
      if (!newUser) {
         throw new Error();
      }
      let token: string | null = generateToken({ id: newUser._id.toString(), name: newUser.name });
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
