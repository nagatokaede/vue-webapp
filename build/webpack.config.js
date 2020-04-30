const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const os = require('os');
// 动态获取 host || 也可在package.json中配置 HOST （--host 0.0.0.0)
const HOST = (() => {
  for (const key in os.networkInterfaces()) {
    for (const item of os.networkInterfaces()[key]) {
      if (item.family === 'IPv4' && item.address.includes('192.168.')) {
        return item.address;
      }
    }
  }
})();

process.env.NODE_ENV = 'development';

const commonCssLoader = [
  MiniCssExtractPlugin.loader, 'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')()
      ]
    }
  }
];

module.exports = {
  entry: './client/main.js',
  output: {
    filename: 'js/main.[hash:10].js',
    path: resolve(__dirname, '../webapp'),
  },
  // 配置vue别名和扩展
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve(__dirname, '../client'),
    }
  },
  module: {
    rules: [
      // 详细 loader 配置
      // {
      //   // js 语法检测
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: {
      //     fix: true
      //   }
      // },
      {
        // 处理 css 资源
        test: /\.css$/,
        use: [ ...commonCssLoader ],
      },
      {
        // 处理 less 资源
        test: /\.less/,
        use: [ ...commonCssLoader, 'less-loader' ]
      },
      {
        // 处理 vue 文件
        test: /\.vue$/,
        exclude: /node_modules/,
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
          outputPath: 'img'
        },
      },
      {
        // 处理其它资源
        exclude: /\.(html|js|css|less|jpg|png|gif|vue)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      },
      {
        // js 兼容性处理 babel
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // babel 缓存，下一次构建时只重新处理更新的文件，使打包更快
          cacheDirectory: true,
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: { version: 3 },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                },
              }
            ]
          ],
          plugins: [
            ['import', {
              libraryName: 'vant',
              libraryDirectory: 'es',
              style: true
            }, 'vant']
          ]
        }
      },
      // {
      //   oneOf: [
      //
      //   ]
      // }
    ]
  },
  plugins: [
    // 详细的 plugins 配置
    // css 文件处理打包
    new MiniCssExtractPlugin({
      filename: 'css/[hash:10].css'
    }),
    // 创建 html 文件
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
    // vue 文件处理打包
    new VueLoaderPlugin(),
    // 打包前清除过去打包的文件夹
    new CleanWebpackPlugin(),
    // CSS 文件压缩
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  devServer: {
    contentBase: resolve(__dirname, '../webapp'),
    compress: true,
    host: HOST,
    port: 3001,
    open: true,
    hot: true
  },
  devtool: 'source-map',
  mode: 'development',
};
