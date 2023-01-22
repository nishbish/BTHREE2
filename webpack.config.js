const path = require('path');

module.exports = {
    mode: 'production',    
    entry: './app/src/index.js',
    output: {
        filename: './app/dist/bundle.js',
        path: path.resolve(__dirname, ''),
    },
    devtool: 'source-map',
    watchOptions: {
        ignored: /node_modules/,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        // Compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],     
    },
};