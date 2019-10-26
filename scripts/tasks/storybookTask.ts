import { resolveCwd } from 'just-scripts';
import path from 'path';

export function storybookConfigExists() {
  return !!resolveCwd('./.storybook/config.js');
}

export async function startStorybookTask() {
  const storybook = require('@storybook/react/standalone');
  await storybook({
    mode: 'dev',
    configDir: path.join(process.cwd(), '.storybook')
  });
}

export async function buildStorybookTask() {
  const storybook = require('@storybook/react/standalone');
  await storybook({
    mode: 'static',
    configDir: path.join(process.cwd(), '.storybook'),
    outputDir: path.join(process.cwd(), 'dist'),
    quiet: true
  });
}
