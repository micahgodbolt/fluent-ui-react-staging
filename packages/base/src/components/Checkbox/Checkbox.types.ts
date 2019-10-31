import { IClasses, ISlotProps, ISlottableProps } from "../../utilities/ISlots";

export interface ICheckboxSlots {
  /** Intended to contain the Checkbox. */
  root: React.ReactType;

  /** Label to display next to the checkbox. */
  label: React.ReactType;

  /** Custom icon that defines the checkmark rendered by the checkbox. */
  icon: React.ReactType;

  /**  The input element that represents the actual checkbox. */
  input: React.ReactType;
}

export type ICheckboxSlotProps = ISlotProps<ICheckboxSlots>;

export interface ICheckboxClasses extends IClasses<ICheckboxSlots> {}

export interface ICheckboxProps extends ISlottableProps<ICheckboxSlotProps, ICheckboxClasses> {
  /** Defines the children of the Checkbox component. */
  children?: React.ReactNode;

  /** Defines whether the Checkbox is in an enabled or disabled state. */
  disabled?: boolean;
  
  /** Defines whether default value of the checkbox is checked or unchecked. */
  checked: boolean;
  
  /** Defines a callback that is triggered when the Checkbox is toggled. */
  onChange?: (ev: MouseEvent, checked: boolean) => void;
}