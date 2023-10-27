const path = require('path');

module.exports = (env) => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'infotracker.js',
    library: {
      name: 'InfoTracker',
      type: 'umd',
      export: 'default',
    },
  },
  mode: env.mode ? env.mode : 'development',
  watch: env.watch,
});
