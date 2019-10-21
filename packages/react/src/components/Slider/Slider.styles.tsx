import { IResolvedTokens } from "@fluentui/react-theming";
import { ISliderTokens } from "./Slider.tokens";

const styles = (tokens: IResolvedTokens<ISliderTokens>) => ({
  root: {
    position: "relative",
    height: "28px"
  },

  rootDisabled: {},
  rootVertical: {},

  rail: {
    position: "absolute",
    width: "auto",
    height: tokens.railSize,
    borderColor: tokens.railBorderColor,
    borderRadius: tokens.railBorderRadius,
    borderWidth: tokens.railBorderWidth,
    backgroundColor: tokens.railColor,

    $rootVertical: {
      height: "auto",
      width: tokens.railSize
    },

    "$root:hover &": {
      backgroundColor: tokens.railColorHovered
    },

    "$root:active &": {
      backgroundColor: tokens.railColorPressed
    },

    "$root$rootDisabled &": {
      backgroundColor: tokens.railColorDisabled
    }
  },

  track: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    height: "4px",
    backgroundColor: tokens.trackColor,
    "&:focus": {
      outline: "none"
    }
  },

  thumb: {
    position: "absolute",
    boxSizing: "border-box",
    height: tokens.thumbSize,
    width: "16px",
    borderRadius: "16px",
    top: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: tokens.thumbColor,
    borderSize: 2,
    borderStyle: "solid",
    borderColor: tokens.thumbBorderColor
  }
});

export default styles;
