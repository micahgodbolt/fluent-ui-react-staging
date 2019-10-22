import { mergeStyles } from '@uifabric/merge-styles';
import { useTheme } from './themeContext';
import { resolveTokens } from './resolveTokens';

type Options = any;
type SlotsAssignment = any;

/** _composeFactory returns a compose function.
 * This allows tests to override aspects of compose.
 *
 * @internal
 */
export const _composeFactory = <TTheme>(themeHook: any = useTheme) => {
  const composeInstance = <TProps = {}>(baseComponent: React.SFC<TProps>, options?: any) => {
    const classNamesCache = new WeakMap();
    let optionsSet = [options];
    if (baseComponent && (baseComponent as any).__optionsSet) {
      optionsSet = [...(baseComponent as any).__optionsSet, options];
    }

    const renderFn = (baseComponent as any).__directRender || baseComponent;

    const name = options.name || 'WARNING-UNNAMED';
    let mergedOptions = {};
    optionsSet.forEach(o => {
      mergedOptions = { ...mergedOptions, ...o };
    });

    const Component = (props: TProps) => {
      const theme: TTheme = (themeHook() || (mergedOptions as any).defaultTheme)!;
      const slots = resolveSlots(name, optionsSet, theme);

      if (!theme) {
        console.warn('No theme specified, behavior undefined.'); // eslint-disable-line no-console
      }

      const resolvedSlotProps = _getSlotProps(name, props, theme, classNamesCache, optionsSet);

      return renderFn({
        ...props,
        slotProps: resolvedSlotProps,
        slots
      } as any);
    };

    for (const slotName in options.slots) {
      (Component as any)[slotName] = options.slots[slotName];
    }

    Component.propTypes = baseComponent.propTypes;
    Component.__optionsSet = optionsSet;
    Component.__directRender = (baseComponent as any).__directRender || baseComponent;
    Component.displayName = options.name || 'Composed Component';

    return Component;
  };

  const resolveSlots = <TTheme>(name: string, optionsSet: Options[], theme: any): SlotsAssignment => {
    const result = {};
    if (optionsSet && optionsSet.length > 0) {
      optionsSet.forEach(os => {
        if (os.slots) {
          Object.keys(os.slots).forEach(k => {
            (result as any)[k] = os.slots[k];
          });
        }
      });
    }
    if (theme && theme.components && theme.components[name] && typeof theme.components[name] === 'object') {
      Object.keys(theme.components[name]).forEach(k => {
        (result as any)[k] = theme.components[name][k];
      });
    }
    return result;
  };

  composeInstance.resolveSlots = resolveSlots;
  return composeInstance;
};

/**
 * Composed allows you to create composed components, which
 * have configurable, themable state, view, and slots.
 *
 * Composed components can be recomposed.
 */
export const compose = _composeFactory();

function _getSlotProps<TTheme>(name: string, props: any, theme: TTheme, classNamesCache: WeakMap<any, any>, optionsSet: any[]) {
  const resolvedSlotProps = props && props.slotProps ? { ...props.slotProps } : {};
  if (theme) {
    if (!classNamesCache.has(theme)) {
      classNamesCache.set(theme, _getClasses(name, theme, optionsSet));
    }
    const classNames = classNamesCache.get(theme);
    Object.keys(classNames).forEach(k => {
      const className = classNames[k];
      if (!resolvedSlotProps[k]) {
        resolvedSlotProps[k] = { className: '' };
      } else if (!resolvedSlotProps[k].className) {
        resolvedSlotProps[k].className = '';
      }
      resolvedSlotProps[k].className = `${resolvedSlotProps[k].className} ${className}`.trim();
    });
  }
  return resolvedSlotProps;
}

const _getClasses = <TTheme>(name: string, theme: TTheme, optionsSet: any[]) => {
  const tokens = resolveTokens(theme, optionsSet.map(o => o.tokens || {}));

  let styles: any = {};
  optionsSet.forEach((options: any) => {
    if (options && options.styles && typeof options.styles === 'function') {
      styles = { ...styles, ...options.styles(theme, tokens) };
    }
  });
  const classes: { [key: string]: string } = {};
  Object.keys(styles).forEach(k => {
    classes[k] = mergeStyles(styles[k]);
  });
  return classes;
};
