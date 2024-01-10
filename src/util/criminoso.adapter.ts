import { Criminoso } from "@prisma/client";
import { Criminoso as CriminosoBack } from "../models/criminoso.model";

export function adapterCriminoso(criminoso: Criminoso): CriminosoBack {
    const novoCriminoso = new CriminosoBack(
        criminoso.nome,
        criminoso.cidade,
        criminoso.genero,
        criminoso.nacionalidade
    );
    novoCriminoso.id = criminoso.id;

    return novoCriminoso;
}
