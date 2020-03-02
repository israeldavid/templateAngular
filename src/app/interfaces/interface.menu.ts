export interface responseMenu {
    menus: Menu[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Menu {
    empresa:number;
    aplicacion:number;
    nombre: string;
    base64: string;
    urlPage:string;
    fechaCreacion?: string;
    id: number;
  }