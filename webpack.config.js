module.exports = {
    entry: "./src/js/app.jsx",
    output: {
        path: "./build/",
        filename: "estimator.js"
    },
    module: {
        loaders: [
            {test: /\.jsx$/, loader: "jsx-loader"},
        ]
    }
}