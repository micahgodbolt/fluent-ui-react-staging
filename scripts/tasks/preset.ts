import { startStorybookTask, buildStorybookTask, storybookConfigExists } from './storybookTask';
import { task, series, parallel, condition, webpackTask, tscTask, eslintTask, jestTask } from 'just-scripts';

task('storybook:start', startStorybookTask);
task('storybook:build', buildStorybookTask);

task('webpack', webpackTask());
task('ts', tscTask({ build: 'tsconfig.json' }));
task('eslint', eslintTask());
task('jest', jestTask());

task('build', parallel('ts', condition('storybook:build', storybookConfigExists)));
task('bundle', series('webpack'));
task('test', series('jest'));
task('lint', series('eslint'));
task('start', series('storybook:start'));
