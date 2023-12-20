import { randomUUID } from "crypto";

export class Criminoso {
    public id: string;

    constructor(
        public nome: string,
        public cidade: string,
        public genero: string,
        public nacionalidade: string,
        public idade?: number
    ) {
        this.id = randomUUID();
    }
}
