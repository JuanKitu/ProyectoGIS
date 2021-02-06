import { OAuth2Client } from 'google-auth-library';
import jwt,{ Secret } from 'jsonwebtoken';
import { UsuarioInterface, UsuarioTokenInterface } from '../interfaces/interfaces';
const client = new OAuth2Client('1096762710491-c7d53lpa1n5uju66qi8md97gln49rv1d.apps.googleusercontent.com');

export function createToken(usuario: UsuarioInterface) {
        const claveSecreta: Secret = 'elseed'
        return jwt.sign({
            usuario: usuario
        }, claveSecreta, { expiresIn: 60 * 60 * 24 * 30 });
};



//esta funcion verifica que el token que envia google es valido
export async function verifyGoogle(token:string) {
    console.log('EL TOKEN ESTA SIENDO VERIFICADO');
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '1096762710491-c7d53lpa1n5uju66qi8md97gln49rv1d.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    console.log(ticket.getPayload);
    const payload = ticket.getPayload();
    if(payload){
        console.log('ENVIANDO PAYLOAD');
        const userid = payload['sub'];
        console.log(payload.name);
        console.log(payload.email);
        console.log(payload.picture);
        const usuario:UsuarioTokenInterface={
            nombreUsuario:payload.name,
            email:payload.email,
            img:payload.picture,
            google:true
        };
        return usuario
    }
}