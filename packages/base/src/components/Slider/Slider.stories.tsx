import React from 'react';
import { Slider } from './Slider';

export default {
  component: 'Slider',
  title: 'Base Slider'
};

export const aTypicalSlider = () => <Slider min={0} max={10} defaultValue={5} />;
