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
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Placement\", function() { return Placement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"load_placements\", function() { return load_placements; });\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./styles.scss\");\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_0__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/* Ethical ad publisher JavaScript client\n *\n * Loads placement form Ethical Ad decision API. Searches for elements with\n * `ethical-ad` data binding attributes and uses these attributes to query the\n * decision API.\n *\n * This is native JavaScript, no JQuery. It uses the API JSONP interface to get\n * around CORS and related issues. A script is added with a callback on\n * `window`. The promise is rejected if there are errors with the request or the\n * response doesn't look correct.\n *\n * Currently, only two parameters are supported with the ad placement: publisher\n * id and the place type. All of this is determined by the server and this\n * client so far only renders the API return HTML.\n *\n * This can be loaded async. CSS styles are preloaded via webpack\n * `to-string-loader`.\n *\n * Usage:\n *\n *     <script async src=\"ethicalads.min.js\"></script>\n *     <div data-ethical-ad-publisher=\"foo\" data-ethical-ad-type=\"text\"></div>\n */\n\nvar AD_DECISION_URL = \"https://server.ethicalads.io/api/v1/decision/\";\n/* Placement object to query decision API and return an Element node\n *\n * @param publisher\n * @param ad_type\n */\n\nvar Placement = /*#__PURE__*/function () {\n  function Placement(publisher) {\n    var ad_type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"readthedocs-sidebar\";\n\n    _classCallCheck(this, Placement);\n\n    this.publisher = publisher;\n    this.ad_type = ad_type;\n  }\n  /* Load placement from decision API and create DOM element\n   *\n   * @returns Promise\n   */\n\n\n  _createClass(Placement, [{\n    key: \"load\",\n    value: function load() {\n      var _this = this;\n\n      var id = \"ad_\" + Date.now();\n      var url_params = new URLSearchParams({\n        publisher: this.publisher,\n        ad_types: this.ad_type,\n        div_ids: id,\n        callback: id,\n        format: \"jsonp\"\n      });\n      var url = new URL(AD_DECISION_URL + \"?\" + url_params.toString());\n      var promise = new Promise(function (resolve, reject) {\n        window[id] = function (response) {\n          if (response && response.id) {\n            return resolve(response);\n          } else {\n            return reject(new Error(\"Placement is configured with invalid parameters.\"));\n          }\n        };\n\n        var script = document.createElement(\"script\");\n        script.src = url;\n        script.type = \"text/javascript\";\n        script.async = true;\n        script.addEventListener(\"error\", reject);\n        document.getElementsByTagName(\"head\")[0].appendChild(script);\n      }).then(function (response) {\n        var element = document.createElement(\"div\", {\n          id: _this.id\n        });\n        element.innerHTML = response.html;\n        var impression_view = document.createElement(\"img\", {\n          src: response.view_url,\n          style: \"display: none;\"\n        });\n        element.appendChild(impression_view);\n        return element;\n      });\n      return promise;\n    }\n  }]);\n\n  return Placement;\n}();\n/* Find all placement DOM elements and hot load HTML as child nodes\n *\n * @returns Promise\n */\n\nfunction load_placements() {\n  // Find all elements matching required data binding attribute\n  var node_list = document.querySelectorAll(\"[data-ethical-ad-publisher]\");\n  var elements = Array.prototype.slice.call(node_list); // Create main promise. Iterator `all()` Promise wil surround array of found\n  // elements. If any of these elements have issues, this main promise will\n  // reject.\n\n  return new Promise(function (resolve, reject) {\n    if (elements.length === 0) {\n      return reject(new Error(\"No placements found.\"));\n    } // Preload CSS from webpack string instead of a secondary request\n\n\n    var styles = document.createElement(\"style\");\n    styles.innerHTML = _styles_scss__WEBPACK_IMPORTED_MODULE_0__;\n    document.getElementsByTagName(\"head\")[0].appendChild(styles);\n    Promise.all(elements.map(function (element) {\n      // Get attributes from DOM node\n      var publisher = element.getAttribute(\"data-ethical-ad-publisher\");\n      var ad_type = element.getAttribute(\"data-ethical-ad-type\") || \"readthedocs-sidebar\";\n      var placement = new Placement(publisher, ad_type);\n      return placement.load().then(function (element_inner) {\n        element.appendChild(element_inner);\n      });\n    })).then(function (placements) {\n      resolve();\n    })[\"catch\"](function (err) {\n      reject(err);\n    });\n  });\n}\n/* If importing this as a module, do not automatically process DOM and fetch the\n * ad placement. Only do this if using the module directly, from a `script`\n * element. This will allow for future extension and packaging as a module.\n *\n * This also replicates JQuery `$(document).ready()`, with added protection for\n * usage of `async` -- the DOM ready event can fire before the script is loaded..\n */\n\nif (__webpack_require__.c[__webpack_require__.s] !== module) {\n  var wait_dom = new Promise(function (resolve) {\n    if (document.readyState === \"interactive\" || document.readyState === \"complete\") {\n      resolve();\n    } else {\n      document.addEventListener(\"DOMContentLoaded\", function () {\n        resolve();\n      }, {\n        capture: true,\n        once: true,\n        passive: true\n      });\n    }\n  });\n  wait_dom.then(function () {\n    load_placements()[\"catch\"](function (err) {\n      console.error(err);\n    });\n  });\n}\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles.scss":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"/* Ad styles */\\n[data-ethical-ad-publisher] {\\n  background: #f0f0e0;\\n  font-family: monospace;\\n  margin: 1rem;\\n  padding: 1rem; }\\n\\n[data-ethical-ad-type=\\\"readthedocs-sidebar\\\"] {\\n  background: red; }\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./styles.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

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

eval("\n        var result = __webpack_require__(/*! !./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles.scss\");\n\n        if (typeof result === \"string\") {\n            module.exports = result;\n        } else {\n            module.exports = result.toString();\n        }\n    \n\n//# sourceURL=webpack:///./styles.scss?");

/***/ })

/******/ });