import merge from 'deepmerge';
//import Emitter from 'mitt';
import { namespaces, config } from './browser-sprite.config';
// import {
//arrayFrom,
// parse,
// moveGradientsOutsideSymbol,
// browserDetector as browser,
// getUrlWithoutFragment,
// updateUrls,
// locationChangeAngularEmitter,
// evalStylesIEWorkaround
// } from '../src/utils';

/**
 * Internal emitter events
 * @enum
 * @private
 */
const Events = {
  MOUNT: 'mount',
  SYMBOL_MOUNT: 'symbol_mount'
};

export default class BrowserSprite {
  constructor(options = {}) {
    var cfg = merge({ attrs: namespaces.svg }, options || {});
    this.config = merge(config, cfg || {});
    this.content = null;
    this.node = null;

    // const emitter = Emitter();
    // this._emitter = emitter;

    //const { config } = this;

    // if (config.autoConfigure) {
    //   this._autoConfigure(cfg);
    // }

    // if (config.syncUrlsWithBaseTag) {
    //   const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    //   emitter.on(Events.MOUNT, () => this.updateUrls('#', baseUrl));
    // }

    // const handleLocationChange = this._handleLocationChange.bind(this);
    // this._handleLocationChange = handleLocationChange;

    // // Provide way to update sprite urls externally via dispatching custom window event
    // if (config.listenLocationChangeEvent) {
    //   window.addEventListener(config.locationChangeEvent, handleLocationChange);
    // }

    // // Emit location change event in Angular automatically
    // if (config.locationChangeAngularEmitter) {
    //   locationChangeAngularEmitter(config.locationChangeEvent);
    // }

    // // After sprite mounted
    // emitter.on(Events.MOUNT, (spriteNode) => {
    //   if (config.moveGradientsOutsideSymbol) {
    //     moveGradientsOutsideSymbol(spriteNode);
    //   }
    // });

    // // After symbol mounted into sprite
    // emitter.on(Events.SYMBOL_MOUNT, (symbolNode) => {
    //   if (config.moveGradientsOutsideSymbol) {
    //     moveGradientsOutsideSymbol(symbolNode.parentNode);
    //   }

    //   if (browser.isIE() || browser.isEdge()) {
    //     evalStylesIEWorkaround(symbolNode);
    //   }
    // });
  }

  /**
   * @return {boolean}
   */
  get isMounted() {
    return !!this.node;
  }

  /**
   * Automatically configure following options
   * - `syncUrlsWithBaseTag`
   * - `locationChangeAngularEmitter`
   * - `moveGradientsOutsideSymbol`
   * @param {Object} cfg
   * @private
   */
  // _autoConfigure(cfg) {
  //   const { config } = this;

  //   if (typeof cfg.syncUrlsWithBaseTag === 'undefined') {
  //     config.syncUrlsWithBaseTag = typeof document.getElementsByTagName('base')[0] !== 'undefined';
  //   }

  //   if (typeof cfg.locationChangeAngularEmitter === 'undefined') {
  //     config.locationChangeAngularEmitter = typeof window.angular !== 'undefined';
  //   }

  //   if (typeof cfg.moveGradientsOutsideSymbol === 'undefined') {
  //     config.moveGradientsOutsideSymbol = browser.isFirefox();
  //   }
  // }

  /**
   * @param {Event} event
   * @param {Object} event.detail
   * @param {string} event.detail.oldUrl
   * @param {string} event.detail.newUrl
   * @private
   */
  // _handleLocationChange(event) {
  //   const { oldUrl, newUrl } = event.detail;
  //   this.updateUrls(oldUrl, newUrl);
  // }

  /**
   * Add new symbol. If symbol with the same id exists it will be replaced.
   * If sprite already mounted - `symbol.mount(sprite.node)` will be called.
   * @fires Events#SYMBOL_MOUNT
   * @param {BrowserSpriteSymbol} sprite
   * @return {boolean} `true` - symbol was added, `false` - replaced
   */
  add(content) {
    //const isNewSymbol = super.add(sprite);

    // if (this.isMounted && isNewSymbol) {
    //   mount(this.node);
    //   this._emitter.emit(Events.SYMBOL_MOUNT, this.node);
    // }
    this.content = content;
    //return isNewSymbol;
  }

  /**
   * Attach to existing DOM node
   * @param {string|Element} target
   * @return {Element|null} attached DOM Element. null if node to attach not found.
   */
  // attach(target) {
  //   const sprite = this;

  //   if (sprite.isMounted) {
  //     return sprite.node;
  //   }

  //   /** @type Element */
  //   const node = typeof target === 'string' ? document.querySelector(target) : target;
  //   sprite.node = node;

  //   // Already added symbols needs to be mounted
  //   this.symbols.forEach((symbol) => {
  //     symbol.mount(sprite.node);
  //     this._emitter.emit(Events.SYMBOL_MOUNT, symbol.node);
  //   });

  //   // Create symbols from existing DOM nodes, add and mount them
  //   arrayFrom(node.querySelectorAll('symbol'))
  //     .forEach((symbolNode) => {
  //       const symbol = BrowserSymbol.createFromExistingNode(symbolNode);
  //       symbol.node = symbolNode; // hack to prevent symbol mounting to sprite when adding
  //       sprite.add(symbol);
  //     });

  //   this._emitter.emit(Events.MOUNT, node);

  //   return node;
  // }

  // destroy() {
  //   const { config, symbols, _emitter } = this;

  //   symbols.forEach(s => s.destroy());

  //   _emitter.off('*');
  //   window.removeEventListener(config.locationChangeEvent, this._handleLocationChange);

  //   if (this.isMounted) {
  //     this.unmount();
  //   }
  // }

  /**
   * @fires Events#MOUNT
   * @param {string|Element} [target]
   * @param {boolean} [prepend=false]
   * @return {Element|null} rendered sprite node. null if mount node not found.
   */
  mount(target = this.config.mountTo, prepend = true) {
    const sprite = this;

    if (this.content == null) {
      return null;
    }
    // if (sprite.isMounted) {
    //   return sprite.node;
    // }

    const mountNode = typeof target === 'string' ? document.querySelector(target) : target;
    const node = sprite.parse(this.content);
    this.node = node;

    if (prepend && mountNode.childNodes[0]) {
      mountNode.insertBefore(sprite.node, mountNode.childNodes[0]);
    } else {
      mountNode.appendChild(sprite.node);
    }

    //this._emitter.emit(Events.MOUNT, sprite.node);

    return sprite.node;
  }

  /**
   * @return {Element}
   */
  parse(content) {
    var objE = document.createElement("div");
    objE.innerHTML = content;
    var node = objE.childNodes[0];
    Object.keys(this.config.attrs).forEach(k => {
      if (!node.hasAttribute(k)) {
        node.setAttribute(k, this.config.attrs[k]);
      }
    });
    return node;
  }

  /**
   * Detach sprite from the DOM
   */
  unmount() {
    this.node.parentNode.removeChild(this.node);
  }

  /**
   * Update URLs in sprite and usage elements
   * @param {string} oldUrl
   * @param {string} newUrl
   * @return {boolean} `true` - URLs was updated, `false` - sprite is not mounted
   */
  // updateUrls(oldUrl, newUrl) {
  //   if (!this.isMounted) {
  //     return false;
  //   }

  //   const usages = document.querySelectorAll(this.config.usagesToUpdate);

  //   updateUrls(
  //     this.node,
  //     usages,
  //     `${getUrlWithoutFragment(oldUrl)}#`,
  //     `${getUrlWithoutFragment(newUrl)}#`
  //   );

  //   return true;
  // }

}