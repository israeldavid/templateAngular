export interface responseCoordenada {
    coordenadas: Coordenada[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Coordenada {
    empresa:number,
    aplicacion:number,
    nombre: string,
    longitud: string,
    latitud: string,
    fechaCreacion?: string,
    id: number
  }