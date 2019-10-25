import React from "react";
import PropTypes from "prop-types";
import { ISliderProps, ISliderSlots } from "./Slider.types";
import { useSlider } from "./useSlider";

export const SliderBase: React.FunctionComponent<ISliderProps> = (
  props: ISliderProps
) => {
  const {
    root: Root = "div",
    rail: Rail = "div",
    thumb: Thumb = "div",
    track: Track = "div"
  } = (props.slots || {}) as ISliderSlots;
  const { slotProps = {} } = useSlider(props);

  return (
    <Root {...slotProps.root}>
      <Rail {...slotProps.rail} />
      <Track {...slotProps.track} />
      <Thumb {...slotProps.thumb} />
    </Root>
  );
};

/**
 * Slider component proptypes.
 */
SliderBase.propTypes = {
  defaultValue: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  snapToStep: PropTypes.bool,
  step: PropTypes.number,
  value: PropTypes.number,
  vertical: PropTypes.bool,

  /** slots */
  slots: PropTypes.shape({
    root: PropTypes.elementType.isRequired,
    rail: PropTypes.elementType.isRequired,
    track: PropTypes.elementType.isRequired,
    thumb: PropTypes.elementType.isRequired
  }),

  /** slot props */
  slotProps: PropTypes.shape({
    root: PropTypes.object,
    rail: PropTypes.object,
    track: PropTypes.object,
    thumb: PropTypes.object
  })
};
