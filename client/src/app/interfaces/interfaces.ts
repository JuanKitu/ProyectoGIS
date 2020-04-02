export interface Componente{
    icon:string;
    name:string;
    redirectTo:string;
}
export interface Ensayo{
    idEnsayo:number,
    nroEnsayo: number,
    operador:string,
    Ensayo:{
        codigoProbeta:string,
        dureza:number,
        tratamiento:string,
        materialProbeta:string
    },
    fecha?:Date,
    observaciones?:string
}