import { NextFunction, Request, Response, Router } from "express";
import {
  getViagem,
  getViagemById,
  getViagemRelation,
  getViagemUserId,
  postViagem,
  removerViagem,
  updateViagem,
} from "../repositories/ViagemRepository";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const viagemRouter = Router();

viagemRouter.get(
  "/",
  authenticationMiddleware,
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const viagens = await getViagem();
      return res.status(200).json(viagens);
    } catch (error) {
      next(error);
    }
  }
);

viagemRouter.get(
  "/relation",
  authenticationMiddleware,
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const viagens = await getViagemRelation();
      return res.status(200).json(viagens);
    } catch (error) {
      next(error);
    }
  }
);

viagemRouter.get(
  "/relationUser",
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const id = Number(req.query.usuarioId);
      const relation = await getViagemUserId(id);
      return res.status(200).json(relation);
    } catch (error) {
      next(error);
    }
  }
);

viagemRouter.get(
  "/:id",
  authenticationMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const viagemById = await getViagemById(Number(id));
    return res.status(200).json(viagemById);
  }
);

viagemRouter.post(
  "/",
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { error } = await empresaschema.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.details };
      // }
      const novaViagem = await postViagem(req.body);
      return res.status(201).json(novaViagem);
    } catch (error) {
      next(error);
    }
  }
);

viagemRouter.put(
  "/:id",
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { error } = await Refschema.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.message };
      // }
      const { id } = req.params;
      const atualizarViagem = await updateViagem(Number(id), req.body);
      return res.status(200).json(atualizarViagem);
    } catch (error) {
      next(error);
    }
  }
);

viagemRouter.delete(
  "/:id",
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id } = req.params;
      const viagemDeleted = await removerViagem(Number(id));
      return res.status(200).json(viagemDeleted);
    } catch (error) {
      next(error);
    }
  }
);

export default viagemRouter;
