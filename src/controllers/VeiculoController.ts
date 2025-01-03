import { NextFunction, Request, Response, Router } from "express";
import {
  desativaVeiculo,
  getVeiculo,
  getVeiculoById,
  getVeiculoRelation,
  getVeiculoRelationById,
  postVeiculo,
  removeVeiculo,
  updateVeiculo,
} from "../repositories/VeiculoRepository";

const veiculoRouter = Router();

veiculoRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const veiculos = await getVeiculo();
      return res.status(200).json(veiculos);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

veiculoRouter.get(
  "/relation/",
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const veiculos = await getVeiculoRelation();
      return res.status(200).json(veiculos);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

veiculoRouter.get("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const veiculo = await getVeiculoById(id);
  return res.status(200).json(veiculo);
});

veiculoRouter.get(
  "/relation/:id",
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const veiculo = await getVeiculoRelationById(id);
    return res.status(200).json(veiculo);
  }
);

veiculoRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { error } = await empresaschema.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.details };
      // }
      const novoVeiculo = await postVeiculo(req.body);
      return res.status(201).json(novoVeiculo);
    } catch (error) {
      next(error);
    }
  }
);

veiculoRouter.put(
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
      const atualizarVeiculo = await updateVeiculo(id, req.body);
      return res.status(200).json(atualizarVeiculo);
    } catch (error) {
      next(error);
    }
  }
);

veiculoRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id } = req.params;
      const veiculoDeleted = await removeVeiculo(id);
      return res.status(200).json(veiculoDeleted);
    } catch (error) {
      next(error);
    }
  }
);

veiculoRouter.patch(
  "/veiculoStatus/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id } = req.params;
      const { rodando } = req.body;

      const desativarVeiculo = await desativaVeiculo(id, rodando);
      return res.status(200).json(desativarVeiculo);
    } catch (error) {
      next(error);
    }
  }
);

export default veiculoRouter;
