import { randomUUID } from "crypto";
import { Criminoso } from "./criminoso.model";

export class Crime {
    public id: string;
    constructor(
        public tipoCrime: string,
        public boletim: number,
        public localizacao: string,
        public criminoso: Criminoso
    ) {
        this.id = randomUUID();
    }
}
