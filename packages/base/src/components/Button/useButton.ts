import { IButtonProps } from "./Button.types";
import { mergeSlotProps } from "@fluentui/react-theming";

export interface IButtonState {}

const useButtonState = (userProps: IButtonProps): IButtonState => {
  return {};
}

export const useButton = (props: IButtonProps) => {
  const state = useButtonState(props);
  const { href } = props;

  const slotProps = mergeSlotProps(props, {
    leftIcon: {},
    rightIcon: {},
    root: {
      href
    }
  });
  return {
    slotProps,
    state
  };
};