const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/main.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'webapp'),
  },
  module: {
    rules: [
      // 详细 loader 配置
      {
        // 处理 css 资源
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        // 处理 less 资源
        test: /\.less/,
        use: [ 'style-loader', 'css-loader', 'less-loader' ]
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        use: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: '[hash:10].[ext]',
          outputPath: 'media'
        },
      },
      {
        // 处理其它资源
        exclude: /\.(html|js|css|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      }
    ]
  },
  // plugins
  plugins: [
    // 详细的 plugins 配置
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, 'webapp'),
    compress: true,
    port: 3000,
    open: true
  },
  mode: 'development',
};
