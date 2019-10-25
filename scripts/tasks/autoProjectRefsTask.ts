import { getAllPackageDeps } from '../monorepo/getAllPackageDeps';
import path from 'path';
import fs from 'fs';
import { getAllPackageInfo } from '../monorepo/getAllPackageInfo';
import { findGitRoot } from '../monorepo/findGitRoot';

export function autoProjectRefsTask() {
  const excluded = ['@fluentui/scripts', 'fluent-ui-monorepo'];
  const repoDeps = getAllPackageDeps();
  const allInfo = getAllPackageInfo();
  const root = findGitRoot();
  let isDirty = false;

  for (const [name, info] of Object.entries(allInfo)) {
    if (excluded.includes(name)) {
      continue;
    }

    isDirty = false;
    const deps = repoDeps.get(name);
    const tsconfigFile = path.join(root, info.packagePath, 'tsconfig.json');
    const tsconfigJson = JSON.parse(fs.readFileSync(tsconfigFile, 'utf-8'));

    const newRefs = [...deps]
      .sort()
      .filter(d => !excluded.includes(d))
      .map(d => {
        const relPath = path.relative(info.packagePath, allInfo[d].packagePath);
        return { path: `${path.join(relPath, 'tsconfig.json').replace(/\\/g, '/')}` };
      });

    if (newRefs.length === 0) {
      if (tsconfigJson.references) {
        delete tsconfigJson.references;
        isDirty = true;
      }
    } else if (JSON.stringify(tsconfigJson.references) !== JSON.stringify(newRefs)) {
      console.log('OVERWRITTEN: ', tsconfigJson.references, newRefs);
      tsconfigJson.references = newRefs;
      isDirty = true;
    }

    if (isDirty) {
      fs.writeFileSync(tsconfigFile, JSON.stringify(tsconfigJson, null, 2));
    }
  }
}
