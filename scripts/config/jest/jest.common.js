const { defaults: tsjPreset } = require('ts-jest/presets');
const { resolveCwd } = require('just-scripts');

module.exports = {
  transform: {
    ...tsjPreset.transform
  },
  globals: {
    'ts-jest': {
      tsConfig: resolveCwd('tsconfig.json'),
      packageJson: resolveCwd('package.json')
    }
  }
};
