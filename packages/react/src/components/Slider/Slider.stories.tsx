import React from 'react';
import { Slider } from './Slider';

export default {
  component: 'Slider',
  title: 'Slider'
};

export const fluentSlider = () => <Slider min={0} max={10} defaultValue={5} />;
