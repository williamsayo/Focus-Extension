const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { constants } = require("buffer");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "assets"),
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-import",
                                    "tailwindcss",
                                    {
                                        "postcss-parent-selector": {
                                            selector: ".parentclass",
                                        },
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    entry: {
        popup: "./src/popup/popup.ts",
        blockedsite: "./src/popup/blockedSites.ts",
        help: "./src/popup/help.ts",
        content: "./src/content/content.ts",
        background: "./src/background/background.ts",
        utils: "./src/utils/utils.ts",
    },
    output: {
        filename: "src/[name]/[name].js",
        path: path.resolve(path.dirname(__dirname), "dist"),
        clean: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "manifest.json" },
                {
                    from: "templates",
                    to: "templates",
                },
                {
                    from: "assets",
                    to: "assets",
                },
                // {
                //     from: "assets",
                //     to: "templates",
                //     globOptions: {
                //         dot: true,
                //         gitignore: true,
                //         ignore: [
                //             "**/*.json",
                //             "**/*.config.{js,ts}",
                //             "**/src/**",
                //             "**/node_modules/**",
                //             "**/dist/**",
                //         ],
                //     },
                // },
            ],
        }),
    ],
};
