export interface responseAplicacion {
    aplicacion: Aplicacion[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Aplicacion {
    id:number;
    empresa:number,
    nombre: string;
    fechaCreacion?: string;
  }