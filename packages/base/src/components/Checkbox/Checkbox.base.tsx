import * as React from "react";
import PropTypes from "prop-types";
import { ICheckboxProps, ICheckboxSlots } from "./Checkbox.types";
import { useCheckbox } from "./useCheckbox";

export const CheckboxBase: React.FunctionComponent<ICheckboxProps> = (
  props: ICheckboxProps
) => {
  const { children, slots } = props;
    const {
        root: Root = "div",
        label: Label = "div",
        input: Input = "div",
        icon: Icon = "div" 

    } = (slots || {}) as ICheckboxSlots;

    const { slotProps = {} } = useCheckbox(props);

    return (
        <Root {...slotProps.root}>
            <Label {...slotProps.label}>
                <Input {...slotProps.input} />
                <Icon {...slotProps.icon}/>
                {children}
            </Label>
        </Root>
    );
};