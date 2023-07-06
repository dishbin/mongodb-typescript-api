import {Request, Response, NextFunction } from 'express';
import { collections } from '../db';
import { User } from '../models';
import { compareSync } from 'bcrypt';
import { generateToken } from './jwt.service';


interface LoginCredentials {
  name: string,
  password: string
};

export const checkUserCredentials = async (data: LoginCredentials) => {
  let result: User = (await collections.users.findOne({ name: data.name })) as User;
  if (!result) {
    return { success: false };
  }
  let compareResult: boolean = await compareSync(data.password, result.hash);
  if (!compareResult) {
    return { success: false };
  }
  let token = generateToken({ name: result.name, id: result._id.toString() });
  return {
    success: true,
    name: result.name,
    id: result._id.toString(),
    token: token
  }
};
