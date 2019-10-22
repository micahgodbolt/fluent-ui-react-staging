# Button component specification

The `Button` component allows users to commit a change or trigger an action via a single click or tap and is often found inside forms, dialogs, panels and/or pages.

## TODO List

- For each TODO:
  1. Read it
  2. Do research
  3. Answer questions
  4. Remove TODO
- Search for TODO, there should be none! Delete this section even.
- Review with design crew.
- Check into repo where code will live.

## Related variant considerations

### Styling related
- `Primary button`
- `Secondary button`
- `Icon button`
- `Circular button`
- `Action button`

### Functionality related
- `Actionable`
- `Compound button`
  - (?) TODO - Need to check if this belongs here or in the `Styling related` section above
- `Menu button`
- `Split button`

### Tied to other components
- `Command bar button`
- `Message bar button`

### In other component libraries
- `Animated button`
  - In Semantic UI
- `Block/Fluid button`
  - In Ant Design
  - In Semantic UI
  - In Shards React
  - In Stardust UI
- `Button group/set`
  - In Ant Design
  - In Atlaskit
  - In Base Web
  - In Carbon Design
  - In Elemental UI
  - In Material-UI
  - In React Bootstrap
  - In Semantic UI
  - In Shards React
  - In Stardust UI
- `Conditional button`
  - In Semantic UI
- `Floating action/Raised button`
  - In Material-UI
  - In PrimeReact
- `Labelled button`
  - In Semantic UI
- `Outlined/Ghost button`
  - In Ant Design
  - In Carbon Design
  - In Chakra UI
  - In Elemental UI
  - In FastDNA
  - In Material-UI
  - In Shards React
- `Pill/Round button`
  - In Ant Design
  - In Base Web
  - In PrimeReact
  - In Shards React
- `Tertiary button`
  - In Base Web
  - In Carbon Design
  - In React Bootstrap


## Reference implementations

- Side-by-side implementations https://codesandbox.io/s/button-implementations-93x8z

