export interface SliderSlotProps {
  /** Intended to contain the slider */
  root: {};
  /** Intended to provide a track space for the thumb to slide on */
  rail: {};
  /** Intended to provide a selected track section from left to thumb. */
  track: {};
  /** Intended to be a child of the track, where left represents a percentage */
  thumb: {};
}

export interface SliderProps {
  /** min value */
  min?: number;

  /** max value */
  max?: number;

  /** step */
  step?: number;

  /** should snap to step */
  snapToStep?: boolean;

  /** whether this is vertical or not */
  vertical?: boolean;

  /** current value (controlled) */
  value?: number;

  /** default value (uncontrolled) */
  defaultValue?: number;

  /** on change handler (controlled) */
  onChange?: (ev: MouseEvent | KeyboardEvent, value: number) => void;

  /** slot */
  slots?: any;

  /** slot props */
  slotProps?: SliderSlotProps;
}
