import { hashSync } from 'bcrypt';
import { collections } from '../db';
import { User } from '../models';
import dotenv from 'dotenv';

dotenv.config();

interface NewUserPayload {
  name: string,
  email: string,
  password: string
}

export const insertNewUser = async (data: NewUserPayload): Promise<any> => {
  let newUserDocument: { [key: string]: string } = {
    name: data.name,
    email: data.email,
    hash: await hashSync(data.password, parseInt(process.env.SALT_ROUNDS))
  };
  try {
    let result = await collections.users.insertOne(newUserDocument);
    if (result.acknowledged) {
      return ({ _id: result.insertedId, name: newUserDocument.name }) as User;
    }
    throw new Error();
  } catch (e: any) {
    console.log('error creating new user');
    return null;
  }
}; 
