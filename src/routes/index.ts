import express from 'express';
import { Application } from 'express';

import users from './users.js';


export function mountRoutes(app: Application): void {
  app.use('/api/users', users);
};
