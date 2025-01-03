import "reflect-metadata";
import express from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware";
import routers from "./routes/routes";
import connectionFrotas from "./dataBase/data";

const app = express();
app.get("/", (req, res) => {
  res.send(`<h1>Bem-vindo ao CRUD do Frotas!</h1>`);
});

app.use(cors());

app.use(express.json());
app.use(routers);

app.use(errorMiddleware);

connectionFrotas
  .initialize()
  .then(async () => {
    console.log("Database Frotas Coop iniciado");

    app.listen(process.env.PORT || 3335, () => {
      console.log("Server started on port 3335!");
    });
  })
  .catch((error) => {
    console.error("Erro ao iniciar Database Frotas", error);
  });
