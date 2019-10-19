import React from 'react';
import { Slider } from './Slider';

export default {
  component: 'Slider',
  title: 'Slider'
};

export const aTypicalSlider = () => (
  <>
    Some Text
    <Slider min={0} max={10} defaultValue={5} />
  </>
);
