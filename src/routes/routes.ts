import { Router } from "express";
import userRouter from "../controllers/UserController";
import AdminRouter from "../controllers/LoginController";
import filialRouter from "../controllers/FilialController";
import combustivelRouter from "../controllers/TipCombustivel";
import veiculoRouter from "../controllers/Veiculo";
import relUserVeiRouter from "../controllers/RelUserVei";
import revisaoRouter from "../controllers/Revisao";
import agendaRouter from "../controllers/AgendaController";

const routers = Router();

routers.use("/user", userRouter);
routers.use("/admin", AdminRouter);
routers.use("/filial", filialRouter);
routers.use("/combustivel", combustivelRouter);
routers.use("/veiculo", veiculoRouter);
routers.use("/relUserVei", relUserVeiRouter);
routers.use("/revisao", revisaoRouter);
routers.use("/agenda", agendaRouter);

export default routers;
