export interface responseMenu {
    menus: Menu[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Menu {
    idEmpresa:number;
    idAplicacion:number;
    nombre: string;
    base64: string;
    urlPage:string;
    estado:string;
    fechaCreacion?: string;
    id?: number;
  }

  export interface MenuXid {
    menu: Menu;
    errorResponse?: any;
  }