const { isAbsolute, join } = require('path');
const { stringifyRequest } = require('loader-utils');
const {
  stringify,
  stringifySymbol,
  generateImport,
  generateExport,
  generateSpritePlaceholder
} = require('./utils');

/**
 * @param {Object} params
 * @param {SpriteSymbol} params.symbol - Sprite symbol instance {@see https://git.io/v9k8g}
 * @param {SVGSpriteLoaderConfig} params.config - Parsed loader config
 * @param {string} params.context - Context folder of current processing module
 * @param {Object} params.loaderContext {@see https://webpack.js.org/api/loaders/#the-loader-context}
 * @return {string}
 */
function Generator(params) {
  const { svgSprite, config, context, loaderContext } = params;
  const { extract, esModule, spriteModule, symbolModule, runtimeCompat, publicPath } = config;
  let runtime;

  // if (extract) {
  //   // const spritePlaceholder = generateSpritePlaceholder(symbol.request.file);
  //   // const path = stringify(publicPath) || '__webpack_public_path__';
  //   // const data = `{
  //   //   id: ${stringify(symbol.useId)},
  //   //   viewBox: ${stringify(symbol.viewBox)},
  //   //   url: ${path} + ${stringify(spritePlaceholder)},
  //   //   toString: function () {
  //   //     return this.url;
  //   //   }
  //   // }`;
  //   // runtime = generateExport(data, esModule);
  // } else {
  //   // const spriteModuleAbsPath = isAbsolute(spriteModule) ? spriteModule : join(context, spriteModule);
  //   // const symbolModuleAbsPath = isAbsolute(symbolModule) ? symbolModule : join(context, symbolModule);

  //   // const spriteModuleImport = stringifyRequest(loaderContext, spriteModuleAbsPath);
  //   // const symbolModuleImport = stringifyRequest(loaderContext, symbolModuleAbsPath);

  //   // runtime = [
  //   //   generateImport('SpriteSymbol', symbolModuleImport, esModule),
  //   //   generateImport('sprite', spriteModuleImport, esModule),

  //   //   `var symbol = new SpriteSymbol(${stringifySymbol(symbol)})`,
  //   //   'var result = sprite.add(symbol)',

  //   //   generateExport(runtimeCompat ? '"#" + symbol.id' : 'symbol', esModule)
  //   // ].join(';\n');
  // }

  runtime = [
    generateImport('sprite', require.resolve('../runtime'), esModule),
    `var result = sprite.add('${svgSprite}')`,
    `sprite.mount()`,
  ].join(';\n');

  return runtime;
}

module.exports = Generator;
