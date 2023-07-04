import express, { Router } from 'express';
import { login } from '../controllers/login.controller.js';

const router: Router = express.Router();

router.post('/', login);

export default router;
