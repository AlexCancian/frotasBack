import { NextFunction, Request, Response, Router } from "express";
import { authentication } from "../repositories/UserRepository";


const AdminRouter = Router();

AdminRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { error } = await userLogin.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   throw { status: 401, message: error.details };
      // }
      const token = await authentication(req.body);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
);

export default AdminRouter;