import { Router } from 'express';
import SocketController from '../controllers/socket.controller';
const router = Router();
const controller = new SocketController();

router.get('/usuarios', controller.getUsuarios);

export default router;