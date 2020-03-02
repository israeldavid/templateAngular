export interface responseEmpresa {
    empresa: Empresa[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Empresa {
    id?:number,
    nombre: string,
    estado:string,
    fechaCreacion?: string
  }