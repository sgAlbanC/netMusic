const path = require('path');
module.exports = {
    devServer: {
      proxy: { 
        '/api':  { 
            target: 'http://124.220.201.234:3000/',
            changeOrigin: true,
            withCredentials: true,
            pathRewrite: {
              '^/api': ''
            }
        },
      }
    },
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
          path.resolve(__dirname, './src/assets/css/globalcolor.less')
        ]
      }
    },
    // resolve: {
    //   extensions: ['.js', '.vue', '.json'],
    //   alias: {
    //     'vue$': 'vue/dist/vue.esm.js',
    //     '@': resolve('src'),
    //   }
    // },
  }