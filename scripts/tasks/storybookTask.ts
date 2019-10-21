import { resolveCwd } from 'just-scripts';

export function storybookConfigExists() {
  return !!resolveCwd('.storybook/config.js');
}

export function startStorybookTask() {
  require('@storybook/react/bin/index');
}

export function buildStorybookTask() {
  require('@storybook/react/bin/build');
}
