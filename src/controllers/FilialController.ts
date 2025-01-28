import { NextFunction, Request, Response, Router } from "express";
import {
  desativaFilial,
  getFilial,
  getFilialById,
  postFilial,
  removeFilial,
  updateFilial,
} from "../repositories/FilialRepository";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const filialRouter = Router();

filialRouter.get(
  "/", authenticationMiddleware,
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const filiais = await getFilial();
      return res.status(200).json(filiais);
    } catch (error) {
      next(error);
    }
  }
);

filialRouter.get("/:id", authenticationMiddleware, async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const filial = await getFilialById(Number(id));
  return res.status(200).json(filial);
});

filialRouter.post(
  "/", authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { error } = await empresaschema.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.details };
      // }
      const novaFilial = await postFilial(req.body);
      return res.status(201).json(novaFilial);
    } catch (error) {
      next(error);
    }
  }
);

filialRouter.put(
  "/atuaFilial/:id", authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { error } = await Refschema.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.message };
      // }
      const { id } = req.params;
      const atualizarFilial = await updateFilial(Number(id), req.body);
      return res.status(200).json(atualizarFilial);
    } catch (error) {
      next(error);
    }
  }
);

filialRouter.delete(
  "/:id", authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id } = req.params;
      const filialDeleted = await removeFilial(Number(id));
      return res.status(200).json(filialDeleted);
    } catch (error) {
      next(error);
    }
  }
);

filialRouter.patch(
  "/filialStatus/:id", authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id } = req.params;
      const { ativo } = req.body;

      const desativarFilial = await desativaFilial(Number(id), ativo);
      return res.status(200).json(desativarFilial);
    } catch (error) {
      next(error);
    }
  }
);

export default filialRouter;
