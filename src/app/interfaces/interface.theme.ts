export interface responseTheme {
    themes: Theme[];
    count: number;
    errorResponse?: any;
  }

export interface Theme{
    nombre: string;
    descripcion: string;
    idEmpresa: number;
    idAplicacion: number;
    estado: string;
}

export interface ThemeXid{
    theme: Theme;
    errorResponse?: any;
}
