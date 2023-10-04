{
    test: /\.scss$/,
    include: [path.join(__dirname, './../', 'src')],
    use: [
        'style-loader',
        'css-loader',
        'sass-loader'
    ]
},