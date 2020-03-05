export interface responseCoordenada {
    coordenadas: Coordenada[];
    count: number;
    errorResponse?: any;
  }
  
  export interface Coordenada {
    idEmpresa:number,
    idAplicacion:number,
    nombre: string,
    longitud: string,
    latitud: string,
    fechaCreacion?: string,
    id?: number
  }

  export interface CoordenadaXid{
    coordenada: Coordenada;
    errorResponse?: any;
  }