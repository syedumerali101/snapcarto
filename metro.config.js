const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

config.resolver.alias = {
  '@': path.resolve(projectRoot, 'src'),
};

module.exports = config;