import { Optional } from 'sequelize';
import Queue from '../classes/queue';
export const port = {
    "puertoControlador": "/dev/ttyACM0",
    "puertoCelda": "/dev/ttyS0"

    /* "puertoControlador": "COM2",
    "puertoCelda": "COM4" */
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
    nombreUsuario?:string,
    legajo?:number,
    salt:string,
    hash:string,
    email?:string
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
    //velocidad?:number,
    temperatura?:number,
    humedad?:number
}

export interface UsuarioTokenInterface {
    idUsuario?: number,
    nombreUsuario?:string,
    email?:string,
    img?:string,
    google?:boolean
};

export interface CifradoInterface{
    hash:string,
    salt:string,
}
export interface EnsayoCreationAttributes extends Optional<EnsayoInterface, "idEnsayo"|"operador"|"fecha"|"distanciaTotal">{};
