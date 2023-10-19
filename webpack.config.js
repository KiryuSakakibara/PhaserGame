
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const package = require("./package.json");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { argv } = require("process");

var config = {
    entry: path.resolve(__dirname, "./src/game.ts"),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.node$/,
                use: "node-loader",
            }
        ],
    },
    /*
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false
        })],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "phaser",
                    enforce: true,
                    chunks: "initial",
                },
            },
        },
    },
    */
    resolve: {
        extensions: [".js", ".ts"],
        fallback: {
            "path": require.resolve("path-browserify")
        }
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        //filename: "[name].[chunkhash].js",
        //chunkFilename: "[name].[chunkhash].js",
        filename: "index.js",
        clean: true,
    },
    devServer: {
        
        //static: {
        //    directory: path.resolve(__dirname, "./dist"),
        //    watch: true,
        //},
        
        //static: path.resolve(__dirname, "./dist")
        static: [
            {
                directory: path.resolve(__dirname, "./PhaserGameAssets")
            },
            {
                directory: path.resolve(__dirname, "./src")
            }
        ]
        
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "PhaserGameAssets/assets/",
                    to: "assets/",
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
            filename: "index.html",
            title: package.description,
            inject: "head",
            hot: true,
        }),
    ],
    //target: ["web"]
    
};
var webConfig = {
    ...config,
    target: "web"
}

module.exports = (env, argv) => {
    webConfig.plugins.push(new webpack.DefinePlugin({
        "process.env": {
            APP_ENV: JSON.stringify(argv.mode)
        }
    }))
    return webConfig
}
