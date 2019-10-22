import path from 'path';
import { spawnSync } from 'child_process';
import { resolve } from 'just-scripts';

export function rollupTask() {
  spawnSync(process.execPath, [resolve('rollup/dist/bin/rollup'), '-c', path.resolve(__dirname, '../config/rollup/rollup.config.js')], {
    stdio: 'inherit'
  });
}
