import { Router } from "express";
import userRouter from "../controllers/UserController";
import AdminRouter from "../controllers/LoginController";
import filialRouter from "../controllers/FilialController";
import combustivelRouter from "../controllers/TipCombustivelController";
import veiculoRouter from "../controllers/VeiculoController";
import relUserVeiRouter from "../controllers/RelUserVeiController";
import revisaoRouter from "../controllers/RevisaoController";
import agendaRouter from "../controllers/AgendaController";
import abasteceRouter from "../controllers/AbasteceController";

const routers = Router();

routers.use("/user", userRouter);
routers.use("/admin", AdminRouter);
routers.use("/filial", filialRouter);
routers.use("/combustivel", combustivelRouter);
routers.use("/veiculo", veiculoRouter);
routers.use("/relUserVei", relUserVeiRouter);
routers.use("/revisao", revisaoRouter);
routers.use("/agenda", agendaRouter);
routers.use("/abastece", abasteceRouter);

export default routers;
