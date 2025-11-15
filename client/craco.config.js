const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const oneOf = webpackConfig.module.rules.find((r) => r.oneOf).oneOf;
      const babelRule = oneOf.find(
        (rule) => rule.loader && rule.loader.includes("babel-loader")
      );

      if (babelRule) {
        // ensure the alan sdk is transpiled by babel
        const alanPath = path.resolve(
          __dirname,
          "node_modules/@alan-ai/alan-sdk-web"
        );
        if (Array.isArray(babelRule.include)) {
          babelRule.include.push(alanPath);
        } else if (babelRule.include) {
          babelRule.include = [babelRule.include, alanPath];
        } else {
          babelRule.include = [path.resolve(__dirname, "src"), alanPath];
        }
      }
      return webpackConfig;
    },
  },
};
