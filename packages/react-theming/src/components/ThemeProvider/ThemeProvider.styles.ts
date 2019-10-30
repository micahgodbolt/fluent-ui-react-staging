import { ITheme } from "../../theme.types";

export const ThemeProviderContentStyles = {
  root: {
    background: (theme: ITheme) => theme.colors.background,
    color: "white"
  }
};

export default ThemeProviderStyles;
