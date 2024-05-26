const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#0aa347",
          "@link-color": "#0aa347",
          "@border-radius-base": "10px",
          "@colorBgContainer": "#0aa347",
        },
      },
    },
  ],
};
