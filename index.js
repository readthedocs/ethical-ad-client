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

import "./styles.scss";

const AD_DECISION_URL = "https://server.ethicalads.io/api/v1/decision/";
const AD_CLIENT_VERSION = 1;
const ATTR_PREFIX = "data-ea-";

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
 */
export class Placement {
  constructor(publisher, ad_type = "image", target) {
    this.publisher = publisher;
    this.ad_type = ad_type;
    this.target = target;
  }

  /* Create a placement from an element
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

    // Add version to ad type to verison the HTML return
    ad_type += "-v" + AD_CLIENT_VERSION;

    return new Placement(publisher, ad_type, element);
  }

  /* Transforms target element into a placement
   *
   * This method organizes all of the operations to transform the placement
   * configuration wrapper `div` into an ad placement -- including starting the
   * API transaction, displaying the ad element, and eventually handling the
   * viewport detection.
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
      this.target.className += classes.trim();

      // Make this element the only child element of the target element
      while (this.target.firstChild) {
        this.target.removeChild(this.target.firstChild);
      }
      this.target.appendChild(element);

      return this;
    });
    // To then chain our viewport detection, have a method that returns a
    // promise and a pattern like the following:
    //}).then(this.wait_for_viewport());
  }

  /* Get placement data from decision API
   *
   * @returns {Promise<Element>} Resolves with an Element converted from an HTML
   * string from API response. Can also be null, indicating a noop action.
   */
  fetch() {
    const id = "ad_" + Date.now();
    const url_params = new URLSearchParams({
      publisher: this.publisher,
      ad_types: this.ad_type,
      div_ids: id,
      callback: id,
      format: "jsonp",
    });
    const url = new URL(AD_DECISION_URL + "?" + url_params.toString());

    return new Promise((resolve, reject) => {
      window[id] = (response) => {
        if (response && response.html) {
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
}

/* Find all placement DOM elements and hot load HTML as child nodes
 *
 * @returns {Promise<[Placement]>} Resolves to a list of Placement instances
 */
export function load_placements() {
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
      return placement.load();
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
}
