import express from 'express';
import * as users from '../controllers/users.controller.js'; 
import { authenticate } from '../services/jwt.service.js';
const router = express.Router();

router.get('/', authenticate, users.getAll);

export default router;
     
     
