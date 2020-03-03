export interface responseAplicacion {
    aplicaciones: Aplicacion[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Aplicacion {
    id?:number;
    nombre: string;
    estado:string;
    idempresa:number;
    fechaCreacion?: string;
  }

  export interface AppXid{
    aplicacion: Aplicacion;
    errorResponse?: any;
  }
  export interface empresaXApp{
    idEmpresa:number;
  }