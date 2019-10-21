import { mergeStyles } from "@uifabric/merge-styles";
import { useTheme } from "./themeContext";
import { ITheme } from "./theme.types";

/**
 * Composed allows you to create composed components, which
 * have configurable, themable state, view, and slots.
 *
 * Composed components can be recomposed.
 */
export const compose = <TProps = {}>(
  baseComponent: React.SFC,
  options?: any
) => {
  const classNamesCache = new WeakMap();
  let optionsSet = [options];
  if (baseComponent && (baseComponent as any).__optionsSet) {
    optionsSet = [...(baseComponent as any).__optionsSet, options];
  }

  let mergedOptions = {};
  optionsSet.forEach(o => {
    mergedOptions = { ...mergedOptions, ...o };
  });

  const Component = (props: TProps) => {
    const theme: ITheme = (useTheme() || (mergedOptions as any).defaultTheme)!;
    if (!theme) {
      console.warn("No theme specified, behavior undefined."); // eslint-disable-line no-console
    }

    const resolvedSlotProps = _getSlotProps(
      props,
      theme,
      classNamesCache,
      optionsSet
    );
    return baseComponent({
      ...props,
      slotProps: resolvedSlotProps,
      theme
    } as any);
  };

  // Promote slots as statics.
  for (const slotName in options.slots) {
    (Component as any)[slotName] = options.slots[slotName];
  }

  // Promote propTypes if applicable.
  Component.propTypes = baseComponent.propTypes;

  Component.__optionsSet = optionsSet;
  Component.displayName = options.name || "Composed Component";

  return Component;
};

function _getSlotProps(
  props: any,
  theme: ITheme,
  classNamesCache: WeakMap<any, any>,
  optionsSet: any[]
) {
  const resolvedSlotProps =
    props && props.slotProps ? { ...props.slotProps } : {};
  if (theme) {
    if (!classNamesCache.has(theme)) {
      classNamesCache.set(theme, _getClasses(theme, optionsSet));
    }
    const classNames = classNamesCache.get(theme);
    Object.keys(classNames).forEach(k => {
      const className = classNames[k];
      if (!resolvedSlotProps[k]) {
        resolvedSlotProps[k] = { className: "" };
      } else if (!resolvedSlotProps[k].className) {
        resolvedSlotProps[k].className = "";
      }
      resolvedSlotProps[
        k
      ].className = `${resolvedSlotProps[k].className} ${className}`.trim();
    });
  }
  return resolvedSlotProps;
}

const _getClasses = (theme: ITheme, optionsSet: any[]) => {
  let tokens: any = {};
  optionsSet.forEach((options: any) => {
    if (options && options.tokens && typeof options.tokens === "function") {
      tokens = { ...tokens, ...options.tokens(theme) };
    }
  });

  let styles: any = {};
  optionsSet.forEach((options: any) => {
    if (options && options.styles && typeof options.styles === "function") {
      styles = { ...styles, ...options.styles(theme, tokens) };
    }
  });
  const classes: { [key: string]: string } = {};
  Object.keys(styles).forEach(k => {
    classes[k] = mergeStyles(styles[k]);
  });
  return classes;
};
