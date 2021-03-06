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
    aplicacion?: string,
    empresa?: string,  
    fechaCreacion?:string,
    id?:number
}

export interface RolxId{
  rol: Rol;
  errorResponse?: any;
}

