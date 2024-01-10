import { Request, Response } from "express";
import repository from "../database/prisma.repository";
import { adapterCriminoso } from "../util/criminoso.adapter";
import { Crime } from "../models/crime.model";

export class CrimeController {
    public async criarCrime(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { tipoCrime, boletim, localizacao } = req.body;

            if (!tipoCrime || !boletim || !localizacao) {
                return res.status(400).send({
                    ok: false,
                    message: "Campos não informados",
                });
            }

            if (boletim > 32000) {
                return res.status(400).send({
                    ok: false,
                    message: "Valor não permitido para o campo boletim. Informe número abaixo de 32000",
                });
            }
            const criminoso = await repository.criminoso.findUnique({
                where: {
                    id,
                },
            });
            if (!criminoso) {
                return res.status(404).send({
                    ok: false,
                    message: "Criminoso não existe",
                });
            }
            //Prisma para o Backend
            const CriminosoBack = adapterCriminoso(criminoso);

            // Model backend para crime
            const crime = new Crime(tipoCrime, boletim, localizacao, CriminosoBack);

            // Para salvar no BD
            const result = await repository.crime.create({
                data: {
                    id: crime.id,
                    tipoCrime: crime.tipoCrime,
                    boletim: crime.boletim,
                    localizacao: crime.localizacao,
                    idCriminoso: criminoso.id,
                },
            });
            return res.status(201).send({
                ok: true,
                message: "Crime registrado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(404).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
    //Listar crimes
    public async listarCrime(req: Request, res: Response) {
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
                    message: "Criminoso não existe",
                });
            }
            const crimes = await repository.crime.findMany({
                where: {
                    idCriminoso: id,
                },
            });

            return res.status(200).send({
                ok: true,
                message: "Listado com sucesso",
                data: crimes,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
