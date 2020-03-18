module.exports = api => {
  const isTestEnv = api.env("test");

  return {
    babelrc: false,
    ignore: ["./node_modules"],
    presets: [
      [
        "@babel/preset-env",
        {
          loose: true,
          targets: isTestEnv
            ? { node: "current" }
            : { browserslist: "> 0.25%, not dead" }
        }
      ],
      "@babel/preset-react",
      "@babel/preset-typescript"
    ]
  };
};
