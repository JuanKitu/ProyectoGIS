export interface Componente{
    icon:string;
    name:string;
    redirectTo:string;
}
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
    observaciones?:string
}