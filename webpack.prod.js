const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const CopyPlugin              = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode : 'production',
    output: {
        filename : 'main.[contentHash].js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }

            ,
            {
                test: /\.css$/,
                exclude : /style\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test : /style\.css$/,
                use : [
                    MiniCss.loader,
                    'css-loader'
                ]
            },

            {
                test : /\.html$/i,
                loader : 'html-loader', 
                options : {
                    minimize : false,
                },
            },
        ]
    },
    plugins : [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCss({
           
        filename : 'main.[contentHash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets" },
            ],
            options: {
              concurrency: 100,
            },
          }),
          new CleanWebpackPlugin()
    ]

}