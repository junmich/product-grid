const path = require('path');
module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                use: [
                    { loader: 'style-loader', options: { injectType: 'styleTag' } },
                    'css-loader',
                ],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        filename: 'index.js', // place where bundled app will be served
    },
    devServer: {
        inline: true, // autorefresh
        port: 8080 // development port server
    },
};