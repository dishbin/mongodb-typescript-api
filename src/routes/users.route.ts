import express from 'express';
import * as users from '../controllers/users.controller'; 
import { authenticate } from '../services/jwt.service';
const router = express.Router();

router.get('/', authenticate, users.getAll);
router.get('/one/:id', authenticate, users.getOne);
router.put('/update/:id', authenticate, users.updateOne);
router.delete('/delete/:id', authenticate, users.deleteOne);

export default router;
     
     
