'use static';

const { resolve } = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = hashType => {
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

  return {
    entry: './client/main.js',
    output: {
      filename: `js/main.[${hashType}:10].js`,
      path: resolve(__dirname, '../webapp'),
      // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
      // 可以解决 background-image 加载 imgs/a.jpg 资源时添加 css 路径
      publicPath: '/',
    },
    // 配置vue别名和扩展
    resolve: {
      extensions: ['.js', '.vue', '.json'],
    },
    module: {
      rules: [
        // 详细 loader 配置
        {
          // js 语法检测
          test: /\.js$/,
          exclude: /node_modules/,
          // 优先执行
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            // 自动修复eslint的错误
            fix: true
          }
        },
        {
          // 处理 vue 文件
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        },
        {
          oneOf: [
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
              // 处理图片资源
              test: /\.(jpg|png|gif)$/,
              loader: 'url-loader',
              options: {
                limit: 8 * 1024,
                esModule: false,
                name: `[${hashType}:10].[ext]`,
                outputPath: 'img'
              },
            },
            {
              // 处理其它资源
              exclude: /\.(html|js|css|less|jpg|png|gif|vue)$/,
              loader: 'file-loader',
              options: {
                name: `[${hashType}:10].[ext]`,
                outputPath: 'media'
              }
            },
            {
              // js 兼容性处理 babel
              test: /\.js$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'thread-loader',
                  options: {
                    workers: 2 // 进程2个
                  }
                },
                {
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
                      }, 'vant'],
                      '@babel/plugin-syntax-dynamic-import'
                    ]
                  }
                },
              ],
              
            },
          ],
        },
      ]
    },
    plugins: [
      // 详细的 plugins 配置
      // css 文件处理打包
      new MiniCssExtractPlugin({
        filename: `css/[${hashType}:10].css`
      }),
      // vue 文件处理打包
      new VueLoaderPlugin(),
    ],
  };
};
