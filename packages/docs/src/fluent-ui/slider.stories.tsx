import * as React from 'react';
import { Slider } from '@fluentui/react/lib/components/Slider/Slider';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

export const withText = () => <Slider onClick={action('onClick')}>Hello Button</Slider>;

export const withEmoji = () => (
  <Slider>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Slider>
);

const stories = storiesOf('@fluentui/react/MostlyRedSlider', module);

stories.add('Default', withText, { info: { inline: true } });

stories.add('It has the emojis', withEmoji, { info: { inline: true } });
