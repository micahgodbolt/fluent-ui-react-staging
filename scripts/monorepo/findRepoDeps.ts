import path from 'path';
import { getAllPackageInfo } from './getAllPackageInfo';

function getDeps(packageJson: any) {
  if (!packageJson) {
    return [];
  }

  return Object.keys({ ...(packageJson.dependencies || {}), ...(packageJson.devDependencies || {}) });
}

/**
 * Find all the dependencies (and their dependencies) within the repo for a specific package (in the CWD when this was called)
 * @returns {{ packagePath: string; packageJson: any }[]}
 */
function findRepoDeps() {
  const packageInfo = getAllPackageInfo();

  let cwd = process.cwd();

  const packageJson = require(path.join(cwd, 'package.json'));
  const packageDeps = getDeps(packageJson);

  const result = new Set();

  while (packageDeps.length > 0) {
    const dep = packageDeps.pop();
    const info = packageInfo[dep!];

    if (dep && info) {
      result.add(dep);
    }

    if (!info) {
      continue;
    }

    const deps = getDeps(info.packageJson);

    deps.forEach(child => {
      if (!result.has(child)) {
        packageDeps.push(child);
      }
    });
  }

  return [...(result as any)].map(dep => packageInfo[dep!]);
}
export { findRepoDeps };

if (require.main === module) {
  console.log(findRepoDeps());
}