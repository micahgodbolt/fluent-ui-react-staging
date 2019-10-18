import { resolve, resolveCwd } from 'just-scripts';

export function storybookConfigExists() {
  return !!resolveCwd('.storybook/config.js');
}

export function startStorybookTask() {
  if (storybookConfigExists()) {
    require('@storybook/react/bin/index');
  }
}

export function buildStorybookTask() {
  if (storybookConfigExists()) {
    require('@storybook/react/bin/build');
  }
}
