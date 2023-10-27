const path = require('path');

module.exports = env => ({
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'infotracker.js',
    library: 'InfoTracker',
    libraryTarget: 'umd'
  },
  mode: env.mode ? env.mode : 'development',
  watch: env.watch
});
