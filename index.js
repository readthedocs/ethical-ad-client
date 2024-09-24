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

import verge from "verge";

import "./styles.scss";

const AD_CLIENT_VERSION = "1.19.0-alpha"; // Sent with the ad request

// For local testing, set this
// const AD_DECISION_URL = "http://ethicaladserver:5000/api/v1/decision/";
const AD_DECISION_URL = "https://server.ethicalads.io/api/v1/decision/";
const AD_TYPES_VERSION = 1; // Used with the ad type slugs
const ATTR_PREFIX = "data-ea-";
const ABP_DETECTION_PX = "https://media.ethicalads.io/abp/px.gif";

// Verbosity and logging
//
// Set with:
//
//  <div data-ea-publisher="..." data-ea-verbosity="quiet"></div>
const VERBOSITY = {
  quiet: 0, // Errors only
  normal: 1, // Warnings only (default)
  verbose: 2, // Debug messages
};
const logger = {
  verbosity: VERBOSITY["normal"], // Default

  debug(message, ...params) {
    if (this.verbosity >= VERBOSITY["verbose"]) {
      console.debug(message, ...params);
    }
  },
  info(message, ...params) {
    if (this.verbosity >= VERBOSITY["verbose"]) {
      console.info(message, ...params);
    }
  },
  warn(message, ...params) {
    if (this.verbosity >= VERBOSITY["normal"]) {
      console.warn(message, ...params);
    }
  },
  error(message, ...params) {
    if (this.verbosity >= VERBOSITY["quiet"]) {
      console.error(message, ...params);
    }
  },
};

