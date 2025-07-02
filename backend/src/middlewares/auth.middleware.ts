import { Request, Response, NextFunction } from "express";
import { DatosEncriptados, decodeToken } from "../auth/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: DatosEncriptados;
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Token no proporcionado" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const user = await decodeToken(token);

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
    return;
  }
}

export function rolMiddleware(rolesPermitidos: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    if (!rolesPermitidos.includes(user.rol)) {
      res.status(403).json({ message: "Acceso denegado" });
      return;
    }

    next();
  };
}
