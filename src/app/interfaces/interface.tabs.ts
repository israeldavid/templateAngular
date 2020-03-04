export interface responseTabs {
    tabs: Tab[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Tab {
    idEmpresa:number;
    idAplicacion:number;
    nombre: string;
    base64: string;
    estado:string;
    fechaCreacion?: string;
    urlPage:string;
    id?: number;
  }

  export interface TabXid{
    tab: Tab;
    errorResponse?: any;
  }