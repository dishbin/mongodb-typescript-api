import { collections } from '../db';
import { User } from '../models';
import { ObjectId } from 'mongodb';

interface UpdateDocument {
  [key: string]: any
};

const projection = {
  hash: 0
};

export const getAllUsers = async (): Promise<User[]>  => {
  return (await collections.users.find({}).project(projection).toArray()) as User[];
};

export const getOneUserById = async (id: string): Promise<User> => {
  return (await collections.users.findOne({ _id: new ObjectId(id) })) as User;
};

export const updateOneUserById = async (id: string, updateDocument: UpdateDocument): Promise<boolean> => {
  let result = await collections.users.updateOne({ _id: new ObjectId(id) }, { $set: updateDocument}, {});
  return (result.modifiedCount === 1) ? true : false;
};

export const deleteOneUserById = async (id: string): Promise<boolean> => {
  let result = await collections.users.deleteOne({ _id: new ObjectId(id) });
  return (result.deletedCount === 1) ? true : false;
};
