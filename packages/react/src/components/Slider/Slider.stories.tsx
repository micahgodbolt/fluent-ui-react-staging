import React from "react";
import { Slider } from "./Slider";
import { ISliderTokens } from "./Slider.tokens";
// import { ThemeProvider } from "@fluentui/react-theming";

export default {
  component: "Slider",
  title: "Slider"
};

const Wrapper = (p: React.HTMLAttributes<any>) => (
  <div style={{ padding: 20, ...p.style }}>{p.children}</div>
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

// export const styledFluentSlider = () => (
//   <ThemeProvider
//     theme={{
//       components: {
//         Slider: {
//           tokens: {
//             trackColor: "green",
//             railColor: "red"
//           } as ISliderTokens
//         }
//       }
//     }}
//   >
//     <Slider />
//   </ThemeProvider>
// );
