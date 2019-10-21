import React from "react";
import { SliderBase } from "./Slider.base";

export default {
  component: "Slider",
  title: "Base Slider"
};

export const aTypicalSlider = () => (
  <SliderBase min={0} max={10} defaultValue={5} />
);
