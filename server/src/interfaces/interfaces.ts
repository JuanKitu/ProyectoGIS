import { Optional } from 'sequelize';
import Queue from '../classes/queue';
export const port = {
    "puertoControlador": "/dev/ttyS0",
    "puertoCelda": "/dev/ttyACM0"
}

export const tiempoRespuesta = {
    "tiempoMS": 400
}

export interface AmbienteInterface{
    temperatura?:number,
    humedad?:number,
    horaActual?:Date,
    idAmbiente?:number,
    idEnsayo?:number
};
export interface EnsayoInterface{
    operador?:string,
    distanciaTotal?:number,
    radioTrayectoria?:number,
    materialBola?:string,
    carga?:number,
    diametroBola?:number,
    codigoProbeta?:string,
    durezaProbeta?:number,
    tratamientoProbeta?:string,
    materialProbeta?:string,
    idEnsayo?:number,
    fecha?:string,
    idDato?:number,
    tiempoTotal?:number,
    observaciones?:string
};
export interface ParametroInterface{
    fuerzaRozamiento?:number,
    coeficienteRozamiento?:number,
    vueltas?:number,
    tiempoActual?:number,
    idEnsayo?:number,
    idParametro?:number,
};
export interface UsuarioInterface{
    idUsuario:number,
    legajo:number,
    salt:string,
    hash:string
}
export interface colaDatos{
    id:number,
    dato:any
};
export interface colaDual{
    fuerzas:Queue,
    vueltas:Queue
}

export interface arregloDM{
    arregloDistancias:any[],
    arregloMu:any[]
}

export interface objetoDatos{
    horaInicio?:any,
    horaFin?:any,
    velocidad?:number,
    temperatura?:number,
    humedad?:number
}

export interface EnsayoCreationAttributes extends Optional<EnsayoInterface, "idEnsayo"|"operador"|"fecha"|"distanciaTotal">{};
