// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const direccion = 'http://192.168.33.72:';
const  puerto = '81/';
const  api = 'api/v1/';

const direcciondos ='http://192.168.33.52:'
const puertodos = '5051/';
const apidos = 'api/v1/';
const direccionUnida = direcciondos + puertodos + apidos;

export const environment = {
  production: false,

  direccionLogin: direccion + puerto + api + 'Login/ValidateLogin',
  //direccionBanner: direccion + puerto + api + 'banners',
  direccionBanner: direcciondos + 'Banners',
  direccionMenu: direccion + puerto + api + 'menus',
  direccionPopups: direccion + puerto + api + 'popups',
  direccionTabs: direccion + puerto + api + 'tabs',
  direccionSlides: direccion + puerto + api + 'slides',
  //direccionUbicanos: direccion + puerto + api + 'coordenadas',
  direccionUbicanos: direccionUnida + 'Coordenadas',
  direccionEmpresa: direccionUnida + 'Empresas',
  direccionAplicacion: direccionUnida + 'Aplicaciones',
};
