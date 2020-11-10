/* Ethical ad publisher JavaScript client
 *
 * Loads placement from Ethical Ad decision API. Searches for elements with
 * `ethical-ad` data binding attributes and uses these attributes to query the
 * decision API.
 *
 * This is native JavaScript, no JQuery. It uses the API JSONP interface to get
 * around CORS and related issues. A script is added with a callback on
 * `window`. The promise is rejected if there are errors with the request or the
 * response doesn't look correct.
 *
 * Currently, only two parameters are supported with the ad placement: publisher
 * id and the place type. All of this is determined by the server and this
 * client so far only renders the API return HTML.
 *
 * This can be loaded async. CSS styles are preloaded via webpack `style-loader`.
 * There is some potential for problems if CSP rules disallow inline
 * stylesheets, but webpack does allow for a hardcoded nonce.
 *
 * Usage:
 *
 *     <script async src="ethicalads.min.js"></script>
 *     <div data-ea-publisher="foo" data-ea-type="text"></div>
 */

import Promise from "promise-polyfill";
import verge from "verge";

import "./styles.scss";

// For local testing, set this
// const AD_DECISION_URL = "http://ethicaladserver:5000/api/v1/decision/";
const AD_DECISION_URL = "https://server.ethicalads.io/api/v1/decision/";
const AD_CLIENT_VERSION = 1;
const ATTR_PREFIX = "data-ea-";
const ABP_DETECTION_PX = "https://media.ethicalads.io/abp/px.gif";

// Features
//
// Supports multiple ad placements? We don't support this yet, but the code is
// here for future support.
const SUPPORTS_MULTIPLE_PLACEMENTS = false;

/* Placement object to query decision API and return an Element node
 *
 * @param {string} publisher - Publisher ID
 * @param {string} ad_type - Placement ad type id
 * @param {Element} target - Target element
 * @param {string} keywords - An optional | separated array of keywords
 * @param {string} campaign_types - An optional | separated array of campaign types
 * @param {boolean} load_manually - whether this placement will be loaded manually later
 */
export class Placement {
  constructor(publisher, ad_type = "image", target, keywords, campaign_types, load_manually) {
    this.publisher = publisher;
    this.ad_type = ad_type;
    this.target = target;

    this.response = null;

    this.keywords = keywords || "";
    this.campaign_types = campaign_types || "paid|community|house";

    this.load_manually = load_manually;
  }

  /* Create a placement from an element
   *
   * Returns null if the placement is already loaded.
   *
   * @static
   * @param {Element} element - Load placement and append to this Element
   * @returns {Placement}
   */
  static from_element(element) {
    // Get attributes from DOM node
    const publisher = element.getAttribute(ATTR_PREFIX + "publisher");
    let ad_type = element.getAttribute(ATTR_PREFIX + "type");
    if (!ad_type) {
      ad_type = "image";
      element.setAttribute(ATTR_PREFIX + "type", "image");
    }

    const keywords = element.getAttribute(ATTR_PREFIX + "keywords");
    const campaign_types = element.getAttribute(ATTR_PREFIX + "campaign-types");

    const load_manually = element.getAttribute(ATTR_PREFIX + "manual") === "true";

    // Add version to ad type to verison the HTML return
    if (ad_type === "image" || ad_type === "text") {
      ad_type += "-v" + AD_CLIENT_VERSION;
    }

    let classes = (element.className || "").split(" ");
    if (classes.includes("loaded")) {
      console.error("EthicalAd already loaded.");
      return null;
    }

    return new Placement(publisher, ad_type, element, keywords, campaign_types, load_manually);
  }

