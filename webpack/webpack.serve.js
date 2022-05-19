/* global module, __dirname */
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        static: [ path.resolve(__dirname, '../') ],
        port: 3003
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Converse.js Dev',
            template: 'webpack.html',
            filename: 'index.html'
        }),
        new WorkboxPlugin.GenerateSW({
           // these options encourage the ServiceWorkers to get in there fast
           // and not allow any straggling "old" SWs to hang around
           clientsClaim: true,
           skipWaiting: true,
        }),
    ],
});
