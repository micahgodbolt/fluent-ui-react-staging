import preset from "jss-preset-default";
import jss from "jss";

export {
  ICastableToString,
  IColorRamp,
  IResolvedTokens,
  ITheme,
  IToken,
  ITokenLiteral,
  ITokenResolver
} from "./theme.types";
export { mergeSlotProps } from "./utilities/mergeSlotProps";
// Workaround for webpack warnings
import { IStandardProps as P } from "./utilities/mergeSlotProps";
export type IStandardProps = P;
export { compose } from "./compose";
export { ThemeContext } from "./themeContext";

jss.setup(preset());
