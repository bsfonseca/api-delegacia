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

    //Listar criminoso pelo ID

    public async obterCriminosoID(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const criminoso = await repository.criminoso.findUnique({
                where: {
                    id,
                },
            });

            if (!criminoso) {
                return res.status(404).send({
                    ok: false,
                    message: "Criminoso não encontrado",
                });
            }
            return res.status(200).send({
                ok: true,
                message: "Criminoso obtido com sucesso",
                data: criminoso,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    //Atualizar criminoso
    public async atualizarCriminoso(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, cidade, genero, nacionalidade } = req.body;

            if (!nome) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe o nome completo para atualizar",
                });
            }
            const criminoso = await repository.criminoso.findUnique({
                where: {
                    id,
                },
            });

            if (!criminoso) {
                return res.status(400).send({
                    ok: false,
                    message: "Criminoso nã encontrado",
                });

                //Dados para atualizar

                const result = await repository.criminoso.update({
                    where: {
                        id,
                    },
                    data: {
                        nome,
                        cidade,
                        genero,
                        nacionalidade,
                    },
                });

                return res.status(200).send({
                    ok: true,
                    message: "Criminoso atualizado com sucesso",
                    data: result,
                });
            }
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
