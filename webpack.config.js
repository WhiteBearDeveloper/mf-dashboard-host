const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const rootDependences = require("./package.json").dependencies;

const weatherWidgetRemoteUrl =
  process.env.WEATHER_WIDGET_REMOTE_URL ||
  "http://localhost:3004/remoteEntry.js";

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
        include: [path.resolve(__dirname, "src")],
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
      {
        test: /\.(woff2?|ttf|otf|eot)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard_host",
      remotes: {
        weatherWidget: `weatherWidget@${weatherWidgetRemoteUrl}`,
      },
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