// Keywords and topics
//
// This allows us to categorize pages simply and have better content targeting.
// Additional categorization can be done on the server side for pages
// that request ads commonly but this quick and easy categorization
// works decently well most of the time.
const KEYWORDS = new Set([
  "2fa",
  "ai",
  "airflow",
  "algolia",
  "android",
  "angular",
  "angularjs",
  "ansible",
  "api",
  "appengine",
  "app-engine",
  "arangodb",
  "artificial-intelligence",
  "asp-net",
  "auth0",
  "authentication",
  "authorization",
  "aws",
  "azure",
  "babel",
  "backend",
  "backend-web",
  "bayes",
  "bayesian",
  "billing",
  "bitcoin",
  "blender",
  "blockchain",
  "celery",
  "chartjs",
  "chatbot",
  "chatbots",
  "chatgpt",
  "chatgpt3",
  "chatgpt4",
  "ci",
  "cicd",
  "ci-cd",
  "classifier",
  "cloud",
  "cloudformation",
  "cloud-formation",
  "cloudfront",
  "clustering",
  "cockroachdb",
  "commonjs",
  "computer-vision",
  "container",
  "containers",
  "continuousdeployment",
  "continuous-deployment",
  "continuousintegration",
  "continuous-integration",
  "cordova",
  "cplusplus",
  "cryptocurrency",
  "cryptography",
  "csharp",
  "c-sharp",
  "css",
  "cssinjs",
  "cuda",
  "cve",
  "cyber-attack",
  "cybersecurity",
  "cyber-security",
  "d3js",
  "dalle",
  "dall-e",
  "dataanalytics",
  "data-analytics",
  "database",
  "datadog",
  "datalake",
  "data-lake",
  "datamesh",
  "data-mesh",
  "datascience",
  "data-science",
  "datascientist",
  "data-scientist",
  "data-visualization",
  "data-warehouse",
  "decryption",
  "deeplearning",
  "deep-learning",
  "deepreinforcement",
  "deep-reinforcement",
  "defi",
  "devops",
  "django",
  "djangorestframework",
  "django-rest-framework",
  "dnssec",
  "docker",
  "dockerhub",
  "docker-hub",
  "dockerizing",
  "dogecoin",
  "dotnet",
  "duckdb",
  "elasticsearch",
  "elastic-search",
  "emberjs",
  "erlang",
  "es6",
  "eslint",
  "ethereum",
  "express",
  "facedetection",
  "face-detection",
  "fiddler",
  "firebase",
  "firewall",
  "flask",
  "frontend",
  "frontend-web",
  "fsharp",
  "full-stack",
  "game",
  "gamedev",
  "gatsbyjs",
  "gcp",
  "gitguardian",
  "godot",
  "golang",
  "google-cloud",
  "gpt",
  "grafana",
  "grails",
  "graphql",
  "hacking",
  "haskell",
  "heroku",
  "hyperledger",
  "indiegame",
  "indie-game",
  "influxdb",
  "infosec",
  "invoice",
  "ionic",
  "ios",
  "iphone",
  "java",
  "javascript",
  "jenkins",
  "jfrog",
  "jinja",
  "jquery",
  "julia",
  "jupyter",
  "jvm",
  "kafka",
  "k-means-clustering",
  "kotlin",
  "kubernetes",
  "laravel",
  "lint",
  "linux",
  "llm",
  "llms",
  "log4j",
  "lucene",
  "machinelearning",
  "machine-learning",
  "mariadb",
  "matlab",
  "matplotlib",
  "maven",
  "metabase",
  "mfa",
  "midjourney",
  "minecraft",
  "mkdocs",
  "ml",
  "mobile",
  "model-training",
  "mongodb",
  "monitoring",
  "montecarlo",
  "monte-carlo",
  "mysql",
  "naivebayes",
  "naive-bayes",
  "neo4j",
  "neuralnet",
  "neural-net",
  "neural-nets",
  "neuralnetworks",
  "neural-networks",
  "newrelic",
  "new-relic",
  "nft",
  "nginx",
  "nlp",
  "node",
  "nodejs",
  "nosql",
  "numpy",
  "nuxt",
  "nuxtjs",
  "oauth",
  "obj-c",
  "objectdetection",
  "object-detection",
  "openai",
  "opencv-python-library",
  "openid",
  "openid-connect",
  "openjdk",
  "openshift",
  "openssl",
  "otp",
  "overfitting",
  "owasp",
  "pandas",
  "payment",
  "payments",
  "paypal",
  "penetration-test",
  "pentest",
  "perl",
  "phishing",
  "phonegap",
  "php",
  "pip",
  "postcss",
  "postgres",
  "postgresql",
  "privacy",
  "psf",
  "pwa",
  "pydata",
  "pygame",
  "pylint",
  "pypi",
  "pytest",
  "python",
  "pytorch",
  "pytorch3d",
  "rabbitmq",
  "rails",
  "rdbms",
  "rds",
  "react",
  "reactjs",
  "react-native",
  "redis",
  "redux",
  "regression",
  "regressionmodel",
  "regression-model",
  "reinforcement-learning",
  "rollbar",
  "ruby",
  "rust",
  "saltstack",
  "scala",
  "scikitlearn",
  "scikit-learn",
  "scipy",
  "scss",
  "security",
  "securityvulnerabilities",
  "security-vulnerabilities",
  "selenium",
  "selinux",
  "sencha",
  "sentiment-analysis",
  "sentry",
  "serverless",
  "single-page-application",
  "sklearn",
  "smartphone",
  "sms",
  "snowflake",
  "snyk",
  "solidity",
  "solr",
  "spa",
  "spacy",
  "sphinx",
  "sphinx-doc",
  "spring",
  "sql",
  "sqlite",
  "sqlserver",
  "sql-server",
  "stripe",
  "struts",
  "subscriptions",
  "svelte",
  "sveltejs",
  "swift",
  "symfony",
  "tableau",
  "tailwind",
  "tailwindcss",
  "tailwind-css",
  "tdd",
  "technical-writing",
  "tensor",
  "tensorflow",
  "tensorflowjs",
  "terraform",
  "test-driven-development",
  "testing",
  "tests",
  "textacy",
  "timescale",
  "timeseries",
  "training-data",
  "transformers",
  "travisci",
  "twilio",
  "two-factor-auth",
  "two-factor-authentication",
  "typescript",
  "ubuntu",
  "unittest",
  "unity",
  "vision-api",
  "visualization",
  "vue",
  "vuejs",
  "vuetify",
  "vuex",
  "vulnerability",
  "waf",
  "webapp-firewall",
  "webapplicationfirewall",
  "web-application-firewall",
  "webcomponents",
  "web-components",
  "webpack",
  "websecurity",
  "web-security",
  "werkzeug",
  "wireshark",
  "wsgi",
  "yarn",
  "zapier",
]);

// Maximum number of words of a document to analyze looking for keywords
// This is simply a check against taking too much time on very long documents
const MAX_WORDS_ANALYZED = 9999;

// Max number of detected keywords to send
// Lowering this number means that only major topics of the page get sent on long pages
const MAX_KEYWORDS = 3;

// Minimum number of occurrences of a keyword to consider it
const MIN_KEYWORD_OCCURRENCES = 2;

