export interface responseBanner {
    banners: Banner[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Banner {
    idEmpresa:number;
    idAplicacion:number;
    nombre: string;
    base64: string;
    fechaCreacion?: string;
    urlImagen:string;
    id?: number;
  }