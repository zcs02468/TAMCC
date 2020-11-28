const px2rem = require("postcss-px2rem");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const postcss = px2rem({
    remUnit: 80, //基准大小 baseSize，需要和rem.js中相同
});
module.exports = {
    publicPath:"/tamcc",
    devServer: {
        // baseUrl: "/",
        proxy: {
            "/smartEnergy": {
                target: "http://47.110.226.205:8980",
                // target: "http://10.160.8.103:8090",
                // target: "https://www.easy-mock.com/mock/5f3942727c850a226dfc1fbd",
                // target: " http://mock.jszhong.top/mock/5f394e32af83f705d6899898",
                changeOrigin: true,
            },
            // "/smartEnergy": {
            //     target: "http://218.242.28.28:802",
            //     changeOrigin: true,
            // },
        }
    },
    productionSourceMap: false,
    // css: {
    //     loaderOptions: {
    //         postcss: {
    //             plugins: [postcss],
    //         },
    //     },
    // },

    lintOnSave: false, // 取消 eslint 验证
    // configureWebpack: {
    //     externals: {
    //         BMap: "BMap",
    //     },
    // },
    configureWebpack: (config) => {
        // if (isProd) {
        // 配置webpack 压缩
        config.plugins.push(
            new CompressionWebpackPlugin({
                test: /\.js$|\.html$|\.css$/,
                // 超过4kb压缩
                threshold: 4096,
            })
        );
    
        config.module.rules.push({ 
          test: /\.(swf|ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
           loader: 'file-loader', 
      })
        // }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
    
            ]
        }
    },
    // // 压缩图片
    // chainWebpack: (config) => {
    //     config.module
    //         .rule("images")
    //         .use("image-webpack-loader")
    //         .loader("image-webpack-loader")
    //         .options({ bypassOnDebug: true })
    //         .end();
    // },
  outputDir: 'tamcc',
};
