const path = require('path');

module.exports = {
webpack: {
configure: (webpackConfig) => {
const sassRule = webpackConfig.module.rules.find(
(rule) => rule.oneOf && rule.oneOf.find((r) => r.test && r.test.toString() === '/\.scss$/')
);
if (sassRule) {
    const sassLoaders = sassRule.oneOf.filter((rule) => rule.use);

    sassLoaders.forEach((loader) => {
        loader.use.forEach((item) => {
            if (item.loader && item.loader.includes('sass-loader')) {
                item.options = {
                    ...item.options,
                    implementation: require('sass'),
                    sassOptions: {
                        includePaths: [path.resolve(__dirname, 'src/styles')],
                    },
                };
            }
        });
    });
}

return webpackConfig;
},
},
};