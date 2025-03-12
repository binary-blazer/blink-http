const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
  plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "."),
      outDir: path.resolve(__dirname, "pkg"),
      extraArgs: "--no-typescript",
    }),
  ],
};
