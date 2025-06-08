import { Router } from "express";

export const usuarioRouter = Router();

usuarioRouter.get('/', (req, res) => {
    res.send('El usuario router funciona. yippee!');
});