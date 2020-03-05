export interface responsePopups {
    popups: Popups[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Popups {
    idEmpresa:number;
    idAplicacion:number;
    nombre: string;
    base64: string;
    estado?:string;
    fechaCreacion?: string;
    id?: number;
  }

  export interface PopupxId{
    popup: Popups;
    errorResponse?: any;
  }