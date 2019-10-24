import { getAllPackageInfo } from '../monorepo/getAllPackageInfo';
import fs from 'fs';
import path from 'path';

export function publishPrepareTask() {
  const allInfo = getAllPackageInfo();

  for (const info of Object.values(allInfo)) {
    if (info.packageJson.main && info.packageJson.main.startsWith('src/index')) {
      const newPackageJson = info.packageJson.main.replace('src/', 'lib/').replace(/\.tsx?/, '.js');
      fs.writeFileSync(path.join(info.packagePath, 'package.json'), JSON.stringify(newPackageJson, null, 2));
    }
  }
}
