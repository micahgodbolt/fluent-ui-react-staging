import path from "path";
import {
  startStorybookTask,
  buildStorybookTask,
  storybookConfigExists
} from "./storybookTask";
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
  cleanTask,
  resolve
} from "just-scripts";
import { spawnSync } from "child_process";

task("storybook:start", startStorybookTask);
task("storybook:build", buildStorybookTask);

task("webpack", webpackTask());
task("ts", tscTask({ build: "tsconfig.json" }));
task("eslint", eslintTask());
task("jest", jestTask());
task(
  "update-snapshots",
  jestTask({
    ...(process.env.TF_BUILD && { runInBand: true }),
    updateSnapshot: true
  })
);

task(
  "api-extractor:verify",
  apiExtractorVerifyTask({
    fixNewlines: true
  })
);
task(
  "api-extractor:update",
  apiExtractorUpdateTask({
    fixNewlines: true
  })
);
task(
  "clean",
  cleanTask({
    paths: ["lib", "dist", "tsconfig.tsbuildinfo"]
  })
);

task("rollup:dts", () => {
  spawnSync(
    process.execPath,
    [
      resolve("rollup/dist/bin/rollup"),
      "-c",
      path.resolve(__dirname, "../config/rollup/rollup.config.js")
    ],
    {
      stdio: "inherit"
    }
  );
});

task(
  "build",
  parallel("ts", condition("storybook:build", storybookConfigExists))
);

task("bundle", series("webpack"));
task("test", series("jest"));
task("lint", series("eslint"));
task("start", series("storybook:start"));
task(
  "start-test",
  jestTask({
    watch: true
  })
);