  /* Transforms target element into a placement
   *
   * This method organizes all of the operations to transform the placement
   * configuration wrapper `div` into an ad placement -- including starting the
   * API transaction, displaying the ad element,
   * and handling the viewport detection.
   *
   * @returns {Promise}
   */
  load() {
    return this.fetch().then((element) => {
      if (element === undefined) {
        throw new EthicalAdsWarning("Ad decision request blocked");
      }

      // Add `loaded` class, signifying that the CSS styles should finally be
      // applied to the target element.
      let classes = this.target.className || "";
      classes += " loaded";
      this.target.className = classes.trim();

      // Make this element the only child element of the target element
      while (this.target.firstChild) {
        this.target.removeChild(this.target.firstChild);
      }
      this.target.appendChild(element);

      return this;
    }).then((placement) => {
      // Detect when the ad is in the viewport
      // Add the view pixel to the DOM to count the view

      let viewport_detection = setInterval((element) => {
        // Verge can be off by 1-2 pixels
        // A fudge factor of ~3 is needed for the case where the ad
        // is hidden off the side of the screen by a sliding sidebar
        // For example, if the right side of the ad is at x=0
        // or the left side of the ad is at the right side of the viewport
        if (placement.response && placement.response.view_url && verge.inViewport(element, -3)) {
          // This ad was seen!
          let pixel = document.createElement("img");
          pixel.src = placement.response.view_url;
          if (uplifted) {
            pixel.src += "?uplift=true";
          }
          pixel.className = "ea-pixel";
          element.appendChild(pixel);

          clearInterval(viewport_detection);
        }
      }, 100, placement.target);
    });
  }

  /* Get placement data from decision API
   *
   * @returns {Promise<Element>} Resolves with an Element converted from an HTML
   * string from API response. Can also be null, indicating a noop action.
   */
  fetch() {
    const callback = "ad_" + Date.now();
    var div_id = callback;
    if (this.target.id) {
      div_id = this.target.id;
    }
    const url_params = new URLSearchParams({
      publisher: this.publisher,
      ad_types: this.ad_type,
      div_ids: div_id,
      callback: callback,
      keywords: this.keywords,
      campaign_types: this.campaign_types,
      format: "jsonp",
    });
    const url = new URL(AD_DECISION_URL + "?" + url_params.toString());

    return new Promise((resolve, reject) => {
      window[callback] = (response) => {
        if (response && response.html && response.view_url) {
          this.response = response;
          const node_convert = document.createElement("div");
          node_convert.innerHTML = response.html;
          return resolve(node_convert.firstChild);
        } else {
          return reject(
            new Error("Placement is configured with invalid parameters.")
          );
        }
      };

      var script = document.createElement("script");
      script.src = url;
      script.type = "text/javascript";
      script.async = true;
      script.addEventListener("error", (err) => {
        // There was a problem loading this request, likely this was blocked by
        // an ad blocker. We'll resolve with an empty response instead of
        // throwing an error.
        return resolve();
      });
      document.getElementsByTagName("head")[0].appendChild(script);
    });
  }

  /* Detect whether this ad is "uplifted" meaning allowed by ABP's Acceptable Ads list
   *
   * Calls the provided callback passing a boolean whether this ad is uplifted.
   * We need this data to provide back to the AcceptableAds folks.
   *
   * This code comes directly from Eyeo/AdblockPlus team to measure Acceptable Ads.
   *
   * @static
   * @param {string} px - A URL of a pixel to test
   * @param {function) callback - A callback to call when finished
   */
  detectABP(px, callback) {
    var detected = false;
    var checksRemain = 2;
    var error1 = false;
    var error2 = false;
    if (typeof callback != "function") return;
    px += "?ch=*&rn=*";

    function beforeCheck(callback, timeout) {
      if (checksRemain == 0 || timeout > 1E3) callback(checksRemain == 0 && detected);
      else setTimeout(function() {
        beforeCheck(callback, timeout * 2)
      }, timeout * 2)
    }

    function checkImages() {
      if (--checksRemain) return;
      detected = !error1 && error2
    }
    var random = Math.random() * 11;
    var img1 = new Image;
    img1.onload = checkImages;
    img1.onerror = function() {
      error1 = true;
      checkImages()
    };
    img1.src = px.replace(/\*/, 1).replace(/\*/, random);
    var img2 = new Image;
    img2.onload = checkImages;
    img2.onerror = function() {
      error2 = true;
      checkImages()
    };
    img2.src = px.replace(/\*/, 2).replace(/\*/, random);
    beforeCheck(callback, 250)
  }
}

