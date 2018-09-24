
const path = require('path');
const entryPoint = './src/index.js';
const outputPoint = './public/js';

module.exports = {
    entry: path.resolve(__dirname, entryPoint),
    output: {
        path: path.resolve(__dirname, outputPoint),
        filename: 'bundle.js',
        publicPath: '/app/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node-module)/,
                loader: 'babel-Loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-Loader!css-Loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-Loader!css-Loader!sass-Loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    }
}
