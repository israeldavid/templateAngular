export interface responseCoordenada {
    coordenadas: Coordenada[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Coordenada {
    "nombre": string,
    "longitud": string,
    "latitud": string,
    "fechaCreacion": string,
    "id": 1
  }