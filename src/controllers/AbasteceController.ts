import { NextFunction, Request, Response, Router } from "express";
import {
  getAbastece,
  getAbasteceById,
  getAbasteceRelation,
  postAbastece,
  removeAbastecimento,
  updateAbastecimento,
} from "../repositories/AbastecerRepository";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const abasteceRouter = Router();

abasteceRouter.get(
  "/",
  authenticationMiddleware,
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const abastecimentos = await getAbastece();
      return res.status(200).json(abastecimentos);
    } catch (error) {
      next(error);
    }
  }
);

abasteceRouter.get(
  "/relation/",
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const usuarioId = req.query.usuarioId
        ? Number(req.query.usuarioId)
        : undefined;

      const abastecimentos = await getAbasteceRelation(usuarioId);
      return res.status(200).json(abastecimentos);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

abasteceRouter.get(
  "/:id",
  authenticationMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const abastecimento = await getAbasteceById(Number(id));
    return res.status(200).json(abastecimento);
  }
);

abasteceRouter.post(
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
      const novoAbastecimento = await postAbastece(req.body);
      return res.status(201).json(novoAbastecimento);
    } catch (error) {
      next(error);
    }
  }
);

abasteceRouter.put(
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
      const atualizarAbastecimento = await updateAbastecimento(
        Number(id),
        req.body
      );
      return res.status(200).json(atualizarAbastecimento);
    } catch (error) {
      next(error);
    }
  }
);

abasteceRouter.delete(
  "/:id",
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id } = req.params;
      const abasteceDeleted = await removeAbastecimento(Number(id));
      return res.status(200).json(abasteceDeleted);
    } catch (error) {
      next(error);
    }
  }
);

export default abasteceRouter;
