export interface Componente{
    icon:string;
    name:string;
    redirectTo:string;
}
export interface Ensayo{
    idEnsayo:number,
    nroEnsayo: number,
    fecha:Date,
    operador:string,
    observaciones:Text
}