export interface responseTheme {
    themes: Theme[];
    count: number;
    errorResponse?: any;
  }

export interface Theme{
    nombre: string;
    descripcion: string;
    idEmpresa?: number;
    idAplicacion?: number;
    estado?: string;
    id?:number;
}

export interface ThemeXid{
    tema: Theme;
    errorResponse?: any;
}
