export interface responseSlides {
    slides: Slider[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Slider {
    nombre: string;
    base64: string;
    fechaCreacion?: string;
    urlImagen:string;
    id: number;
}