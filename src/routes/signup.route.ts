import express, { Router } from 'express';
import * as signup from '../controllers/signup.controller.js';

const router: Router = express.Router();

router.post('/email', signup.isEmailUnique);
router.post('/name', signup.isUserNameUnique);
router.post('/create', signup.createUser);

export default router;
