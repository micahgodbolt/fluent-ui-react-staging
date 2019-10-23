const { defaults: tsjPreset } = require('ts-jest/presets');
const { resolveCwd } = require('just-scripts');

module.exports = {
  transform: {
    ...tsjPreset.transform
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
  globals: {
    'ts-jest': {
      tsConfig: resolveCwd('tsconfig.json'),
      packageJson: resolveCwd('package.json')
    }
  }
};
