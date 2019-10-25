import React from "react";
import { ButtonBase } from "./Button.base";

export default {
  component: "Button",
  title: "Base Button"
};

export const baseButton = () => (
  <ButtonBase>
    This renders as a button
  </ButtonBase>
);

export const baseButtonWithHref = () => (
  <ButtonBase href="www.bing.com">
    This renders as a link
  </ButtonBase>
);