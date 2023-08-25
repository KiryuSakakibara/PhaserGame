const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const package = require("./package.json");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "./src/index.ts"),
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
        ],
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false
        })]
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index.js",
        clean: true,
    },
    devServer: {
        static: path.resolve(__dirname, "./dist"),
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
            inject: "body",
            hot: true,
        }),
    ],
};