import { randomUUID } from "crypto";
import { Crime } from "./crime.model";

export class Arma {
    public id: string;

    constructor(public modeloArma: string, public qtdbalas: number, public localizacao: string, public crime: Crime) {
        this.id = randomUUID();
    }
}
