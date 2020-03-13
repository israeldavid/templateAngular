export interface responseTheme {
    temas: Tema[];
    count: number;
    errorResponse?: any;
  }

export interface Tema{
    nombre: string;
    descripcion: string;
    idEmpresa?: number;
    idAplicacion?: number;
    estado?: string;
    id?:number;
}

export interface ThemeXid{
    tema: Tema;
    errorResponse?: any;
}
