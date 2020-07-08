const webpack = require("webpack");
const path = require("path");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// Use export as a function to inspect `--mode`
module.exports = (env, argv) => {
  const production = argv.mode == "production";

  return {
    entry: "./index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: production ? "ethicalads.min.js" : "ethicalads.js",
      library: ["ethicalads"],
      globalObject: "this",
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    optimization: {
      minimize: production,
      minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin({})],
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: ["./node_modules/"],
    },
    devServer: {
      open: false,
      hot: false,
      liveReload: true,
      publicPath: "/dist/",
      disableHostCheck: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  };
};