// Time between checking whether the ad is in the viewport to count the time viewed
// Time viewed is an important advertiser metric
const VIEW_TIME_INTERVAL = 1; // seconds
const VIEW_TIME_MAX = 5 * 60; // seconds

// In-viewport fudge factor
// A fudge factor of ~3 is needed for the case where the ad
// is hidden off the side of the screen by a sliding sidebar
// For example, if the right side of the ad is at x=0
// or the left side of the ad is at the right side of the viewport
const VIEWPORT_FUDGE_FACTOR = -3; // px

// An ad may be rotated if it has been visible for sufficient time
// And there is user interaction such as a hashchange or visibilitychange.
// We rotate no more than the maximum number of rotations.
// Loading the ad the first time counts as the first rotation.
const MIN_VIEW_TIME_ROTATION_DURATION = 30; // seconds
const MAX_ROTATIONS = 3;

// Seconds after a tab comes back into focus to rotate an ad.
const VISIBILITYCHANGE_ROTATION_DELAY = 3; // seconds

/* Placement object to query decision API and return an Element node
 *
 * @param {string} publisher - Publisher ID
 * @param {string} ad_type - Placement ad type id
 * @param {Element} target - Target element
 * @param {Object} options - Various options for configuring the placement such as:
      keywords, styles, campaign_types, load_manually, force_ad, force_campaign
 */
