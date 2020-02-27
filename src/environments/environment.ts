// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const direccion = 'http://192.168.33.72:';
const  puerto = '81/';
const  api = 'api/v1/';

export const environment = {
  production: false,

  direccionLogin: direccion + puerto + api + 'Login/ValidateLogin',
  direccionBanner: direccion + puerto + api + 'banners',
  direccionMenu: direccion + puerto + api + 'menus',
  direccionPopups: direccion + puerto + api + 'popups',
  direccionTabs: direccion + puerto + api + 'tabs',
  direccionSlides: direccion + puerto + api + 'slides',
  direccionUbicanos: direccion + puerto + api + 'ubicanos',
};
