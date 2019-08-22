let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const OUTPUT_DIRECTORY = 'public/build/';
const OUTPUT_JS_DIRECTORY = OUTPUT_DIRECTORY + 'js/';
const OUTPUT_CSS_DIRECTORY = OUTPUT_DIRECTORY + 'css/';

mix.js('resources/assets/js/home/layout/app.js', OUTPUT_JS_DIRECTORY)
  .js('resources/assets/js/mobile/layout/mobile.js', OUTPUT_JS_DIRECTORY)
  .sass('resources/assets/sass/app.scss', OUTPUT_CSS_DIRECTORY)
  .sass('resources/assets/sass/mobile/mobile.scss', OUTPUT_CSS_DIRECTORY)
  .sass('resources/assets/sass/mobile/auth.scss', OUTPUT_CSS_DIRECTORY)
  .version();
