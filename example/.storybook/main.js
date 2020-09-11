const { withUnimodules } = require('@expo/webpack-config/addons');
const { resolve } = require('path');

module.exports = {
  webpackFinal: async (config, { configType }) => {
    return withUnimodules(config, { projectRoot: resolve(__dirname, '../') });
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};
