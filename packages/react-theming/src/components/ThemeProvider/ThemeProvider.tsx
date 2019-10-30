import * as React from "react";
import { ThemeContext, useTheme } from "../../themeContext";
import { ITheme } from "../../theme.types";
import ThemeProviderStyles from "./ThemeProvider.styles";

export interface IThemeProviderProps {
  theme?: ITheme;
  scheme?: string;
}

const ThemeProviderContent = composed((props: ) => <div {...p} />, {
  styles: {}
});

export const ThemeProviderBase = (
  props: React.PropsWithChildren<IThemeProviderProps>
) => {
  const currentTheme = useTheme();
  const { theme = currentTheme, scheme, children } = props;

  if (!theme) {
    throw new Error("Use a ThemeProvider component to provide a theme.");
  }

  if (scheme !== undefined) {
    theme = theme.schemes[scheme] || theme;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div>{children}</div>
    </ThemeContext.Provider>
  );
};
