import * as React from "react";
import PropTypes from "prop-types";
import { ILinkProps, ILinkSlots } from "./Link.types";
import { useLink } from "./useLink";

export const LinkBase: React.FunctionComponent<ILinkProps> = (
  props: ILinkProps
) => {
  const { children, href, slots } = props;
    const tag = _deriveRootType(href);
    const {
        root: Root = tag
    } = (slots || {}) as ILinkSlots;

    const { slotProps = {} } = useLink(props);

    return (
        <Root {...slotProps.root}>
            {children}
        </Root>
    );
};


function _deriveRootType(href?: string): 'a' | 'button' {
    return href ? 'a' : 'button';
}

/**
 * Button component proptypes.
 */
LinkBase.propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    href: PropTypes.string,

    /** slots */
    slots: PropTypes.shape({
        root: PropTypes.elementType.isRequired
    }),

    /** slot props */
    slotProps: PropTypes.shape({
        root: PropTypes.object
    })
}; 