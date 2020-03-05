export interface responseRoles {
    roles: Rol[];
    count: number;
    errorResponse?: any;
  }

export interface Rol{
    nombre:string,
    idAplicacion:number,
    idEmpresa:number,
    estado:string,
    fechaCreacion?:string,
    id?:number
}

