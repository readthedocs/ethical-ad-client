/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: Placement, load_placements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Placement\", function() { return Placement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"load_placements\", function() { return load_placements; });\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./styles.scss\");\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_0__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/* Ethical ad publisher JavaScript client\n *\n * Loads placement from Ethical Ad decision API. Searches for elements with\n * `ethical-ad` data binding attributes and uses these attributes to query the\n * decision API.\n *\n * This is native JavaScript, no JQuery. It uses the API JSONP interface to get\n * around CORS and related issues. A script is added with a callback on\n * `window`. The promise is rejected if there are errors with the request or the\n * response doesn't look correct.\n *\n * Currently, only two parameters are supported with the ad placement: publisher\n * id and the place type. All of this is determined by the server and this\n * client so far only renders the API return HTML.\n *\n * This can be loaded async. CSS styles are preloaded via webpack `style-loader`.\n * There is some potential for problems if CSP rules disallow inline\n * stylesheets, but webpack does allow for a hardcoded nonce.\n *\n * Usage:\n *\n *     <script async src=\"ethicalads.min.js\"></script>\n *     <div data-ea-publisher=\"foo\" data-ea-type=\"text\"></div>\n */\n\nvar AD_DECISION_URL = \"https://server.ethicalads.io/api/v1/decision/\";\nvar AD_CLIENT_VERSION = 1;\nvar ATTR_PREFIX = \"data-ea-\";\n/* Placement object to query decision API and return an Element node\n *\n * @param publisher\n * @param ad_type\n */\n\nvar Placement = /*#__PURE__*/function () {\n  function Placement(publisher) {\n    var ad_type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"image\";\n\n    _classCallCheck(this, Placement);\n\n    this.publisher = publisher;\n    this.ad_type = ad_type;\n  }\n  /* Load placement from decision API and create DOM element\n   *\n   * @returns Promise\n   */\n\n\n  _createClass(Placement, [{\n    key: \"load\",\n    value: function load() {\n      var id = \"ad_\" + Date.now();\n      var url_params = new URLSearchParams({\n        publisher: this.publisher,\n        ad_types: this.ad_type,\n        div_ids: id,\n        callback: id,\n        format: \"jsonp\"\n      });\n      var url = new URL(AD_DECISION_URL + \"?\" + url_params.toString());\n      var promise = new Promise(function (resolve, reject) {\n        window[id] = function (response) {\n          if (response && response.id) {\n            return resolve(response);\n          } else {\n            return reject(new Error(\"Placement is configured with invalid parameters.\"));\n          }\n        };\n\n        var script = document.createElement(\"script\");\n        script.src = url;\n        script.type = \"text/javascript\";\n        script.async = true;\n        script.addEventListener(\"error\", reject);\n        document.getElementsByTagName(\"head\")[0].appendChild(script);\n      }).then(function (response) {\n        var element = document.createElement(\"div\");\n        element.innerHTML = response.html;\n        return element.firstChild;\n      });\n      return promise;\n    }\n  }]);\n\n  return Placement;\n}();\n/* Find all placement DOM elements and hot load HTML as child nodes\n *\n * @returns Promise\n */\n\nfunction load_placements() {\n  // Find all elements matching required data binding attribute\n  var node_list = document.querySelectorAll(\"[\" + ATTR_PREFIX + \"publisher]\");\n  var elements = Array.prototype.slice.call(node_list); // Create main promise. Iterator `all()` Promise wil surround array of found\n  // elements. If any of these elements have issues, this main promise will\n  // reject.\n\n  return new Promise(function (resolve, reject) {\n    if (elements.length === 0) {\n      return reject(new Error(\"No placements found.\"));\n    }\n\n    Promise.all(elements.map(function (element) {\n      // Get attributes from DOM node\n      var publisher = element.getAttribute(ATTR_PREFIX + \"publisher\");\n      var ad_type = element.getAttribute(ATTR_PREFIX + \"type\");\n\n      if (!ad_type) {\n        ad_type = \"image\";\n        element.setAttribute(ATTR_PREFIX + \"type\", \"image\");\n      } // Add version to ad type to verison the HTML return\n\n\n      ad_type += \"-v\" + AD_CLIENT_VERSION;\n      var placement = new Placement(publisher, ad_type);\n      return placement.load().then(function (element_inner) {\n        element.appendChild(element_inner);\n        var classes = element.className || \"\";\n        classes += \" loaded\";\n        element.className += classes.trim();\n      });\n    })).then(function (placements) {\n      resolve();\n    })[\"catch\"](function (err) {\n      reject(err);\n    });\n  });\n}\n/* If importing this as a module, do not automatically process DOM and fetch the\n * ad placement. Only do this if using the module directly, from a `script`\n * element. This will allow for future extension and packaging as a module.\n *\n * This also replicates JQuery `$(document).ready()`, with added protection for\n * usage of `async` -- the DOM ready event can fire before the script is loaded..\n */\n\nif (__webpack_require__.c[__webpack_require__.s] !== module) {\n  var wait_dom = new Promise(function (resolve) {\n    if (document.readyState === \"interactive\" || document.readyState === \"complete\") {\n      resolve();\n    } else {\n      document.addEventListener(\"DOMContentLoaded\", function () {\n        resolve();\n      }, {\n        capture: true,\n        once: true,\n        passive: true\n      });\n    }\n  });\n  wait_dom.then(function () {\n    load_placements()[\"catch\"](function (err) {\n      console.error(err);\n    });\n  });\n}\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles.scss":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"/* Ad styles */\\n[data-ea-publisher].loaded,\\n[data-ea-type].loaded {\\n  font-size: 14px;\\n  line-height: 1.3em; }\\n  [data-ea-publisher].loaded a,\\n  [data-ea-type].loaded a {\\n    text-decoration: none; }\\n  [data-ea-publisher].loaded .ea-pixel,\\n  [data-ea-type].loaded .ea-pixel {\\n    display: none; }\\n  [data-ea-publisher].loaded .ea-content,\\n  [data-ea-type].loaded .ea-content {\\n    margin: 1em 1em 0.5em 1em;\\n    padding: 1em;\\n    background: rgba(0, 0, 0, 0.03);\\n    color: #505050; }\\n    [data-ea-publisher].loaded .ea-content a:link,\\n    [data-ea-type].loaded .ea-content a:link {\\n      color: #505050; }\\n    [data-ea-publisher].loaded .ea-content a:visited,\\n    [data-ea-type].loaded .ea-content a:visited {\\n      color: #505050; }\\n    [data-ea-publisher].loaded .ea-content a:hover,\\n    [data-ea-type].loaded .ea-content a:hover {\\n      color: #373737; }\\n    [data-ea-publisher].loaded .ea-content a:active,\\n    [data-ea-type].loaded .ea-content a:active {\\n      color: #373737; }\\n    [data-ea-publisher].loaded .ea-content a strong,\\n    [data-ea-publisher].loaded .ea-content a b,\\n    [data-ea-type].loaded .ea-content a strong,\\n    [data-ea-type].loaded .ea-content a b {\\n      color: #088cdb; }\\n  [data-ea-publisher].loaded .ea-callout a:link,\\n  [data-ea-type].loaded .ea-callout a:link {\\n    color: #6a6a6a; }\\n  [data-ea-publisher].loaded .ea-callout a:visited,\\n  [data-ea-type].loaded .ea-callout a:visited {\\n    color: #6a6a6a; }\\n  [data-ea-publisher].loaded .ea-callout a:hover,\\n  [data-ea-type].loaded .ea-callout a:hover {\\n    color: #505050; }\\n  [data-ea-publisher].loaded .ea-callout a:active,\\n  [data-ea-type].loaded .ea-callout a:active {\\n    color: #505050; }\\n  [data-ea-publisher].loaded .ea-callout a strong,\\n  [data-ea-publisher].loaded .ea-callout a b,\\n  [data-ea-type].loaded .ea-callout a strong,\\n  [data-ea-type].loaded .ea-callout a b {\\n    color: #088cdb; }\\n  [data-ea-publisher].loaded .ea-callout a,\\n  [data-ea-type].loaded .ea-callout a {\\n    font-size: 0.8em; }\\n  [data-ea-publisher].loaded.dark .ea-content,\\n  [data-ea-type].loaded.dark .ea-content {\\n    background: rgba(255, 255, 255, 0.05);\\n    color: gainsboro; }\\n    [data-ea-publisher].loaded.dark .ea-content a:link,\\n    [data-ea-type].loaded.dark .ea-content a:link {\\n      color: gainsboro; }\\n    [data-ea-publisher].loaded.dark .ea-content a:visited,\\n    [data-ea-type].loaded.dark .ea-content a:visited {\\n      color: gainsboro; }\\n    [data-ea-publisher].loaded.dark .ea-content a:hover,\\n    [data-ea-type].loaded.dark .ea-content a:hover {\\n      color: #f6f6f6; }\\n    [data-ea-publisher].loaded.dark .ea-content a:active,\\n    [data-ea-type].loaded.dark .ea-content a:active {\\n      color: #f6f6f6; }\\n    [data-ea-publisher].loaded.dark .ea-content a strong,\\n    [data-ea-publisher].loaded.dark .ea-content a b,\\n    [data-ea-type].loaded.dark .ea-content a strong,\\n    [data-ea-type].loaded.dark .ea-content a b {\\n      color: #50baf9; }\\n  [data-ea-publisher].loaded.dark .ea-callout a:link,\\n  [data-ea-type].loaded.dark .ea-callout a:link {\\n    color: #c3c3c3; }\\n  [data-ea-publisher].loaded.dark .ea-callout a:visited,\\n  [data-ea-type].loaded.dark .ea-callout a:visited {\\n    color: #c3c3c3; }\\n  [data-ea-publisher].loaded.dark .ea-callout a:hover,\\n  [data-ea-type].loaded.dark .ea-callout a:hover {\\n    color: gainsboro; }\\n  [data-ea-publisher].loaded.dark .ea-callout a:active,\\n  [data-ea-type].loaded.dark .ea-callout a:active {\\n    color: gainsboro; }\\n  [data-ea-publisher].loaded.dark .ea-callout a strong,\\n  [data-ea-publisher].loaded.dark .ea-callout a b,\\n  [data-ea-type].loaded.dark .ea-callout a strong,\\n  [data-ea-type].loaded.dark .ea-callout a b {\\n    color: #50baf9; }\\n\\n[data-ea-publisher].loaded .ea-content,\\n[data-ea-type].loaded .ea-content {\\n  border: 0px;\\n  border-radius: 3px;\\n  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15); }\\n\\n[data-ea-publisher].loaded.raised .ea-content,\\n[data-ea-type].loaded.raised .ea-content {\\n  border: 0px;\\n  border-radius: 3px;\\n  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15); }\\n\\n[data-ea-publisher].loaded.bordered .ea-content,\\n[data-ea-type].loaded.bordered .ea-content {\\n  border: 1px solid rgba(0, 0, 0, 0.04);\\n  border-radius: 3px;\\n  box-shadow: none; }\\n\\n[data-ea-publisher].loaded.bordered.dark .ea-content,\\n[data-ea-type].loaded.bordered.dark .ea-content {\\n  border: 1px solid rgba(255, 255, 255, 0.07); }\\n\\n[data-ea-publisher].loaded.flat .ea-content,\\n[data-ea-type].loaded.flat .ea-content {\\n  border: 0px;\\n  border-radius: 3px;\\n  box-shadow: none; }\\n\\n[data-ea-type=\\\"image\\\"].loaded .ea-content,\\n[data-ea-publisher]:not([data-ea-type]).loaded .ea-content {\\n  max-width: 180px;\\n  overflow: auto;\\n  text-align: center; }\\n  [data-ea-type=\\\"image\\\"].loaded .ea-content > a > img,\\n  [data-ea-publisher]:not([data-ea-type]).loaded .ea-content > a > img {\\n    width: 120px;\\n    height: 90px;\\n    display: inline-block; }\\n  [data-ea-type=\\\"image\\\"].loaded .ea-content > .ea-text,\\n  [data-ea-publisher]:not([data-ea-type]).loaded .ea-content > .ea-text {\\n    margin-top: 1em;\\n    font-size: 1em;\\n    text-align: center; }\\n\\n[data-ea-type=\\\"image\\\"].loaded .ea-callout,\\n[data-ea-publisher]:not([data-ea-type]).loaded .ea-callout {\\n  max-width: 180px;\\n  margin: 0em 1em 1em 1em;\\n  padding-left: 1em;\\n  padding-right: 1em;\\n  font-style: italic;\\n  text-align: right; }\\n\\n[data-ea-type=\\\"image\\\"].loaded.horizontal .ea-content,\\n[data-ea-publisher]:not([data-ea-type]).loaded.horizontal .ea-content {\\n  max-width: 320px; }\\n  [data-ea-type=\\\"image\\\"].loaded.horizontal .ea-content > a > img,\\n  [data-ea-publisher]:not([data-ea-type]).loaded.horizontal .ea-content > a > img {\\n    float: left;\\n    margin-right: 1em; }\\n  [data-ea-type=\\\"image\\\"].loaded.horizontal .ea-content .ea-text,\\n  [data-ea-publisher]:not([data-ea-type]).loaded.horizontal .ea-content .ea-text {\\n    margin-top: 0em;\\n    text-align: left;\\n    overflow: auto; }\\n\\n[data-ea-type=\\\"image\\\"].loaded.horizontal .ea-callout,\\n[data-ea-publisher]:not([data-ea-type]).loaded.horizontal .ea-callout {\\n  max-width: 320px;\\n  text-align: right; }\\n\\n[data-ea-type=\\\"text\\\"].loaded {\\n  font-size: 14px; }\\n  [data-ea-type=\\\"text\\\"].loaded .ea-callout {\\n    margin: 0.5em 1em 1em 1em;\\n    padding-left: 1em;\\n    padding-right: 1em;\\n    text-align: right;\\n    font-style: italic; }\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./styles.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./styles.scss":
/*!*********************!*\
  !*** ./styles.scss ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./styles.scss?");

/***/ })

/******/ });