import React from "react";
import { Slider } from "./Slider";
import { ISliderTokens } from "./Slider.tokens";
import { ThemeContext, ITheme } from "@fluentui/react-theming";
import { number } from "prop-types";

export default {
  component: "Slider",
  title: "Slider"
};

const defaultColorRamp = {
  values: [],
  index: -1
};

const theme: ITheme = {
  colors: {
    background: "",
    brand: defaultColorRamp,
    accent: defaultColorRamp,
    neutral: defaultColorRamp,
    success: defaultColorRamp,
    warning: defaultColorRamp,
    danger: defaultColorRamp
  },
  components: {},
  icons: {},
  radius: {
    base: 0,
    scale: 0,
    unit: "px"
  },
  direction: "ltr",
  fonts: {
    default: "",
    userContent: "",
    mono: ""
  },
  fontSizes: {
    base: 0,
    scale: 0,
    unit: "px"
  },
  animations: {
    fadeIn: {},
    fadeOut: {}
  },
  spacing: {
    base: 0,
    scale: 0,
    unit: "px"
  }
};

const redTheme: ITheme = {
  ...theme,
  components: {
    Slider: {
      tokens: {
        thumbColor: "#900",
        thumbColorHovered: "#b00",
        thumbColorPressed: "#f00"
      }
    }
  }
};

const Wrapper = (p: React.HTMLAttributes<any>) => (
  <ThemeContext.Provider value={theme}>
    <div style={{ padding: 20, ...p.style }}>{p.children}</div>
  </ThemeContext.Provider>
);

export const fluentSlider = () => (
  <Wrapper>
    <Slider
      defaultValue={50}
      slotProps={{ thumb: { "aria-label": "I am a slider" } }}
    />
  </Wrapper>
);

export const fluentSliderDisabled = () => (
  <Wrapper>
    <Slider disabled defaultValue={50} />
  </Wrapper>
);

export const fluentVerticalSlider = () => (
  <Wrapper style={{ display: "flex", height: 200 }}>
    <Slider vertical defaultValue={50} />
    <Slider vertical defaultValue={50} />
    <Slider vertical defaultValue={50} />
  </Wrapper>
);

export const styledRedFluentSlider = (p: React.HTMLAttributes<any>) => (
  <ThemeContext.Provider value={redTheme}>
    <div style={{ padding: 20, ...p.style }}>
      {" "}
      <Slider defaultValue={50} />
    </div>
  </ThemeContext.Provider>
);
