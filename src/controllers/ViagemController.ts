import { NextFunction, Request, Response, Router } from "express";
import {
  getViagem,
  getViagemById,
  getViagemRelation,
  getViagemRelationUser,
  postViagem,
  removerViagem,
  updateViagem,
} from "../repositories/ViagemRepository";

const viagemRouter = Router();

viagemRouter.get(
  "/",
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
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const id = Number(req.query.usuarioId);
      const relation = await getViagemRelationUser(id);
      return res.status(200).json(relation);
    } catch (error) {
      next(error);
    }
  }
);

viagemRouter.get("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const viagemById = await getViagemById(Number(id));
  return res.status(200).json(viagemById);
});

viagemRouter.post(
  "/",
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
