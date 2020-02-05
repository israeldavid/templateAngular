export interface responseMenu {
    menus: Menu[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Menu {
    nombre: string;
    base64: string;
    fechaCreacion: string;
    urlPage:string;
    id: number;
  }