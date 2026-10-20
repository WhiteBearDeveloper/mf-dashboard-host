const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const rootDependences = require("./package.json").dependencies;

module.exports = {
  mode: "development",

  entry: path.resolve(__dirname, "src/index.tsx"),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "auto",
    uniqueName: "dashboard_host",
    clean: true,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: /\.module\.s[ac]ss$/i,
                namedExport: false,
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard_host",
      remotes: {},
      shared: {
        react: {
          singleton: true,
          requiredVersion: rootDependences.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: rootDependences["react-dom"],
        },
        "react-dom/client": {
          singleton: true,
          requiredVersion: rootDependences["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],

  devServer: {
    port: 3000,
  },
};
