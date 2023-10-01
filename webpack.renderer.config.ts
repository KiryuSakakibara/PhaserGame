
import { Configuration } from "webpack";
const CopyWebpackPlugin = require("copy-webpack-plugin");

export const rendererConfig: Configuration = {
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
    resolve: {
        extensions: [".js", ".ts"],
        modules: ["node_modules"],
        fallback: {
            "path": require.resolve("path-browserify")
        }
        
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "PhaserGameAssets/assets/",
                    to: "main_window/assets/",
                },
            ],
        }),
    ],
    
};


/*
import type { Configuration } from 'webpack';

export const rendererConfig: Configuration = {
  module: {
    rules: [
        {
            // We're specifying native_modules in the test because the asset relocator loader generates a
            // "fake" .node file which is really a cjs file.
            test: /native_modules[/\\].+\.node$/,
            //test: /\.node$/,
            use: 'node-loader',
        },
        {
            test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
            //test: /\.(m?js|node)$/,
            parser: { amd: false },
            use: {
            loader: '@vercel/webpack-asset-relocator-loader',
            options: {
                //outputAssetBase: "native_modules",
            }
            },
        },
        {
            test: /\.tsx?$/,
            exclude: /(node_modules|\.webpack)/,
            use: {
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
            },
            },
        },
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    modules: ["node_modules"],
  },
  output: {
    publicPath: "auto"
  },
  target: "electron-renderer"
};
*/