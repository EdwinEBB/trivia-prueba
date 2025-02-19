import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService {
    //private readonly Salt=10;


    async HashContra(contraseñaP:string):Promise<string> {
        return bcrypt.hash(contraseñaP, 10)
    }

    async CompareContra(contraseñaPlana:string, contraseñaHashed:string): Promise<Boolean> {
        return bcrypt.compare(contraseñaPlana,contraseñaHashed)
    }

    
}
