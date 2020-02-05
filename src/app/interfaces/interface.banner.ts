export interface responseBanner {
    banners: Banner[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Banner {
    nombre: string;
    base64: string;
    fechaCreacion: string;
    urlImagen:string;
    id: number;
  }