import express from "express";
import { CriminosoController } from "./controllers/criminoso.controller";

const app = express();
app.use(express.json());

//Instanciar

const criminosoController = new CriminosoController();

//Rotas criminoso
app.post("/criminoso", criminosoController.criarCriminoso);
app.get("/criminoso", criminosoController.listarCriminoso);
app.get("/criminoso/:id", criminosoController.obterCriminosoID);

app.listen(3335, () => {
    console.log("Api rodando");
});
