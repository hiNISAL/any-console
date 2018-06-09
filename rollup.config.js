import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';

import { writeFileSync } from 'fs';

const isDev = process.env.NODE_ENV === 'development';
const minify = process.env.MINIFY;

const config = {
  input: 'src/index.js',
  output: {
    file: 'release/any-console.js',
    format: 'umd',
    name: 'AnyConsole'
  },
  plugins: [
    postcss({
      extensions: ['.css', '.scss']
    })
  ]
};

if (isDev) {
  config.plugins.push(
    serve({
      port: 8080,
      open: true,
      contentBase: './',
      historyApiFallback: true,
      host: '0.0.0.0'
    }),
  );

  config.plugins.push(
    livereload()
  );
  
} else {
  if (minify === 'true') {
    config.output.file = 'release/any-console.min.js';
    config.plugins.push(uglify.uglify());
  } else {
    config.output.file = 'release/any-console.js';
  }

  config.plugins.push(
    babel()
  )
}

export default config;
