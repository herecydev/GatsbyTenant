exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const tenant = "es";
  let config = getConfig();
  modifyCssModuleRule(config);
  modifyExtensions(config.resolve.extensions, tenant);
  actions.replaceWebpackConfig(config);
};

const modifyCssModuleRule = config => {
  const cssRule = config.module.rules.find(
    rule =>
      Array.isArray(rule.oneOf) &&
      rule.oneOf.some(
        oneOf => oneOf.test.toString() === /\.module\.css$/.toString()
      )
  );
  const cssModuleRule = cssRule.oneOf.find(
    oneOf => oneOf.test.toString() === /\.module\.css$/.toString()
  );
  cssModuleRule.test = /\.module(\..+)\.css$/;
};

const modifyExtensions = (extensions, tenant) => {
  const jsIndex = extensions.findIndex(element => element === `.js`);
  extensions.splice(jsIndex, 0, `.${tenant}.js`, `.${tenant}.jsx`);
  extensions.push(`.${tenant}.css`, `.css`);
};
