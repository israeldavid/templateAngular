export interface responseTabs {
    tabs: Tab[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Tab {
    empresa:number;
    aplicacion:number;
    nombre: string;
    base64: string;
    fechaCreacion?: string;
    urlPage:string;
    id: number;
  }