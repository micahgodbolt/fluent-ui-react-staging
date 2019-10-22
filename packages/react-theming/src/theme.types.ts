/** @public */
export type IColor = string;

/** @public */
export interface ICastableToString {
  toString: () => string;
}

/** @public */
export interface IColorRamp extends ICastableToString {
  values: string[];
  index: number;
}

/** @public */
export type ITokenLiteral = string | number | ICastableToString;

/** @public */
export interface ITokenResolver {
  dependsOn: string | string[];
  resolve: (arg: ITokenLiteral | ITokenLiteral[], theme: ITheme) => ITokenLiteral;
}

/** @public */
export type IToken = ITokenLiteral | ((theme: ITheme) => ITokenLiteral) | ITokenResolver;

/** @public */
export type IResolvedTokens<TTokens> = {
  [key in keyof TTokens]: ITokenLiteral;
};

/** @public */
export interface ITheme {
  direction: 'rtl' | 'ltr';

  colors: {
    background: IColor;

    brand: IColorRamp;
    accent: IColorRamp;

    neutral: IColorRamp;

    success: IColorRamp;
    warning: IColorRamp;
    danger: IColorRamp;

    [key: string]: IColorRamp | string;
  };

  fonts: {
    default: string;
    userContent: string;
    mono: string;
    [key: string]: string;
  };

  fontSizes: {
    base: number;
    scale: number;
    unit: 'px' | 'rem' | 'pt';
  };

  animations: {
    fadeIn: {};
    fadeOut: {};
  };

  spacing: {
    base: number;
    scale: number;
    unit: 'px' | 'rem';
  };

  radius: {
    base: number;
    scale: number;
    unit: 'px' | 'rem' | '%';
  };

  icons: {};

  components: {};
}
