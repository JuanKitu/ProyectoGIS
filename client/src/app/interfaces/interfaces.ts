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
    fuerzaRozamiento:number,
    coeficienteRozamiento:number,
    vueltas:number,
    tiempoActual:number,
    idEnsayo?:number,
    idParametro?:number,
};
export const urlServices= "http://192.168.0.159:3000/api/";