const path = require("path");
require("dotenv").config();
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/app.tsx",
    background: "./src/background.ts",
  },
  output: {
    path: path.join(__dirname, process.env.DIST_DIR),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpeg|png|jpg|gif)$/,
        loader: "url-loader",
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["main"],
      filename: "popup.html",
      template: "src/index.html"
    }),
  ],
};
