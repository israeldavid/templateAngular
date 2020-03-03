export interface responseEmpresa {
    empresas: Empresa[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Empresa {
    id?:number,
    nombre: string,
    estado:string,
    fechaCreacion?: string
  }

  export interface EmpresaXid{
    empresa: Empresa;
    errorResponse?: any;
  }