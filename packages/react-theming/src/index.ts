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
export { mergeSlotProps, IStandardProps } from "./utilities/mergeSlotProps";
export { compose } from "./compose";

jss.setup(preset());
