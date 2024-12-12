const path = require("path");

module.exports = function override(config, env) {
  // Add the path aliases defined in `components.json`
  config.resolve.alias = {
    ...config.resolve.alias,
    "@": path.resolve(__dirname, "src"),
    components: path.resolve(__dirname, "src/components"),
    ui: path.resolve(__dirname, "src/components/ui"),
    lib: path.resolve(__dirname, "src/lib"),
    hooks: path.resolve(__dirname, "src/hooks"),
  };

  return config;
};
