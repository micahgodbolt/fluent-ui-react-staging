import path from 'path';
import { startStorybookTask, buildStorybookTask, storybookConfigExists } from './storybookTask';
import {
  task,
  series,
  parallel,
  condition,
  apiExtractorUpdateTask,
  apiExtractorVerifyTask,
  webpackTask,
  tscTask,
  eslintTask,
  jestTask,
  cleanTask
} from 'just-scripts';

task('storybook:start', startStorybookTask);
task('storybook:build', buildStorybookTask);

task('webpack', webpackTask());
task('ts', tscTask({ build: 'tsconfig.json' }));
task('eslint', eslintTask());
task('jest', jestTask());

task(
  'api:verify',
  apiExtractorVerifyTask({
    fixNewlines: true
  })
);
task(
  'api:update',
  apiExtractorUpdateTask({
    fixNewlines: true
  })
);

task(
  'clean',
  cleanTask({
    paths: ['lib', 'dist']
  })
);
task('build', parallel('ts', condition('storybook:build', storybookConfigExists)));
task('bundle', series('webpack'));
task('test', series('jest'));
task('lint', series('eslint'));
task('start', series('storybook:start'));
