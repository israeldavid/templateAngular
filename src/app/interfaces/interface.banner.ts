export interface responseBanner {
    banners: Banner[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Banner {
    nombre: string;
    base64: string;
    idEmpresa:number;
    idAplicacion:number;
    estado:string;
    fechaCreacion?: string;
    urlImagen?:string;
    id?: number;
  }

  export interface BannerXid{
    banner: Banner;
    errorResponse?: any;
  }