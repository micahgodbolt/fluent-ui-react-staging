export interface IButtonSlots {
    leftIcon: React.ReactType;
    rightIcon: React.ReactType;
    root: React.ReactType;
}

export interface IButtonSlotProps {
    leftIcon: {};
    rightIcon: {};
    root: {};
}

export interface IButtonClasses {}

export interface IButtonProps {
    children?: React.ReactNode;
    classes?: Partial<IButtonClasses>;
    disabled?: boolean;
    href?: string;
    onClick?: (ev: MouseEvent) => void;
    slotProps?: Partial<IButtonSlotProps>;
    slots?: IButtonSlotProps;
}