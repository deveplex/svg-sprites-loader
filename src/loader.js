const { interpolateName, getOptions } = require('loader-utils');
// const urlSlug = require('url-slug');

const { NAMESPACE } = require('./config');
const Exceptions = require('./exceptions');
const config = require('./config').loader;

// TODO: find better parser/tokenizer
var regexSequences = [
    // Remove XML stuffs and comments
    [/<\?xml[\s\S]*?>/gi, ""],
    [/<!doctype[\s\S]*?>/gi, ""],
    [/<!--[\s\S]*?-->/gi, ""],

    // SVG XML -> HTML5
    [/\<([A-Za-z]+)([^\>]*)\/\>/g, "<$1$2></$1>"], // convert self-closing XML SVG nodes to explicitly closed HTML5 SVG nodes
    [/\s+/g, " "],                                 // replace whitespace sequences with a single space
    [/\> \</g, "><"]                               // remove whitespace between tags
];

// eslint-disable-next-line consistent-return
module.exports = function loader(content) {
    this.cacheable && this.cacheable();

    const done = this.async();
    const loaderContext = this;
    const { resourcePath, loaderIndex } = loaderContext;
    // webpack 1 compat
    const resourceQuery = loaderContext.resourceQuery || '';
    const compiler = loaderContext._compiler;
    const isChildCompiler = compiler.isChild();
    const parentCompiler = isChildCompiler ? compiler.parentCompilation.compiler : null;
    const matchedRules = getOptions(loaderContext);

    if (!content.includes('<svg')) {
        throw new Exceptions.InvalidSvg(content, matchedRules);
    }

    let generator;
    try {
        generator = require('./generator'); // eslint-disable-line import/no-dynamic-require,global-require
    } catch (e) {
        throw new Exceptions.InvalidRuntimeException(e.message);
    }

    var svgSprite = regexSequences.reduce(function (prev, regexSequence) {
        return ''.replace.apply(prev, regexSequence);
    }, content).trim();

    //var symbols = svgSprite.match(/(<symbol[^>][\s\S]*?<\/symbol>)/g);

    const runtime = generator({ svgSprite, config, context: loaderContext.context, loaderContext });
    done(null, runtime);
};

module.exports.NAMESPACE = NAMESPACE;
