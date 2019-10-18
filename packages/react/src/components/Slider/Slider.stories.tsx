import * as React from 'react';
import { Slider } from './Slider';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

export const withText = () => <Slider onClick={action('onClick')}>Hello Button</Slider>;

export const withEmoji = () => (
  <button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </button>
);

const stories = storiesOf('@fluentui/react/Slider', module);

stories.add('Default', withText, { info: { inline: true } });

stories.add('It has the emojis', withEmoji, { info: { inline: true } });
