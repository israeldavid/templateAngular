export interface AuthResponse {
    login: Login;
    userEntity: UserEntity;
    errorResponse?: any;
  }
  
  interface UserEntity {
    cedula: string;
    nombres: string;
    apellidos: string;
    celular: string;
    correo: string;
    fotoB64: string;
    usuario:string;
    id: number;
  }

  interface Login {
    token: string;
    refreshToken: string;
    clave?: any;
    id: number;
  }