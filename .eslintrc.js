module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["tsc", "jest"],
  root: true,
  rules: {
    quotes: ["warn", "double", { allowTemplateLiterals: true }],
    "tsc/config": [
      1,
      {
        configFile: "tsconfig.json"
      }
    ],
    "comma-dangle": 0
  },
  parserOptions: {
    sourceType: "module"
  }
};
