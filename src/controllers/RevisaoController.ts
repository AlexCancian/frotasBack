import { NextFunction, Request, Response, Router } from "express";
import {
  getRevisao,
  getRevisaoById,
  getRevisaoRelation,
  postRevisao,
  removeRevisao,
  updateRevisao,
} from "../repositories/RevisaoRepository";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const revisaoRouter = Router();

revisaoRouter.get(
  "/",
  authenticationMiddleware,
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const revisoes = await getRevisao();
      return res.status(200).json(revisoes);
    } catch (error) {
      next(error);
    }
  }
);

revisaoRouter.get(
  "/relation/",
  authenticationMiddleware,
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const revisoes = await getRevisaoRelation();
      return res.status(200).json(revisoes);
    } catch (error) {
      next(error);
    }
  }
);

revisaoRouter.get(
  "/:id",
  authenticationMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const revisao = await getRevisaoById(Number(id));
    return res.status(200).json(revisao);
  }
);

revisaoRouter.post(
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
      const novaRevisao = await postRevisao(req.body);
      return res.status(201).json(novaRevisao);
    } catch (error) {
      next(error);
    }
  }
);

revisaoRouter.put(
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
      const atualizarRevisao = await updateRevisao(Number(id), req.body);
      return res.status(200).json(atualizarRevisao);
    } catch (error) {
      next(error);
    }
  }
);

revisaoRouter.delete(
  "/:id",
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id } = req.params;
      const revisaoDeleted = await removeRevisao(Number(id));
      return res.status(200).json(revisaoDeleted);
    } catch (error) {
      next(error);
    }
  }
);
export default revisaoRouter;
