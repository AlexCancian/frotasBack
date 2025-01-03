import { NextFunction, Request, Response, Router } from "express";
import {
  desativaTipCombus,
  getCombustivel,
  getCombustivelById,
  postCombustivel,
  removeTipCombus,
  updateTipComb,
} from "../repositories/TipCombustivelRepository";

const combustivelRouter = Router();

combustivelRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const tipCombus = await getCombustivel();
      return res.status(200).json(tipCombus);
    } catch (error) {
      next(error);
    }
  }
);

combustivelRouter.get(
  "/:id",
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const tipCombus = await getCombustivelById(Number(id));
    return res.status(200).json(tipCombus);
  }
);

combustivelRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { error } = await empresaschema.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.details };
      // }
      const novoTipCombus = await postCombustivel(req.body);
      return res.status(201).json(novoTipCombus);
    } catch (error) {
      next(error);
    }
  }
);

combustivelRouter.put(
  "/atuaTipCombus/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { error } = await Refschema.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.message };
      // }
      const { id } = req.params;
      const atualizarTipCombus = await updateTipComb(Number(id), req.body);
      return res.status(200).json(atualizarTipCombus);
    } catch (error) {
      next(error);
    }
  }
);

combustivelRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id } = req.params;
      const tipCombusDeleted = await removeTipCombus(Number(id));
      return res.status(200).json(tipCombusDeleted);
    } catch (error) {
      next(error);
    }
  }
);

combustivelRouter.patch(
  "/tipCombusStatus/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id } = req.params;
      const { ativo } = req.body;

      const desativarCombustivel = await desativaTipCombus(Number(id), ativo);
      return res.status(200).json(desativarCombustivel);
    } catch (error) {
      next(error);
    }
  }
);

export default combustivelRouter;
