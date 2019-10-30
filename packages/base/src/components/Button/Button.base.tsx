import * as React from "react";
import PropTypes from "prop-types";
import { IButtonProps, IButtonSlots } from "./Button.types";
import { useButton } from "./useButton";

export const ButtonBase: React.FunctionComponent<IButtonProps> = (props: IButtonProps) => {
    const { children, href, slots } = props;
    const tag = _deriveRootType(href);
    const {
        endIcon: EndIcon = "i",
        root: Root = tag,
        startIcon: StartIcon = "i"
    } = (slots || {}) as IButtonSlots;

    const { slotProps = {} } = useButton(props);

    return (
        <Root {...slotProps.root}>
            <StartIcon {...slotProps.startIcon} />
            {children}
            <EndIcon {...slotProps.endIcon} />
        </Root>
    );
};


function _deriveRootType(href?: string): 'button' | 'a' {
    return href ? 'a' : 'button';
}

/**
 * Button component proptypes.
 */
ButtonBase.propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    onClick: PropTypes.func,
    
    /** slots */
    slots: PropTypes.shape({
        endIcon: PropTypes.elementType.isRequired,
        root: PropTypes.elementType.isRequired,
        startIcon: PropTypes.elementType.isRequired
    }),

    /** slot props */
    slotProps: PropTypes.shape({
        endIcon: PropTypes.object,
        root: PropTypes.object,
        startIcon: PropTypes.object
    })
};