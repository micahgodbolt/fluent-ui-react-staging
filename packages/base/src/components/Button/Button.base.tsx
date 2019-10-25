import React from "react";
import PropTypes from "prop-types";
import { IButtonProps, IButtonSlots } from "./Button.types";
import { useButton } from "./useButton";

export const ButtonBase: React.FunctionComponent<IButtonProps> = (props: IButtonProps) => {
    const { children, href, slots } = props;
    const { tag, type } = _deriveRootType(href);
    const {
        leftIcon: LeftIcon = "i",
        rightIcon: RightIcon = "i",
        root: Root = tag
    } = (slots || {}) as IButtonSlots;

    const { slotProps = {} } = useButton(props);

    return (
        <Root {...slotProps.root}>
            <LeftIcon {...slotProps.leftIcon} />
            {children}
            <RightIcon {...slotProps.rightIcon} />
        </Root>
    );
};

interface IButtonRootType {
    tag: 'button' | 'a';
    type: 'button' | 'link';
}

function _deriveRootType(href?: string): IButtonRootType {
    return !!href ? { tag: 'a', type: "link" } : { tag: 'button', type: 'button'};
}
  