import express from 'express'
import { create, deletetask, getTasks, updatetask } from '../controllers/todoController.js';
const router = express.Router();

router.post('/create', create);

router.get('/gettasks', getTasks)

router.put('/updatetask/:id', updatetask);

router.delete('/deletetask/:id', deletetask);

export default router;