import express from "express";
import { CriminosoController } from "./controllers/criminoso.controller";
import { CrimeController } from "./controllers/crime.controller";
import { ArmaController } from "./controllers/arma.controller";

const app = express();
app.use(express.json());

//Instanciar

const criminosoController = new CriminosoController();

const crimeController = new CrimeController();

const armaController = new ArmaController();

//Rotas criminoso
app.post("/criminoso", criminosoController.criarCriminoso);
app.get("/criminoso", criminosoController.listarCriminoso);
app.get("/criminoso/:id", criminosoController.obterCriminosoID);
app.put("/criminoso/:id", criminosoController.atualizarCriminoso);
app.delete("/criminoso/:id", criminosoController.deletarCriminoso);

//Rotas crime
app.post("/criminoso/:id/crime", crimeController.criarCrime);
app.get("/criminoso/:id/crime", crimeController.listarCrime);

//Rotas Arma
app.post("/criminoso/:id/crime/:idCrime/arma", armaController.criarArma);
app.get("/criminoso/:id/crime/:idCrime/arma", armaController.listarArma);

app.listen(3335, () => {
    console.log("Api rodando");
});
