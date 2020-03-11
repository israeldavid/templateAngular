export interface responsePermisos {
    permisos: Permiso[];
    count: number;
    errorResponse?: any;
  }

export interface Permiso {
    nombre: string,
    estado: string,
    idEmpresa: number,
    idAplicacion: number,
    idRol: number,
    idMenu: number,
    aplicacion?: string,
    empresa?: string,
    fechaCreacion?: string,
    id?: number
}

export interface PermisoxId{
  permiso: Permiso;
  errorResponse?: any;
}

