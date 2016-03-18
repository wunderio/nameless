var path = require('path');

module.exports = {
  basePath: './assets',
  browserSyncOptions: {
    proxyServer: 'nameless.dev'
  },
  stylesheets: {
    processors: {
      'postcss-mixins': {
        mixinsDir: path.join(__dirname, 'assets', 'postcss', 'mixins')
      },
      'postcss-advanced-variables': {},
      'postcss-color-function': {},
      'postcss-calc': {},
      'postcss-extend': {},
      'postcss-nested': {},
      'postcss-responsive-type': {},
      'postcss-flexbugs-fixes': {},
      'autoprefixer': {
        browsers: ['last 2 versions']
      }
    }
  },
  cssInject: {
    target: path.join('../nameless.libraries.yml'),
    src: path.join('css', 'components', '**', '*.css')
  },
  svgStack: {
    src: path.join('icons', '*.svg'),
    dest: 'images',
    filename: 'iconstack',
    svgSpriteOptions: {
      namespaceClassnames: false
    },
    transform       : [
      {svgo       : {
        plugins : [
          {transformsWithOnePath: true},
          {moveGroupAttrsToElems: false}
        ]
      }}
    ]
  },
  stylelint: {
    src: path.join('postcss', '**', '*.p.css')
  },
  notify: {
    successIcon: path.join(__dirname, 'gulp', 'images', 'success.png'),
    failedIcon: path.join(__dirname, 'gulp', 'images', 'failed.png'),
    errorIcon: path.join(__dirname, 'gulp', 'images', 'error.png')
  },
  backstopTest: {
    gitHook: false
  }
};
