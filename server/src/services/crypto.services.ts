import crypto from 'crypto'
import { CifradoInterface } from '../interfaces/interfaces';

export function encriptarPassword(password: string):Promise<CifradoInterface>{
    let promesa = new Promise<CifradoInterface>((resolve, reject) => {
        //creamos la salt
        const salt: string = crypto.randomBytes(128).toString("base64");
        //encriptamos la pass con la salt creada
        crypto.pbkdf2(password, salt, 100, 64, 'sha512', async (err, derivedKey) => {
            const cifrado: CifradoInterface = {
                hash: derivedKey.toString('hex'),
                salt,
            }
            resolve(cifrado)
            if (err) {
                reject(err)
            };
        });
    });
    return promesa;
};
export function verificarPassword(password:string, salt:string):Promise<string>{
    let promesa = new Promise<string>((resolve, reject)=>{
        crypto.pbkdf2(password, salt, 100, 64, 'sha512', (err, derivedKey) => {
            const nuevoHash:string = derivedKey.toString('hex');
            resolve(nuevoHash);
            if (err){
                reject(err);
            };
        });
    });
    return promesa;
}