/* Find all placement DOM elements and hot load HTML as child nodes
 *
 * @param {boolean} force_load - load placements even if they are set to load manually
 * @returns {Promise<[Placement]>} Resolves to a list of Placement instances
 */
export function load_placements(force_load = false) {
  // Find all elements matching required data binding attribute. We don't yet
  // support multiple placements on the ad-server. For now, this could result in
  // competing ad placements.
  const node_list = document.querySelectorAll("[" + ATTR_PREFIX + "publisher]");
  let elements = Array.prototype.slice.call(node_list);

  // Create main promise. Iterator `all()` Promise wil surround array of found
  // elements. If any of these elements have issues, this main promise will
  // reject.
  if (elements.length === 0) {
    throw new Error("No ad placements found.");
  } else if (!SUPPORTS_MULTIPLE_PLACEMENTS && elements.length > 1) {
    console.error(
      "Multiple ad placements are not supported, only using the first ad placement."
    );
    elements = elements.slice(0, 1);
  }

  return Promise.all(
    elements.map((element) => {
      const placement = Placement.from_element(element);

      if (placement && !force_load) {
        placement.detectABP(ABP_DETECTION_PX, function (usesABP) {
          uplifted = usesABP;
          if (usesABP) {
            console.debug("Acceptable Ads enabled. Thanks for allowing our non-tracking ads :)");
          }
        });
      }

      if (placement && (force_load || !placement.load_manually)) {
        return placement.load();
      } else {
        // This will be manually loaded later or has already been loaded
        return null;
      }
    })
  );
}

// An error class that we will not surface to clients normally.
class EthicalAdsWarning extends Error {}

/* Wrapping Promise to allow for handling of errors by user
 *
 * This promise currently does not reject on error as this will emit a console
 * warning if the user hasn't added a promise rejection handler (which is most
 * cases).
 *
 * This promise resolves to an aray of Placement instances, or an empty list if
 * there was any error configuring the placements.
 *
 * For example, to perform an action when no placements are loaded:
 *
 *   <script>
 *   ethicalads.wait.then((placements) => {
 *     if (!placements.length) {
 *       console.log('Ads were not able to load');
 *     }
 *   }
 *   </script>
 *
 * @type {Promise<[Placement]>}
 */
export var wait;

/* Loading placements manually rather than the normal way
 *
 *   <div data-ea-publisher="..." data-ea-manual="true"></div>
 *   <script>
 *     ethicalads.load();
 *   </script>
 *
 * @type function
 */
export var load;

/* Whether this ad impression is attributed to being on the Acceptable Ads list.
 * @type boolean
 */
export var uplifted = false;

/* If importing this as a module, do not automatically process DOM and fetch the
 * ad placement. Only do this if using the module directly, from a `script`
 * element. This will allow for future extension and packaging as a module.
 *
 * This also replicates JQuery `$(document).ready()`, with added protection for
 * usage of `async` -- the DOM ready event can fire before the script is loaded..
 */
if (require.main !== module) {
  const wait_dom = new Promise((resolve) => {
    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      return resolve();
    } else {
      document.addEventListener(
        "DOMContentLoaded",
        () => {
          resolve();
        },
        {
          capture: true,
          once: true,
          passive: true,
        }
      );
    }
  });

  wait = new Promise((resolve) => {
    wait_dom.then(() => {
      load_placements()
        .then((placements) => {
          resolve(placements);
        })
        .catch((err) => {
          resolve([]);

          const is_debug = global.debug || window.debug || false;

          if (err instanceof Error) {
            if (err instanceof EthicalAdsWarning && !is_debug) {
              // Skip reporting these warnings for now, unless debugging.
              return;
            }
            console.error(err.message);
          }
        });
    });
  });

  load = () => {
    console.log("Loading placements manually")
    load_placements(true);
  };
}
