import { fork } from "child_process";
import moment from "moment";
import Server from "../classes/server";
import { arregloDM, EnsayoInterface, ParametroInterface } from "../interfaces/interfaces";

const server = Server.instance;

function isParametro(object: any): object is ParametroInterface {
    return 'fuerzaRozamiento' in object;
}

let arreglosDM: arregloDM = {
    arregloDistancias: [],
    arregloMu: []
};

export const  iniciarPrueba = async (elEnsayo: EnsayoInterface) => {

    let velocidadAnterior: number = 0;
    let distanciaAnterior: number = 0;
    let tiempoAnterior: number = 0;
    let distanciaActual: number = 0;
    let velocidadActual: number = 0;

    const horaDeInicio = (moment().format('HH:mm:ss'));
    //const hijoPFV = fork('../server/dist/serialport/Serialport.js', ['normal']);
    const hijoPFV = fork('../server/dist/serialport/inicioPrueba.js', ['normal']);
    hijoPFV.send(elEnsayo);
    hijoPFV.on('message', (M: any) => {
        if (server.consultarProcesando() === true) {
            if (typeof (M) == "object") {
                if (isParametro(M) && M.vueltas !== undefined && elEnsayo.radioTrayectoria !== undefined) {
                    const punto = {
                        //Distancia recorrida en mm
                        distancia: (((M.vueltas) * (2 * Math.PI * elEnsayo.radioTrayectoria)).toFixed(2)).toString(),
                        mu: M.coeficienteRozamiento
                    };
                    console.log('DISTANCIA RECORRIDA EN mm ', punto.distancia);
                    console.log('DISTANCIA RECORRIDA EN m ', parseFloat(punto.distancia) / 1000);
                    console.log('VUELTAS RECORRIDA ', M.vueltas);
                    arreglosDM.arregloDistancias.push(punto.distancia);
                    arreglosDM.arregloMu.push(punto.mu);
                    server.setearArray(arreglosDM);
                    distanciaActual = parseFloat(punto.distancia) / 10;
                    if (M.tiempoActual != undefined) {
                        velocidadActual = (distanciaActual - distanciaAnterior) / (M.tiempoActual - tiempoAnterior);
                        if (velocidadActual > 12) {
                            velocidadActual = velocidadAnterior;
                        } else {
                            velocidadAnterior = velocidadActual;
                        }
                        distanciaAnterior = distanciaActual;
                        tiempoAnterior = M.tiempoActual;
                    }
                    server.io.emit('parametros', punto);
                } else {
                    console.log('AMBIENTE A MANDAR: ', M);
                    server.setearAmbiente(M);
                    M.horaInicio = horaDeInicio;
                    M.horaFin = (moment().format('HH:mm:ss'));
                    M.velocidad = velocidadActual;
                    console.log('Ambiente: ', M);
                    server.io.emit('ambiente', M);
                }
            }
            if (typeof (M) == "string") {
                if (M === 'PARAMETROS AGREGADOS') {
                    setTimeout(() => {
                        arreglosDM.arregloDistancias = [];
                        arreglosDM.arregloMu = [];
                        server.setearAmbiente(arreglosDM);
                        console.log('FIN PETICION');
                        hijoPFV.kill();
                        console.log('FIN PETICION 2');
                        server.setearEnsayo(-1);
                        server.io.emit('respuestaUso', -1);
                        server.setearProcesando(false);
                        server.io.emit('fin', 'FIN');
                        return 'PRUEBA FINALIZADA';
                    }, 1000);
                }
            }
        } else {
            hijoPFV.send('CANCELAR');
            arreglosDM.arregloDistancias = [];
            arreglosDM.arregloMu = [];
            server.setearArray(arreglosDM);
            server.setearEnsayo(-1);
            server.io.emit('respuestaUso', -1);
            server.setearProcesando(false);
            setTimeout(() => {
                hijoPFV.kill();
                console.log('FIN PETICION');
                return 'PRUEBA CANCELADA';
            }, 1000)

        }


    });

}