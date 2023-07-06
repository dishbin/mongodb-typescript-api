import { ObjectId } from 'mongodb';

export class User {
  constructor(public name?: string, public email?: string, public hash?: string, public _id?: ObjectId) {}; 
}
