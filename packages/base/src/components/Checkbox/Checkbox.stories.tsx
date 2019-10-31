import React from "react";
import { CheckboxBase } from "./Checkbox.base";

export default {
  component: "Checkbox",
  title: "Base Checkbox"
};

export const baseCheckbox = () => (
  <CheckboxBase checked={true}>
    This renders as a checkbox
  </CheckboxBase>
);

// export const indeterminateCheckbox = () => (
//   <CheckboxBase>
//     This renders as an indeterminate checkbox
//   </CheckboxBase>
// ); 