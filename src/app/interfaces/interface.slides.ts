export interface responseSlides {
    slides: Slider[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Slider {
    aplicacion:number;
    empresa:number;
    nombre: string;
    base64: string;
    fechaCreacion?: string;
    urlImagen:string;
    id: number;
}