export interface responsePopups {
    popups: Popups[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Popups {
    empresa:number;
    aplicacion:number;
    nombre: string;
    base64: string;
    fechaCreacion?: string;
    urlPage:string;
    id: number;
  }