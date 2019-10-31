import * as React from "react";
import { mergeSlotProps } from "@fluentui/react-theming";
import { ICheckboxProps } from "./Checkbox.types";
import { checkServerIdentity } from "tls";

export interface ICheckboxState {
  onChange: (ev: MouseEvent, checked: boolean) => void;
  checked: boolean;
  rootRef: React.Ref<Element>;
}

const useCheckboxState = (userProps: ICheckboxProps): ICheckboxState => {
  const { disabled, onChange } = userProps;
  const [checked, setChecked] = React.useState(false);
  const rootRef = React.useRef<HTMLElement>(null);

  const onCheckboxChange = (ev: MouseEvent, checked: boolean) => {
    if (!disabled && onChange) {
      setChecked(!checked);

      if (ev.defaultPrevented) {
        return;
      }
    }
  }

  return { 
    onChange: onCheckboxChange,
    checked,
    rootRef
  };
};

export const useCheckbox = (props: ICheckboxProps) => {
  const { disabled, checked, onChange } = props;

  const state = useCheckboxState(props);
  const { rootRef } = state;

  const slotProps = mergeSlotProps(props, {
    root: {
      "aria-disabled": disabled,
      "aria-checked": checked,
      checked,
      onChange,
      ref: rootRef,
      role: "Checkbox",
      type: "Checkbox"
    }
  })

  return {
    slotProps,
    state
  };
};