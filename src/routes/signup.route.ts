import express, { Router } from 'express';
import * as signup from '../controllers/signup.controller';

const router: Router = express.Router();

router.get('/email/:email', signup.isEmailUnique);
router.get('/name/:name', signup.isUserNameUnique);
router.post('/create', signup.createUser);

export default router;
