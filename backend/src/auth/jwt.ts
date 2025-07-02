import jwt from 'jsonwebtoken';
import { envs } from '../config/envs';

export interface DatosEncriptados {
    id: number;
    email: string;
    rol: string;
}

export async function createToken(user: DatosEncriptados): Promise<string> {
  const secretKey = envs.JWT_SECRET_KEY;
  const token = jwt.sign(user, secretKey);
  return token;
}

export async function decodeToken(token: string): Promise<DatosEncriptados> {
  const secretKey = envs.JWT_SECRET_KEY;
  const decodedToken = jwt.verify(token, secretKey) as DatosEncriptados;
  return decodedToken;
}