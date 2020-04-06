export interface Componente{
    icon:string;
    name:string;
    redirectTo:string;
}
export interface Ensayo{
    nroEnsayo: number,
    operador:string,
    Probeta:{
        codigoProbeta:string,
        dureza:number,
        tratamiento:string,
        materialProbeta:string,
        idProbeta?:number
    },
    idEnsayo?:number,
    fecha?:Date,
    observaciones?:string
}