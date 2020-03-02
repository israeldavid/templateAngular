export interface responseAplicacion {
    aplicacion: Aplicacion[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Aplicacion {
    id:number;
    nombre: string;
    fechaCreacion?: string;
  }