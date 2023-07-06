import express from 'express';
import { Application } from 'express';

import signup from './signup.route';
import login from './login.route';
import users from './users.route';


export function mountRoutes(app: Application): void {
  app.use('/api/signup', signup);
  app.use('/api/login', login);
  app.use('/api/users', users);
};
