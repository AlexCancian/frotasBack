import { NextFunction, Request, Response, Router } from "express";
import {
  adminStatus,
  atualizarSenha,
  desativaUsuario,
  getUsuarioById,
  getUsuarios,
  postUsuario,
  updateUser,
} from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get(
  "/", authenticationMiddleware,
  async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const usuarios = await getUsuarios();
      return res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/:id", authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const usuario = await getUsuarioById(Number(id));
    return res.status(200).json(usuario);
  }
);

userRouter.post(
  "/", authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { error } = await empresaschema.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.details };
      // }
      const novoUsuario = await postUsuario(req.body);
      return res.status(201).json(novoUsuario);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  "/atuaUser/:id", authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { error } = await Refschema.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.message };
      // }
      const { id } = req.params;
      const atualizarUser = await updateUser(Number(id), req.body);
      return res.status(200).json(atualizarUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  "/atuaSenha/:id", authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { error } = await userSenha.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.details };
      // }
      const { id } = req.params;
      const { senha, novaSenha } = req.body;
      const senhacrypto = bcrypt.hashSync(novaSenha, 8) as string;
      const senhaUpdated = await atualizarSenha(Number(id), {
        senha,
        senhacrypto,
      });
      return res.status(200).json(senhaUpdated);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.patch(
  "/statusAdmin/:id", authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { error } = await userPatchAdmin.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.details };
      // }
      const { id } = req.params;
      const { admin } = req.body;

      const adminis = await adminStatus(Number(id), admin);
      return res.status(200).json(admin);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.patch(
  "/userStatus/:id", authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const desativaUser = await desativaUsuario(Number(id), status);
      return res.status(200).json(desativaUser);
    } catch (error) {
      next(error);
    }
  }
);

// userRouter.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const empresaDeleted = await removeEmpresa(Number(id));
//     return res.status(200).json(empresaDeleted);
//   } catch (error) {
//     next(error);
//   }
// });

export default userRouter;
