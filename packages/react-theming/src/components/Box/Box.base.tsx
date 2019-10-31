import { mergeSlotProps } from "../../utilities/mergeSlotProps";

export interface IBoxBaseProps {
  as?: string;
  slots?: { 
    root?: React.ReactType; 
  };
  slotProps?: {
    root?: 
  };
  classes?: {};
}

export const BoxBase = (props: React.PropsWithChildren<IBoxBaseProps>) => {
  const { as, slots = {} } = props;
  const { root: Root = as || "div" } = slots;
  const slotProps = mergeSlotProps(props, Root);

  return <Root {...slotProps.root} />;
};
