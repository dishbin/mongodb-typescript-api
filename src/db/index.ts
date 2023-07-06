import { MongoClient, Db, Collection } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

interface GlobalCollectionsObject{
  [key: string]: Collection
}

export const collections: GlobalCollectionsObject = {};

export const connectToDatabase = async(): Promise<void> => {
  let client = new MongoClient(process.env.CONNECTION_STRING);
  await client.connect();
  let db: Db = await client.db(process.env.DB_NAME);
  process.env.COLLECTIONS_LIST.split(',').forEach(collection => {
    collections[collection] = db.collection(collection);
  });
};

