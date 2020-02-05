// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  direccionBanner: 'http://192.168.33.72:81/api/v1/Banners',
  direccionMenu: 'http://192.168.33.72:81/api/v1/menus',
  direccionPopups: 'http://192.168.33.72:81/api/v1/popups',
  direccionTabs: 'http://192.168.33.72:81/api/v1/tabs',
  direccionUbicanos: 'http://192.168.33.72:81/api/v1/ubicanos',
};
