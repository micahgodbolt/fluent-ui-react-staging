import { configure } from '@storybook/react';

const req = require.context('../src/components', true, /\.stories\.tsx$/);

function loadStories() {
  return req.keys().map(req);
}

configure(loadStories, module);
