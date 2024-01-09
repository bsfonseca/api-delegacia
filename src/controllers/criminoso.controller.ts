import { Request, Response } from "express";
import { Criminoso } from "../models/criminoso.model";
import repository from "../database/prisma.repository";

export class CriminosoController {
    public async criarCriminoso(req: Request, res: Response) {
        try {
            const { nome, cidade, genero, nacionalidade } = req.body;

            if (!nome || !cidade || !genero || !nacionalidade) {
                return res.status(400).send({
                    ok: false,
                    message: "Preencha todos os campos",
                });
            }
            const criminoso = new Criminoso(nome, cidade, genero, nacionalidade);

            const result = await repository.criminoso.create({
                data: criminoso,
            });

            return res.status(201).send({
                ok: true,
                message: "Registro efetuado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    //Listar um criminoso

    public async listarCriminoso(req: Request, res: Response) {
        try {
            const result = await repository.criminoso.findMany();
            return res.status(200).send({
                ok: true,
                message: "Listado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return error.toString();
        }
    }
}
