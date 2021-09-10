export interface Componente{
    icon:string;
    name:string;
    redirectTo:string;
};
export interface Ensayo{
    operador:string,
    distanciaTotal:number,
    radioTrayectoria:number,
    materialBola:string,
    carga:number,
    diametroBola:number,
    codigoProbeta:string,
    durezaProbeta:number,
    tratamientoProbeta:string,
    materialProbeta:string,
    idEnsayo?:number,
    fecha?:Date,
    idDato?:number,
    tiempoTotal?:number,
    observaciones?:string
};
export interface Parametro{
    fuerzaRozamiento?:number,
    coeficienteRozamiento?:number,
    vueltas?:number,
    tiempoActual?:number,
    idEnsayo?:number,
    idParametro?:number,
};
export interface PuntoGrafico{
    distancia?:string,
    mu?:number
}
export interface ArrayPuntos{
    arregloDistancias?:string[],
    arregloMu?:number[]
}
export interface DatosEnsayo{
    horaInicio?:string,
    horaFin?:string,
    velocidad?:number,
    temperatura?:number,
    humedad?:number
}
export interface UsuarioLogin{
    cuenta:string,
    password:string
};
export interface UsuarioLocal{
    idUsuario?:number,
    nombreUsuario?:string,
    email?:string,
    legajo?:number
};
export interface RespuestaLogin{
    id:number,
    ok:boolean,
    token:string,
    usuario:UsuarioLocal
}
export interface ControlIdEnsayo{
    idEnsayo:number
}
export interface UsuarioRegister{
    idUsuario?:number,
    legajo?:number,
    email?:string,
    password?:string,
    repassword?:string
    nombreUsuario?:string
}
const domIP= "192.168.0.69";
export const urlSocket= `http://${domIP}:3000`;
export const urlServices= `${urlSocket}/api/`;
