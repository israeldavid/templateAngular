export interface responseGrupos {
    topics: Grupo[];
    count: number;
    errorResponse?: any;
  }

export interface Grupo {
    idAplication: number,
    nameGroup: string,
    fechaCreacion?: string,
    fechaModificacion?: string,
    id?: string
}

export interface GrupoXid {
  topic: Grupo;
  errorResponse?: any;
}

export interface MetricsNotification{
  metricsNotification: Metricas[];
}
export interface Metricas {
    enviados: number;
    recibidos: number;
    leidos: number;
    fechaEnvio?: string;
    id?: number;
}
