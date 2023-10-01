import type { Configuration } from 'webpack';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
    entry: './src/main.ts',
    // Put your normal webpack config below here
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
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
        modules: ["node_modules"],
    },
    output: {
        publicPath: "auto"
    },
    target: "electron-main"
};
