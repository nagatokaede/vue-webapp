const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  entry: './client/main.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, '../webapp'),
  },
  module: {
    rules: [
      // 详细 loader 配置
      {
        // 处理 css 资源
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => {
                // postcss 插件
                require('postcss-preset-env')()
              }
            }
          }
        ],
      },
      {
        // 处理 less 资源
        test: /\.less/,
        use: [ 'style-loader', 'css-loader', 'less-loader' ]
      },
      {
        // 处理 vue 文件
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: '[hash:10].[ext]',
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
      },
      {
        // js 语法检测
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        // js 兼容性处理 babel
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      },
    ]
  },
  // plugins
  plugins: [
    // 详细的 plugins 配置
    new MiniCssExtractPlugin({
      filename: 'css/build.css'
    }),
    new HtmlWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  devServer: {
    contentBase: resolve(__dirname, 'webapp'),
    compress: true,
    port: 3000,
    open: true
  },
  mode: 'development',
};
