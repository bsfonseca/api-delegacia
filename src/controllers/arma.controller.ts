import { Request, Response } from "express";
import repository from "../database/prisma.repository";
import { adapterCrime } from "../util/crime.adapter";
import { adapterCriminoso } from "../util/criminoso.adapter";
import { Arma } from "../models/arma.model";
import { Crime } from "../models/crime.model";

export class ArmaController {
    public async criarArma(req: Request, res: Response) {
        try {
            const { id, idCrime } = req.params;

            const { modeloArma, qtdbalas, localizacao } = req.body;

            if (!modeloArma || !qtdbalas || !localizacao) {
                return res.status(400).send({
                    ok: false,
                    message: "Campos não informados",
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

            const crime = await repository.crime.findUnique({
                where: {
                    id: idCrime,
                },
            });
            if (!crime) {
                return res.status(404).send({
                    ok: false,
                    message: "Crime não existe",
                });
            }

            const CriminosoBack = adapterCriminoso(criminoso);

            const CrimeBack = adapterCrime(crime, CriminosoBack);

            const arma = new Arma(modeloArma, qtdbalas, localizacao, CrimeBack);

            const result = await repository.arma.create({
                data: {
                    id: arma.id,
                    qtdBalas: arma.qtdbalas,
                    modeloArma: arma.modeloArma,
                    localizacao: arma.localizacao,
                    idCrime: crime.id,
                },
            });

            return res.status(201).send({
                ok: true,
                message: "Arma registrada com sucesso.",
                data: result,
            });
        } catch (error: any) {
            return res.status(404).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async listarArma(req: Request, res: Response) {
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
                    message: "Criminoso não existente",
                });
            }

            const crime = await repository.crime.findUnique({
                where: {
                    id,
                },
            });
            if (!crime) {
                return res.status(404).send({
                    ok: false,
                    message: "Crime não existente",
                });
            }
            const armas = await repository.arma.findMany({
                where: {
                    idCrime: id,
                },
            });
            return res.status(200).send({
                ok: true,
                message: "Listado com sucesso",
                data: armas,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                messsage: error.toString(),
            });
        }
    }
}
