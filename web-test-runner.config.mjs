import { importMapsPlugin } from "@web/dev-server-import-maps";
import { fromRollup, rollupAdapter } from "@web/dev-server-rollup";
import { chromeLauncher } from "@web/test-runner-chrome";
import rollupCommonjs from "@rollup/plugin-commonjs";
import rollupImage from "@rollup/plugin-image";
import rollupJson from "@rollup/plugin-json";
import rollupLitCss from "rollup-plugin-lit-css";
import rollupScss from "rollup-plugin-scss";

const pluginCommonjs = fromRollup(rollupCommonjs);

export default {
  rootDir: ".",
  files: ["./tests/**/*.html"],
  preserveSymlinks: true,
  nodeResolve: {},
  mimeTypes: {
    "**/*.scss": "js",
    "**/*.css": "js",
    "**/*.svg": "js",
    "**/*.json": "js",
  },
  plugins: [
    rollupAdapter(rollupScss({ output: false, verbose: true })),
    rollupAdapter(rollupJson()),
    rollupAdapter(rollupImage()),
    rollupAdapter(rollupLitCss()),
    pluginCommonjs({
      include: ["node_modules/**"],
      requireReturnsDefault: "preferred",
    }),
  ],
};
