/* global __dirname, module, process */
const ASSET_PATH = process.env.ASSET_PATH || '/dist/'; // eslint-disable-line no-process-env
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require("./webpack.common.js");
const path = require('path');
const webpack = require('webpack');
const { merge }  = require("webpack-merge");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest')



const plugins = [
    new MiniCssExtractPlugin({filename: '../dist/converse.min.css'}),
    new MiniCssExtractPlugin({filename: '../dist/converse.css'}),
    new CopyWebpackPlugin({
        patterns: [
            {from: 'node_modules/strophe.js/src/shared-connection-worker.js', to: 'shared-connection-worker.js'},
            {from: 'sounds', to: 'sounds'},
            {from: 'images/favicon.ico', to: 'images/favicon.ico'},
            {from: 'images/custom_emojis', to: 'images/custom_emojis'},
            {from: 'logo/conversejs-filled-192.png', to: 'images/logo'},
            {from: 'logo/conversejs-filled-512.png', to: 'images/logo'},
            {from: 'logo/conversejs-filled-192.svg', to: 'images/logo'},
            {from: 'logo/conversejs-filled-512.svg', to: 'images/logo'},
            {from: 'logo/conversejs-filled.svg', to: 'images/logo'},
            {from: 'src/shared/styles/webfonts', to: 'webfonts'}
        ]
    }),
    new webpack.DefinePlugin({ // This makes it possible for us to safely use env vars on our code
        'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }),
/*
	new WebpackPwaManifest({
  		filename: "./manifest.json",
		name: 'My Progressive Web App',
		short_name: 'MyPWA',
		description: 'My awesome Progressive Web App!',
		background_color: '#ffffff',
		crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
		icons: [
			{
				src: path.resolve('src/assets/icon.png'),
				sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
			},
			{
				src: path.resolve('src/assets/large-icon.png'),
				size: '1024x1024' // you can also use the specifications pattern
			},
			{
				src: path.resolve('src/assets/maskable-icon.png'),
				size: '1024x1024',
				purpose: 'maskable'
			}
		]
	})
	,
	*/
/*
    new WorkboxPlugin.GenerateSW({
       // these options encourage the ServiceWorkers to get in there fast
       // and not allow any straggling "old" SWs to hang around
       clientsClaim: true,
       skipWaiting: true,
     }),*/

	
	new WorkboxWebpackPlugin.InjectManifest({
		swSrc: "./src/src-sw.js",
		swDest: "../service-worker.js"/*,
		include: [
			/\.html$/,
			/\.js$/,
			/\.css$/,
			/\.jpg$/,
			/\.png$/
		]*/
	})
	
	
];

module.exports = merge(common, {
    plugins,
    entry: {
        "converse": path.resolve(__dirname, "../src/entry.js"),
        "converse.min": path.resolve(__dirname, "../src/entry.js"),
    },
    output: {
        publicPath: ASSET_PATH,
        filename: "[name].js",
    },
    mode: "production",
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        url: false,
                        sourceMap: true

                    }
                },
                'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            includePaths: [
                                path.resolve(__dirname, '../node_modules/'),
                                path.resolve(__dirname, '../src/')
                            ]
                        },
                        sourceMap: true
                    }
                }
            ]
        }]
    }
});