- Ant Design Button [docs](https://ant.design/components/button/)

- Atlaskit Button [docs](https://atlaskit.atlassian.com/packages/core/button)

- Base Web Button [docs](https://baseweb.design/components/button/)

- Carbon Design Button [docs](https://www.carbondesignsystem.com/components/button/code)

- Chakra UI Button [docs](https://chakra-ui.com/button)

- Elemental UI Button [docs](http://elemental-ui.com/buttons)

- Fabric Button [docs](https://developer.microsoft.com/en-us/fabric#/controls/web/button)

- FastDNA Button [docs](https://github.com/microsoft/fast-dna/tree/master/packages/fast-components-react-base/src/button), [example](https://explore.fast.design/components/button)

- Gestalt Button [docs](https://pinterest.github.io/gestalt/?ref=designrevision.com#/Button)

- Grommet Button [docs](https://v2.grommet.io/button)

- Material-UI Button [docs](https://material-ui.com/components/buttons/)

- Prime React Button [docs](https://www.primefaces.org/primereact/#/button)

- React Bootstrap Button [docs](https://react-bootstrap.github.io/components/buttons/)

- Semantic UI Button [docs](https://react.semantic-ui.com/elements/button/)

- Shards React Button [docs](https://designrevision.com/docs/shards-react/component/button)

- Stardust Button [docs](https://microsoft.github.io/fluent-ui-react/components/button/definition)

## Props

> TODO: Consult the prop wizard to derive consistently defined props.

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |


### Recommended component props

| Name        | Type              | Default value | Description                                                                            |
| ----------- | :--------------:  | :-----------: | -------------------------------------------------------------------------------------- |
| `className` | `string`          |               | Defines an additional classname to provide on the root of the `Button`.                |
| `disabled`  | `boolean`         | `false`       | Defines whether the `Button` is in an enabled or disabled state.                       |
| `href`      | `string`          |               | Defines an href that, if provided, will make the `Button` render as an anchor.         |
| `primary`   | `boolean`         | `false`       | Defines whether the visual representation of the `Button` should be emphasized or not. |

### Recommended interface props

| Name    | Type         | Default value | Description                 |
| ------- | :----------: | ------------- | --------------------------- |
| `focus` | `() => void` |               | Sets focus on the `Button`. |

### Props to be discussed

| Name                 | Description                                                                           | Concern                                                      |
| -------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `allowDisabledFocus` | Defines whether disabled `Buttons` should be tabbable via keyboard navigation or not. | Should we really redefine standard behavior here?            |
| `as`                 | Defines the type that determines how to render the root of the `Button`.              | Should we deprecate in favor of slot overrides?              | 
| `checked`            | Defines whether the `Button` is in a checked state.                                   | Does this belong to the base or to a variant `ToggleButton`? |

### Fabric Button props

https://developer.microsoft.com/en-us/fabric#/controls/web/button

#### IButton interface

| Name          | Type                                                                       | Notes                                                                                                                          |
| ------------- | :------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------ |
| `dismissMenu` | `() => void`                                                               | Should not be part of the base `Button`. Should be considered for `MenuButton`. Maybe just bring it from the `Menu` interface. |
| `focus`       | `() => void`                                                               |                                                                                                                                |
| `openMenu`    | `(shouldFocusOnContainer?: boolean, shouldFocusOnMount?: boolean) => void` | Should not be part of the base `Button`. Should be considered for `MenuButton`. Maybe just bring it from the `Menu` interface. |

#### IButtonProps interface

| Name                               | Type                                                                                                      | Notes                                                                                                                                       |
| ---------------------------------- | :-------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowDisabledFocus`               | `boolean`                                                                                                 | Should we really redefine standard behavior here?                                                                                           |
| `ariaDescription`                  | `string`                                                                                                  | What purpose does this serve? If anything, belongs to `CompoundButton` and not to base.                                                     |
| `ariaHidden`                       | `boolean`                                                                                                 | Should use native `aria-hidden` instead.                                                                                                    |
| `ariaLabel`                        | `string`                                                                                                  | Should use native `aria-label` instead.                                                                                                     |
| `buttonType`                       | `ButtonType`                                                                                              | Already deprecated.                                                                                                                         |
| `checked`                          | `boolean`                                                                                                 | Does this belong to the base or to a variant `ToggleButton`?                                                                                |
| `className`                        | `string`                                                                                                  |                                                                                                                                             |
| `componentRef`                     | `IRefObject<IButton>`                                                                                     |                                                                                                                                             |
| `data`                             | `any`                                                                                                     | What purpose does this serve? Maybe remove?                                                                                                 |
| `defaultRender`                    | `any`                                                                                                     | What purpose does this serve? Maybe remove?                                                                                                 |
| `description`                      | `string`                                                                                                  | Already deprecated in favor of `secondaryText`.                                                                                             |
| `disabled`                         | `boolean`                                                                                                 |                                                                                                                                             |
| `getClassNames`                    | `(props) => IButtonClassNames`                                                                            | Should be deprecated in favor of new composition approach.                                                                                  |
| `getSplitButtonClassNames`         | `(props) => IButtonClassNames`                                                                            | Should not be part of the base `Button`. Should be considered for `SplitButton`. Should be deprecated in favor of new composition approach. |
| `href`                             | `string`                                                                                                  |                                                                                                                                             |
| `iconProps`                        | `IIconProps`                                                                                              | Should be replaced by `slotProps`.                                                                                                          |
| `keytipProps`                      | `IKeytipProps`                                                                                            | Should be removed until we add `Keytips` in Fluent UI.                                                                                      |
| `menuAs`                           | `IComponentAs<IContextualMenuProps>`                                                                      | Should be deprecated in favor of slot overrides.                                                                                            |
| `menuIconProps`                    | `IIconProps`                                                                                              | Should not be part of the base `Button` and should be replaced by `slotProps` in `MenuButton`.                                              |
| `menuProps`                        | `IContextualMenuProps`                                                                                    | Should not be part of the base `Button` and should be replaced by `slotProps` in `MenuButton`.                                              |
| `menuTriggerKeyCode`               | `KeyCodes | null`                                                                                         | Should not be part of the base `Button`. Should be considered for `MenuButton`.                                                             |
| `onAfterMenuDismiss`               | `() => void`                                                                                              | Should not be part of the base `Button`. Should be considered for `MenuButton`. Maybe rename to `onDismiss`?                                |
| `onMenuClick`                      | `(ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, button?: IButtonProps) => void;` | Should not be part of the base `Button`. Should be considered for `MenuButton`.                                                             |
| `onRenderAriaDescription`          | `IRenderFunction<IButtonProps>`                                                                           | Only keep if we are keeping `ariaDescription`. If keeping it, deprecate in favor of slot overrides.                                         |
| `onRenderChildren`                 | `IRenderFunction<IButtonProps>`                                                                           | Should be removed or deprecated in favor of slot overrides.                                                                                 |
| `onRenderDescription`              | `IRenderFunction<IButtonProps>`                                                                           | Should not be part of base `Button`. Could be considered for `CompoundButton`. In that case, deprecate in favor of slot overrides.          |
| `onRenderIcon`                     | `IRenderFunction<IButtonProps>`                                                                           | Should be deprecated in favor of slot overrides.                                                                                            |
| `onRenderMenuIcon`                 | `IRenderFunction<IButtonProps>`                                                                           | Should not be part of the base `Button`. Should be considered for `MenuButton`. Should be deprecated in favor of slot overrides.            |
| `onRenderMenu`                     | `IRenderFunction<IContextualMenuProps>`                                                                   | Should not be part of the base `Button`. Should be considered for `MenuButton`. Should be deprecated in favor of slot overrides.            |
| `onRenderText`                     | `IRenderFunction<IButtonProps>`                                                                           | Should be deprecated in favor of slot overrides.                                                                                            |
| `persistMenu`                      | `boolean`                                                                                                 | Should this be handled as part of the menu `slotProps` instead of being a separate prop altogether?                                         |
| `primary`                          | `boolean`                                                                                                 |                                                                                                                                             |
| `primaryActionButtonProps`         | `IButtonProps`                                                                                            | Should not be part of the base `Button`. Should be replaced by a slot in `SplitButton`.                                                     |
| `primaryDisabled`                  | `boolean`                                                                                                 | Should not be part of the base `Button`. Should be considered for `SplitButton`.                                                            |
| `renderPersistedMenuHiddenOnMount` | `boolean`                                                                                                 | Already deprecated.                                                                                                                         |
| `rootProps`                        | `React.ButtonHTMLAttributes<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement>`           | Already deprecated. Should use `slotProps` instead.                                                                                         |
| `secondaryText`                    | `string`                                                                                                  | Should not be part of the base `Button`. Should be replaced by a slot in `CompoundButton`.                                                  |
| `split`                            | `boolean`                                                                                                 | Should be deprecated in favor of a `SplitButton` variant.                                                                                   |
| `splitButtonAriaLabel`             | `string`                                                                                                  | Should not be part of the base `Button`. Should be considered for `SplitButton`. Maybe rename to `secondaryActionAriaLabel`?                |
| `splitButtonMenuProps`             | `IButtonProps`                                                                                            | Should not be part of the base `Button`. Should be replaced by a slot in `SplitButton`.                                                     |
| `styles`                           | `IButtonStyles`                                                                                           | Should be deprecated in favor of recomposition.                                                                                             |
| `theme`                            | `ITheme`                                                                                                  | Should not show up in the public props contract.                                                                                            |
| `text`                             | `string`                                                                                                  | Should be replaced by a slot.                                                                                                               |
| `toggle`                           | `boolean`                                                                                                 | Does this belong to the base or to a variant `ToggleButton`?                                                                                |
| `toggled`                          | `boolean`                                                                                                 | Already deprecated in favor of `checked`.                                                                                                   |
| `uniqueId`                         | `string | number`                                                                                         | This is used for keytip support in Fabric. Maybe remove it until we add `Keytips` in Fluent UI?                                             |

### Stardust Button props

#### ButtonProps

| Name            | Type                                 | Notes                                                                                                                             |
| --------------- | :----------------------------------: | --------------------------------------------------------------------------------------------------------------------------------- |
| `accessibility` | `Accessibility`                      | Why would a user need this as a prop?                                                                                             |
| `circular`      | `boolean`                            |                                                                                                                                   |
| `disabled`      | `boolean`                            |                                                                                                                                   |
| `fluid`         | `boolean`                            | Should this be a prop or should the library have a separate `BlockButton` variant?                                                |
| `icon`          | `ShorthandValue<IconProps>`          | Should be replaced by a slot.                                                                                                     |
| `iconOnly`      | `boolean`                            | Should this be a prop or should the library have a separate `IconButton` variant?                                                 |
| `iconPosition`  | `'before' | 'after'`                 | Should be deprecated in favor of view recomposition.                                                                              |
| `loader`        | `ShorthandValue<LoaderProps>`        | What's the use case for this?                                                                                                     |
| `loading`       | `boolean`                            | Should be deprecated in favor of recomposition.                                                                                   |
| `onClick`       | `ComponentEventHandler<ButtonProps>` | Should be replaced by the native event signature from which we extend.                                                            |
| `onFocus`       | `ComponentEventHandler<ButtonProps>` | Should be replaced by the native event signature from which we extend.                                                            |
| `primary`       | `boolean`                            |                                                                                                                                   |
| `secondary`     | `boolean`                            | Does this change styling or is this just the default?                                                                             |
| `size`          | `SizeValue`                          | Should this prop be provided or is this just a matter that could be solved via styling and recomposition?                         |
| `text`          | `boolean`                            | Should this be a prop or should the library have a separate `GhostButton` variant? If a prop, should it be named `ghost` instead? |

