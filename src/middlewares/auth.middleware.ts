import { authenticateToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization as string;

    const payload = await authenticateToken(token);

    if (!payload) {
      throw { status: 401, message: "token inválido" };
    }
    res.locals.payload = payload;
  } catch (error) {
    next(error);
  }
  next();
};

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { admin } = res.locals.payload; // Supondo que "admin" esteja no payload

    if (!admin) {
      return res.status(403).json({ message: "Acesso negado: usuário não é admin" });
    }
  
    next();
  } catch (error) {
    res.status(401).json({ message: "Autenticação falhou" });
  }};
export { authenticationMiddleware, adminMiddleware };