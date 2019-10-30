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

const teamsThemeLight: ITheme = {
  ...theme,
  components: {
    Slider: {
      tokens: {
        railSize: "0.1429rem",
        trackSize: "0.1429rem",
        railColor: "rgb(225, 223, 221)",
        railColorHovered: { dependsOn: "railColor" },
        trackColor: "rgb(98, 100, 167)",
        trackColorHovered: { dependsOn: "trackColor" },
        thumbSize: "0.7143rem",
        thumbBorderWidth: 0,
        thumbColor: "rgb(96, 94, 92)",
        thumbSizePressed: "1rem"
      } as ISliderTokens
    }
  }
};

const Wrapper = (p: React.HTMLAttributes<any>) => (
  <div>
    <ThemeContext.Provider value={theme}>
      <div style={{ padding: 20, ...p.style }}>{p.children}</div>
    </ThemeContext.Provider>
  </div>
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

export const teamsLightSlider = (p: React.HTMLAttributes<any>) => (
  <Wrapper>
    <ThemeContext.Provider value={teamsThemeLight}>
      <div style={{ padding: 20, ...p.style }}>
        <Slider defaultValue={50} />
      </div>
    </ThemeContext.Provider>
  </Wrapper>
);
