const direccion = 'http://192.168.33.72:';
const puerto = '81/';
const puertodosn = '84/';
const  api = 'api/v1/';

const direcciondos ='http://192.168.33.52:'
const puertodos = '5051/';
const apidos = 'api/v1/';
const direccionUnida = direcciondos + puertodos + apidos;

export const environment = {
  production: true,
  //direccionLogin: direccion + puerto + api + 'Login/ValidateLogin',
  direccionLogin: direccionUnida + 'Login/ValidateLogin',
  //direccionBanner: direccion + puerto + api + 'banners',
  direccionBanner: direccionUnida + 'Banners',
  direccionMenu: direccionUnida + 'Menus',
  direccionPopups: direccionUnida + 'Popups',
  direccionTabs: direccionUnida + 'Tabs',
  direccionSlides: direccionUnida + 'Slides',
  direccionRoles: direccionUnida + 'Roles',
  direccionPermisos: direccionUnida + 'Permisos',
  //direccionUbicanos: direccion + puerto + api + 'coordenadas',
  direccionTheme: direccionUnida + 'temas',
  direccionUbicanos: direccionUnida + 'Coordenadas',
  direccionEmpresa: direccionUnida + 'Empresas',
  direccionAplicacion: direccionUnida + 'Aplicaciones',
  direccionGrupos: direccion + puertodosn + api + 'RegistroTopicos',
  direccionEnvioFCM: direccion + puertodosn + api + 'Notifications/PushNotificationByGroup',
  direccionMetricas: direccion + puertodosn + api + 'NotificationsLog/Metricas',
};
