// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require("html-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Dotenv = require("dotenv-webpack");

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: `./.env.${process.env.CONTEXT}` });

module.exports = {
  mode: process.env.CONTEXT != "prod" ? "development" : "production",
  entry: "./src/index.tsx",
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2015",
          sourcemap: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                // localIdentName: "[hash:base64:7]--[local]",
                localIdentName: "[local]",
                exportLocalsConvention: "camelCaseOnly",
              },
              url: true,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|mp3|mp4)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 0,
          },
        },
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Personal Page",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
    }),
    new Dotenv({
      path: `./.env.${process.env.CONTEXT}`,
    }),
  ],
  devServer: {
    allowedHosts: "all",
    static: path.join(__dirname, "dist"),
    compress: true,
    port: process.env.EXTERNAL_FRONT_PORT,
    open: false,
  },
};
