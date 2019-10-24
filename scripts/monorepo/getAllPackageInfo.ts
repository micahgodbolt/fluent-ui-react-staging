import { spawnSync } from 'child_process';
import path from 'path';
import { findGitRoot } from './findGitRoot';

interface PackageJson {
  name: string;
  version: string;
  main: string;
  types?: string;
  module?: string;
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
}

interface PackageInfo {
  packagePath: string;
  packageJson: PackageJson;
}

export function getAllPackageInfo() {
  const gitRoot = findGitRoot();
  const results = spawnSync('git', ['ls-tree', '-r', '--name-only', '--full-tree', 'HEAD']);
  const packageInfo: { [key: string]: PackageInfo } = {};

  results.stdout
    .toString()
    .split('\n')
    .map((line: string) => {
      return line.trim();
    })
    .filter((line: string) => line.endsWith('package.json'))
    .forEach((packageJsonFile: string) => {
      const packageJson = require(path.join(gitRoot, packageJsonFile));

      if (packageJson) {
        packageInfo[packageJson.name] = {
          packagePath: path.dirname(packageJsonFile),
          packageJson
        };
      }
    });

  return packageInfo;
}
