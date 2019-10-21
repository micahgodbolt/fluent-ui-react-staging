export type IColor = string;

export interface ICastableToString {
  toString: () => string;
}

export interface IColorRamp extends ICastableToString {
  values: string[];
  index: number;
}

export type ITokenLiteral = string | number | ICastableToString;

export interface ITokenResolver {
  dependsOn: string | string[];
  resolve: (
    arg: ITokenLiteral | ITokenLiteral[],
    theme: ITheme
  ) => ITokenLiteral;
}

export type IToken =
  | ITokenLiteral
  | ((theme: ITheme) => ITokenLiteral)
  | ITokenResolver;

export type IResolvedTokens<TTokens> = {
  [key in keyof TTokens]: ITokenLiteral;
};

export interface ITheme {
  direction: "rtl" | "ltr";

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
    unit: "px" | "rem" | "pt";
  };

  animations: {
    fadeIn: {};
    fadeOut: {};
  };

  spacing: {
    base: number;
    scale: number;
    unit: "px" | "rem";
  };

  radius: {
    base: number;
    scale: number;
    unit: "px" | "rem" | "%";
  };

  icons: {};

  components: {};
}
