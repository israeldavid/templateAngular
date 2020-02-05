export interface responseTabs {
    tabs: Tab[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Tab {
    nombre: string;
    base64: string;
    fechaCreacion: string;
    urlPage:string;
    id: number;
  }