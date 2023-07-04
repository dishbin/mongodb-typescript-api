import express from 'express';
import { Application } from 'express';

import signup from './signup.route.js';
import login from './login.route.js';

export function mountRoutes(app: Application): void {
  app.use('/api/signup', signup);
  app.use('/api/login', login);
};
