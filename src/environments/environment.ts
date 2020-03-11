// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const direccion = 'http://192.168.33.72:';
const puerto = '81/';
const puertodosn = '84/';
const  api = 'api/v1/';

const direcciondos ='http://192.168.33.52:'
const puertodos = '5051/';
const apidos = 'api/v1/';
const direccionUnida = direcciondos + puertodos + apidos;

export const environment = {
  production: false,

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
  direccionGrupos:direccion + puertodosn + api + 'RegistroTopicos',
  direccionEnvioFCM:direccion + puertodosn + api + 'Notifications/PushNotificationByGroup'
};
