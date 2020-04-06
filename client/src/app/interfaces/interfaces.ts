export interface Componente{
    icon:string;
    name:string;
    redirectTo:string;
}
export interface Ensayo{
    nroEnsayo: number,
    operador:string,
    codigoProbeta:string,
    dureza:number,
    tratamiento:string,
    materialProbeta:string,
    idEnsayo?:number,
    fecha?:Date,
    observaciones?:string
}