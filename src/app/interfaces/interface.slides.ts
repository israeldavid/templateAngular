export interface responseSlides {
    slides: Slider[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Slider {
    idAplicacion:number;
    idEmpresa:number;
    nombre: string;
    base64: string;
    fechaCreacion?: string;
    urlImagen:string;
    estado:string;
    id?: number;
}