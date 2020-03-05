export interface responseGrupos {
    topics: Grupo[];
    count: number;
    errorResponse?: any;
  }

export interface Grupo{
    idAplication: number,
    nameGroup: string,
    fechaCreacion?:string,
    fechaModificacion?:string,
    id?:string
}