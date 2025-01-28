import { NextFunction, Request, Response, Router } from "express";
import {
  getAgenda,
  getAgendaById,
  getAgendaRelation,
  getAgendaRelationUser,
  postAgenda,
  removerAgenda,
  updateAgenda,
} from "../repositories/AgendaRepository";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const agendaRouter = Router();

agendaRouter.get(
  "/",
  authenticationMiddleware,
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const agendas = await getAgenda();
      return res.status(200).json(agendas);
    } catch (error) {
      next(error);
    }
  }
);

agendaRouter.get(
  "/relation",
  authenticationMiddleware,
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const agendas = await getAgendaRelation();
      return res.status(200).json(agendas);
    } catch (error) {
      next(error);
    }
  }
);

agendaRouter.get(
  "/relationUser",
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const id = Number(req.query.usuarioId);
      const relation = await getAgendaRelationUser(id);
      return res.status(200).json(relation);
    } catch (error) {
      next(error);
    }
  }
);

agendaRouter.get(
  "/:id",
  authenticationMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const agenda = await getAgendaById(Number(id));
    return res.status(200).json(agenda);
  }
);

agendaRouter.post(
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
      const novaAgenda = await postAgenda(req.body);
      return res.status(201).json(novaAgenda);
    } catch (error) {
      next(error);
    }
  }
);

agendaRouter.put(
  "/atuaAgenda/:id",
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
      const atualizarAgenda = await updateAgenda(Number(id), req.body);
      return res.status(200).json(atualizarAgenda);
    } catch (error) {
      next(error);
    }
  }
);

agendaRouter.delete(
  "/:id",
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id } = req.params;
      const agendaDeleted = await removerAgenda(Number(id));
      return res.status(200).json(agendaDeleted);
    } catch (error) {
      next(error);
    }
  }
);

export default agendaRouter;
