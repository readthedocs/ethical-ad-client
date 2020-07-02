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

import "./styles.scss";

const AD_DECISION_URL = "https://server.ethicalads.io/api/v1/decision/";
const AD_CLIENT_VERSION = 1;

/* Placement object to query decision API and return an Element node
 *
 * @param publisher
 * @param ad_type
 */
export class Placement {
  constructor(publisher, ad_type = "image") {
    this.publisher = publisher;
    this.ad_type = ad_type;
  }

  /* Load placement from decision API and create DOM element
   *
   * @returns Promise
   */
  load() {
    const id = "ad_" + Date.now();
    const url_params = new URLSearchParams({
      publisher: this.publisher,
      ad_types: this.ad_type,
      div_ids: id,
      callback: id,
      format: "jsonp",
    });
    const url = new URL(AD_DECISION_URL + "?" + url_params.toString());
    const promise = new Promise((resolve, reject) => {
      window[id] = (response) => {
        if (response && response.id) {
          return resolve(response);
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
      script.addEventListener("error", reject);
      document.getElementsByTagName("head")[0].appendChild(script);
    }).then((response) => {
      const element = document.createElement("div");
      element.innerHTML = response.html;
      return element.firstChild;
    });

    return promise;
  }
}

/* Find all placement DOM elements and hot load HTML as child nodes
 *
 * @returns Promise
 */
export function load_placements() {
  // Find all elements matching required data binding attribute
  const node_list = document.querySelectorAll("[data-ea-publisher]");
  const elements = Array.prototype.slice.call(node_list);

  // Create main promise. Iterator `all()` Promise wil surround array of found
  // elements. If any of these elements have issues, this main promise will
  // reject.
  return new Promise((resolve, reject) => {
    if (elements.length === 0) {
      return reject(new Error("No placements found."));
    }

    Promise.all(
      elements.map((element) => {
        // Get attributes from DOM node
        const publisher = element.getAttribute("data-ea-publisher");
        let ad_type = element.getAttribute("data-ea-type");
        if (!ad_type) {
          ad_type = "image";
          element.setAttribute("data-ea-type", "image");
        }

        // Add version to ad type to verison the HTML return
        ad_type += "-v" + AD_CLIENT_VERSION;

        const placement = new Placement(publisher, ad_type);
        return placement.load().then((element_inner) => {
          element.appendChild(element_inner);
          let classes = element.className || "";
          classes += " loaded";
          element.className += classes.trim();
        });
      })
    )
      .then((placements) => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

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
      resolve();
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

  wait_dom.then(() => {
    load_placements().catch((err) => {
      console.error(err);
    });
  });
}
