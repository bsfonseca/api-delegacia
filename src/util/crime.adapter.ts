import { Crime } from "@prisma/client";
import { Crime as CrimeBack } from "../models/crime.model";
import { Criminoso } from "../models/criminoso.model";

export function adapterCrime(crime: Crime, criminoso: Criminoso): CrimeBack {
    const novoCrime = new CrimeBack(crime.tipoCrime, crime.boletim, crime.localizacao, criminoso);
    novoCrime.id = crime.id;

    return novoCrime;
}