export class Placement {
  constructor(publisher, ad_type, target, options) {
    this.publisher = publisher;
    this.ad_type = ad_type;
    this.target = target;

    // Options
    this.options = options;
    this.style = options.style;
    this.keywords = options.keywords || [];
    this.load_manually = options.load_manually;
    this.force_ad = options.force_ad;
    this.force_campaign = options.force_campaign;
    this.campaign_types = options.campaign_types || [];
    if (!this.campaign_types.length) {
      this.campaign_types = ["paid", "publisher-house", "community", "house"];
    }

    // Initialized and will be used in the future
    this.view_time = 0;
    this.view_time_sent = false; // true once the view time is sent to the server
    this.response = null;
    this.tab_hidden = false;

    this.rotations = 1;
    this.index = null;
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

    const keywords = (element.getAttribute(ATTR_PREFIX + "keywords") || "")
      .split("|")
      .filter((word) => word.length > 1);
    const campaign_types = (
      element.getAttribute(ATTR_PREFIX + "campaign-types") || ""
    )
      .split("|")
      .filter((word) => word.length > 1);

    const load_manually =
      element.getAttribute(ATTR_PREFIX + "manual") === "true";
    const style = element.getAttribute(ATTR_PREFIX + "style");
    const force_ad = element.getAttribute(ATTR_PREFIX + "force-ad");
    const force_campaign = element.getAttribute(ATTR_PREFIX + "force-campaign");

    // Add version to ad type to verison the HTML return
    if (ad_type === "image" || ad_type === "text") {
      ad_type += "-v" + AD_TYPES_VERSION;
    }

    let classes = (element.className || "").split(" ");
    if (classes.indexOf("loaded") >= 0) {
      logger.warn("EthicalAd already loaded.");
      return null;
    }

    // Note: this attribute value *must* contain a unit (eg. '200px')
    const placementBottom = element.getAttribute(
      ATTR_PREFIX + "placement-bottom"
    );
    if (placementBottom) {
      element.style.setProperty("bottom", placementBottom);
    }

    return new Placement(publisher, ad_type, element, {
      keywords: keywords,
      style: style,
      campaign_types: campaign_types,
      load_manually,
      force_ad,
      force_campaign,
    });
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
    // Detect the keywords
    this.keywords = this.keywords.concat(this.detectKeywords());

    return this.fetch()
      .then((element) => {
        if (element === undefined) {
          throw new EthicalAdsWarning(
            "Ad decision request blocked or invalid."
          );
        }
        if (!element) {
          throw new EthicalAdsWarning("No ads to show.");
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

        // Apply any styles based on the specified styling
        this.applyStyles(element);

        this.target.appendChild(element);

        return this;
      })
      .then((placement) => {
        // Detect when the ad is in the viewport
        // Add the view pixel to the DOM to count the view
        // Also count the time the ad is in view
        //  this will be sent before the page/tab is closed or navigated away

        let viewport_detection = setInterval(
          (element) => {
            if (placement.inViewport(element)) {
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
          },
          100,
          placement.target
        );

        placement.view_time_counter = setInterval(
          (element) => {
            if (
              placement.tab_hidden === false &&
              placement.inViewport(element)
            ) {
              // Increment the ad's time in view counter
              placement.view_time += VIEW_TIME_INTERVAL;

              if (placement.view_time >= VIEW_TIME_MAX) {
                clearInterval(placement.view_time_counter);
              }
            }
          },
          VIEW_TIME_INTERVAL * 1000,
          placement.target
        );

        placement.hashchange_listener = () => {
          if (placement.canRotate()) {
            placement.sendViewTime();
            placement.rotate();
          }
        };
        window.addEventListener("hashchange", placement.hashchange_listener);

        // Listens to the window visibility
        // Rotates the ad when the window comes back into focus if
        // other conditions (minimum view time, under max rotations)
        // are met.
        // When the tab loses focus, send the view time to the server.
        placement.visibilitychange_listener = () => {
          if (
            document.visibilityState === "hidden" ||
            document.visibilityState === "unloaded"
          ) {
            // Check if the tab loses focus/is closed or the browser/app is minimized/closed
            // In that case, no longer count further time that the ad is in view
            // Send the time the ad was viewed to the server
            placement.tab_hidden = true;
            placement.sendViewTime();
          }

          // This tab was invisible and has come back into focus
          // Trigger an ad rotation
          if (
            placement.tab_hidden === true &&
            document.visibilityState === "visible"
          ) {
            placement.tab_hidden = false;

            if (placement.canRotate()) {
              placement.sendViewTime(); // Should already be sent, but just in case
              setTimeout(function () {
                placement.rotate();
              }, VISIBILITYCHANGE_ROTATION_DELAY * 1000);
            }
          }
        };
        document.addEventListener(
          "visibilitychange",
          placement.visibilitychange_listener
        );

        return this;
      });
  }

  /* Clears all the placement's event listeners */
  clearListeners() {
    if (this.view_time_counter) {
      clearInterval(this.view_time_counter);
    }

    if (this.hashchange_listener) {
      window.removeEventListener("hashchange", this.hashchange_listener);
    }

    if (this.visibilitychange_listener) {
      document.removeEventListener(
        "visibilitychange",
        this.visibilitychange_listener
      );
    }
  }

  /* Returns whether the conditions to rotate are met
   *
   * @returns {boolean} True if the placement can rotate
   */
  canRotate() {
    if (
      !this.inViewport(this.target) ||
      this.view_time < MIN_VIEW_TIME_ROTATION_DURATION ||
      this.rotations >= MAX_ROTATIONS
    ) {
      return false;
    }

    return true;
  }

  /* Reloads the placement with a new ad (if applicable)
   *
   * @returns {Promise}
   */
  rotate() {
    if (!this.canRotate()) {
      return;
    }
    this.clearListeners();

    this.view_time = 0;
    this.view_time_sent = false;
    this.response = null;
    this.tab_hidden = false;

    this.rotations += 1;

    return this.load();
  }

  /* Returns whether the ad is visible in the viewport
   *
   * @param {Element} element - The ad element
   * @returns {boolean} True if the ad is loaded and visible in the viewport
   *  (including the tab being focused and not minimized) and returns false otherwise.
   */
  inViewport(element) {
    if (
      this.response &&
      this.response.view_url &&
      verge.inViewport(element, VIEWPORT_FUDGE_FACTOR) &&
      document.visibilityState === "visible"
    ) {
      return true;
    }

    return false;
  }

  /* Get placement data from decision API
   *
   * @returns {Promise<Element>} Resolves with an Element converted from an HTML
   * string from API response. Can also be null, indicating a noop action.
   */
  fetch() {
    // Make sure callbacks don't collide even with multiple placements
    const callback =
      "ad_" + Date.now() + "_" + Math.floor(Math.random() * 1000000);
    var div_id = callback;
    if (this.target.id) {
      div_id = this.target.id;
    }

    // There's no hard maximum on URL lengths (all of these get added to the query params)
    // but ideally we want to keep our URLs below ~2k which should work basically everywhere
    let params = {
      publisher: this.publisher,
      ad_types: this.ad_type,
      div_ids: div_id,
      callback: callback,
      keywords: this.keywords.join("|"),
      campaign_types: this.campaign_types.join("|"),
      format: "jsonp",
      client_version: AD_CLIENT_VERSION,
      placement_index: this.index,
      // location.href includes query params (possibly sensitive) and fragments (unnecessary)
      url: (window.location.origin + window.location.pathname).slice(0, 256),
    };
    if (this.force_ad) {
      params["force_ad"] = this.force_ad;
    }
    if (this.force_campaign) {
      params["force_campaign"] = this.force_campaign;
    }
    if (this.rotations > 1) {
      params["rotations"] = this.rotations;
    }
    const url_params = new URLSearchParams(params);
    const url = new URL(AD_DECISION_URL + "?" + url_params.toString());

    return new Promise((resolve, reject) => {
      window[callback] = (response) => {
        if (response && response.html && response.view_url) {
          this.response = response;
          const node_convert = document.createElement("div");
          node_convert.innerHTML = response.html;
          return resolve(node_convert.firstChild);
        } else {
          // No ad to show for this targeting/publisher
          return resolve(null);
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

  /* Sends the view time of the ad to the server
   */
  sendViewTime() {
    if (
      this.view_time <= 0 ||
      this.view_time_sent ||
      !this.response ||
      !this.response.view_time_url
    )
      return;

    let pixel = document.createElement("img");
    pixel.src = this.response.view_time_url + "?view_time=" + this.view_time;
    pixel.className = "ea-pixel";
    this.target.appendChild(pixel);

    this.view_time_sent = true;
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
      if (checksRemain == 0 || timeout > 1e3)
        callback(checksRemain == 0 && detected);
      else
        setTimeout(function () {
          beforeCheck(callback, timeout * 2);
        }, timeout * 2);
    }

    function checkImages() {
      if (--checksRemain) return;
      detected = !error1 && error2;
    }
    var random = Math.random() * 11;
    var img1 = new Image();
    img1.onload = checkImages;
    img1.onerror = function () {
      error1 = true;
      checkImages();
    };
    img1.src = px.replace(/\*/, 1).replace(/\*/, random);
    var img2 = new Image();
    img2.onload = checkImages;
    img2.onerror = function () {
      error2 = true;
      checkImages();
    };
    img2.src = px.replace(/\*/, 2).replace(/\*/, random);
    beforeCheck(callback, 250);
  }

  /* Returns an array of keywords (strings) found on the page
   *
   * @returns {Array[string]} Advertising keywords found on the page
   */
  detectKeywords() {
    // Return previously detected keywords
    // If this code has already run.
    // Note: if there are "no" keywords (an empty list) this is still true
    if (detectedKeywords) return detectedKeywords;

    var keywordHist = {}; // Keywords found => count of keyword
    const mainContent =
      document.querySelector("[role='main']") ||
      document.querySelector("main") ||
      document.querySelector("body");

    const words = mainContent.textContent.split(/\s+/);
    const wordTrimmer = /^[\('"]?(.*?)[,\.\?\!:;\)'"]?$/g;
    for (let x = 0; x < words.length && x < MAX_WORDS_ANALYZED; x++) {
      // Remove certain punctuation from beginning and end of the word
      let word = words[x].replace(wordTrimmer, "$1").toLowerCase();
      if (KEYWORDS.has(word)) {
        keywordHist[word] = (keywordHist[word] || 0) + 1;
      }
    }

    // Sort the hist with the most common items first
    // Grab only the MAX_KEYWORDS most common
    const keywords = Object.entries(keywordHist)
      .filter(
        // Only consider a keyword with at least this many occurrences
        (a) => a[1] >= MIN_KEYWORD_OCCURRENCES
      )
      .sort((a, b) => {
        if (a[1] > b[1]) return -1;
        if (a[1] < b[1]) return 1;
        return 0;
      })
      .slice(0, MAX_KEYWORDS)
      .map((x) => x[0]);

    detectedKeywords = keywords;

    return keywords;
  }

  /* Apply custom styles based on data-ea-style
   *
   */
  applyStyles(element) {
    // Stickybox: https://ethical-ad-client.readthedocs.io/en/latest/#stickybox
    if (this.style === "stickybox") {
      let hideButton = document.createElement("div");
      hideButton.setAttribute("class", "ea-stickybox-hide");
      hideButton.innerHTML = "&#215;";
      hideButton.addEventListener("click", function () {
        document.querySelector("[data-ea-publisher]").remove();
      });
      element.appendChild(hideButton);
    }

    // FixedFooter: https://ethical-ad-client.readthedocs.io/en/latest/#fixedfooter
    if (this.style === "fixedfooter") {
      //element.querySelector('.ea-callout a').remove();

      let container = document.createElement("div");
      container.setAttribute("class", "ea-fixedfooter-hide");
      element.appendChild(container);

      let hideButton = document.createElement("span");
      hideButton.append("Close Ad");
      hideButton.addEventListener("click", function () {
        document.querySelector("[data-ea-publisher]").remove();
      });
      container.appendChild(hideButton);
    }
  }
}

/* Detects whether the browser supports the necessary JS APIs to support the ad client
 *
 * Generally we support recent versions of evergreen browsers (Chrome, Firefox, Safari, Edge)
 * but we no longer support IE11.
 *
 *  @returns {boolean} true if all dependencies met and false otherwise
 */
export function check_dependencies() {
  if (
    !Object.entries ||
    !window.URL ||
    !window.URLSearchParams ||
    !window.Promise
  ) {
    logger.error(
      "Browser does not meet ethical ad client dependencies. Not showing ads"
    );
    return false;
  }

  return true;
}

/* Find all placement DOM elements and hot load HTML as child nodes
 *
 * @param {boolean} force_load - load placements even if they are set to load manually
 * @returns {Promise<[Placement]>} Resolves to a list of Placement instances
 */
export function load_placements(force_load = false) {
  // Find all elements matching required data binding attribute.
  const node_list = document.querySelectorAll("[" + ATTR_PREFIX + "publisher]");
  let elements = Array.prototype.slice.call(node_list);

  if (elements.length === 0) {
    logger.warn("No ad placements found.");
  }

  // Create main promise. Iterator `all()` Promise will surround array of found
  // elements. If any of these elements have issues, this main promise will
  // reject.
  return Promise.all(
    elements.map((element, index) => {
      const placement = Placement.from_element(element);

      if (!placement) {
        // Placement has already been loaded
        return null;
      }

      placement.index = index;

      // Run AcceptableAds detection code
      // This lets us know how many impressions are attributed to AceeptableAds
      // Only run this once even for multiple placements
      // All impressions will be correctly attributed
      if (index === 0 && placement && !force_load) {
        placement.detectABP(ABP_DETECTION_PX, function (usesABP) {
          uplifted = usesABP;
          if (usesABP) {
            logger.debug(
              "Acceptable Ads enabled. Thanks for allowing our non-tracking ads :)"
            );
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

export function unload_placements() {
  const node_list = document.querySelectorAll("[" + ATTR_PREFIX + "publisher]");
  let elements = Array.prototype.slice.call(node_list);

  elements.forEach((div) => {
    div.innerHTML = "";
    div.classList.remove("loaded");
  });
}

export function set_verbosity() {
  let element = document.querySelector("[" + ATTR_PREFIX + "publisher]");

  if (element) {
    let user_verbosity = element.getAttribute(ATTR_PREFIX + "verbosity");
    if (VERBOSITY.hasOwnProperty(user_verbosity)) {
      logger.verbosity = VERBOSITY[user_verbosity];
    }
  }
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

/* Reloading placements. Used by SPAs.
 * @type function
 */
export var reload;

/* Whether this ad impression is attributed to being on the Acceptable Ads list.
 * @type boolean
 */
export var uplifted = false;

/* Keywords detected on the page
 * @type {Array[string]}
 */
export var detectedKeywords = null;

/* If importing this as a module, do not automatically process DOM and fetch the
 * ad placement. Only do this if using the module directly, from a `script`
 * element. This will allow for future extension and packaging as a module.
 *
 * This also replicates JQuery `$(document).ready()`, with added protection for
 * usage of `async` -- the DOM ready event can fire before the script is loaded..
 */
if (window.ethicalads) {
  // Always display this warning regardless of log level
  // This is a code mistake by publishers and should be caught right away.
  console.warn(
    "Double-loading the EthicalAds client. Use reload() instead. https://ethical-ad-client.readthedocs.io/en/latest/#single-page-apps"
  );
}
if (check_dependencies()) {
  // Set the client verbosity
  set_verbosity();

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

          if (err instanceof Error) {
            if (err instanceof EthicalAdsWarning) {
              // Report these at a lower log level
              logger.warn(err.message);
              return;
            }
            logger.error(err.message);
          }
        });
    });
  });

  load = () => {
    logger.debug("Loading placements manually");
    load_placements(true);
  };

  reload = () => {
    detectedKeywords = null;
    unload_placements();
    load_placements();
  };
}
