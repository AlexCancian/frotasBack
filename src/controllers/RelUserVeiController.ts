import { NextFunction, Request, Response, Router } from "express";
import {
  getRelUserVei,
  getRelUserVeiById,
  getRelUserVeiRelation,
  getRelUserVeiRelationById,
  postRelUserVei,
  removeRelUserVei,
  updateRelUserVei,
} from "../repositories/RelUserVeiculoRepository";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const relUserVeiRouter = Router();

relUserVeiRouter.get(
  "/", authenticationMiddleware,
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const relaciomentos = await getRelUserVei();
      return res.status(200).json(relaciomentos);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

relUserVeiRouter.get(
  "/relation/", authenticationMiddleware,
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const relaciomentos = await getRelUserVeiRelation();
      return res.status(200).json(relaciomentos);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

relUserVeiRouter.get(
  "/:id", authenticationMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const relacionamento = await getRelUserVeiById(Number(id));
    return res.status(200).json(relacionamento);
  }
);

relUserVeiRouter.get(
  "/relation/:id", authenticationMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const relacionamento = await getRelUserVeiRelationById(Number(id));
    return res.status(200).json(relacionamento);
  }
);

relUserVeiRouter.post(
  "/", authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      console.log(req.body);
      // const { error } = await empresaschema.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.details };
      // }
      const novoRelacionamento = await postRelUserVei(req.body);
      return res.status(201).json(novoRelacionamento);
    } catch (error) {
      next(error);
    }
  }
);

relUserVeiRouter.put(
  "/:id", authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { error } = await Refschema.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.message };
      // }
      const { id } = req.params;
      const atualizarRelUserVei = await updateRelUserVei(Number(id), req.body);
      return res.status(200).json(atualizarRelUserVei);
    } catch (error) {
      next(error);
    }
  }
);

relUserVeiRouter.delete(
  "/:id", authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id } = req.params;
      const relacionamentoDeleted = await removeRelUserVei(Number(id));
      return res.status(200).json(relacionamentoDeleted);
    } catch (error) {
      next(error);
    }
  }
);

export default relUserVeiRouter;
