# Checkbox component specification

The `Checkbox` component allows a user to choose between two mutually exclusive options. 

> TODO: Uncontrolled vs. controlled 

## Related variant considerations

Toggle

## Reference implementations

https://codesandbox.io/s/checkboxes-dk4pz
Note about the Stardust example: there's some weirdness with how the theme providers are interacting with each other, the Stardust checkbox's styling is messing up as a result.

Fabric Checkbox [docs](https://developer.microsoft.com/en-us/fabric#/controls/web/Checkbox)

Stardust Checkbox [docs](https://microsoft.github.io/fluent-ui-react/components/checkbox/definition)

Material UI Checkbox [docs](https://material-ui.com/components/Checkbox/)

BaseUI Checkbox [docs](https://baseweb.design/components/Checkbox/)

Chakra Checkbox [docs](https://chakra-ui.com/Checkbox)

Cabon Checkbox [docs](https://www.carbondesignsystem.com/components/Checkbox/code)

AntD Checkbox [docs](https://ant.design/components/Checkbox/)

FastDNA Checkbox [docs](https://github.com/microsoft/fast-dna/tree/master/packages/fast-components-@fluentui/base/src/Checkbox), [example](https://explore.fast.design/components/Checkbox


## Props

> TODO: Consult the prop wizard to derive consistently defined props.

| Name | Type | Default value |
| ---- | ---- | ------------- |


### Recommended props

| Name                 | Type                                                        |
| --------------       | ----------------------------------------------------------- |
| checked              | boolean                                                     |                                                                                |
| as                   | React.ElementType                                           |
| className            | string                                                      |
| defaultChecked       | boolean                                                     |
| disabled             | boolean                                                     |
| ariaLabel            | string                                                      |                                                                                
| ariaDescribedBy      | string                                                      |                                                                                
| ariaLabelledBy       | string                                                      |                                                                       
| onChange             | (ev: Event, value: number) => void                          |
| label                | string                                                      |
| theme                | ITheme                                                      |
| styles               | ICheckboxStyles                                             |
| rtl                  | boolean                                                     |
| vertical             | boolean                                                     |

To be discussed:

| Name                                  | Concern                                                           |
| ------------------------------------- | ------------------------------------------------------------------|
| ariaPositionInset                     | if checkbox is in a set, should be up to the user to provide a11y |             
| ariaSetSize                           | same as above                                                     |

### Fabric Checkbox props

https://developer.microsoft.com/en-us/fabric#/controls/web/checkbox


| Name                 | Type                                                        | Notes                                                                          |
| -------------------- | --------------------------------------------------------    | -------------------------------------------------------------------------------|
| ariaLabel            | string                                                      |                                                                                |
| ariaDescribedBy      | string                                                      |                                                                                |
| ariaLabelledBy       | string                                                      |                                                                                |
| ariaPositionInset    | number                                                      |                                                                                |
| ariaSetSize          | number                                                      |                                                                                |
| boxSide              | 'start' | 'end'                                             | default 'start'                                                                |
| checked              | boolean                                                     |                                                                                |
| checkmarkIconProps   | IIconProps                                                  |                                                                                |
| className            | string                                                      |                                                                                |
| componentRef         | IRefObject<ICheckbox>                                       |                                                                                |
| defaultChecked       | boolean                                                     |                                                                                |
| defaultIndeterminate | boolean                                                     |                                                                                |
| disabled             | boolean                                                     |                                                                                |
| indeterminate        | boolean                                                     |                                                                                |
| inputProps           | React.ButtonHTMLAttributes<HTMLElement | HTMLButtonElement> |                                                                                |
| keytipProps          | IKpeytipProps                                               |                                                                                |  
| label                | string                                                      |                                                                                |
| onChange             | (ev, checked) => void                                       |                                                                                |
| onRenderLabel        | IRenderFunction<ICheckboxProps>                             |                                                                                |
| styles               | IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles>|                                                                                |
| theme                | ITheme                                                      |                                                                                |

### Stardust Checkbox props


| Name                 | Type                                                        | Notes                                                                          |
| -------------------- | --------------------------------------------------------    | -------------------------------------------------------------------------------|
| animation            | AnimationProp                                               |                                                                                |
| as                   | React.ElementType                                           | default type is "div"                                                          |
| className            | string                                                      |                                                                                |
| content              | ReactNode                                                   |                                                                                |
| design               | ComponentDesign                                             |                                                                                |
| disableAnimations    | boolean                                                     | default false                                                                  |
| overwrite            | boolean                                                     | default false                                                                  |
| renderer             | Renderer                                                    |                                                                                |
| rtl                  | boolean                                                     | default false                                                                  |
| styles               | ComponentSlotStyle                                          |                                                                                |
| target               | Document                                                    |                                                                                |
| theme                | ThemeInput                                                  |                                                                                |
| variables            | any                                                         |                                                                                |

### Differences of Fabric/Stardust to resolve

| Name                 | Type                                                        | Notes                                                                          |
| -------------------- | --------------------------------------------------------    | -------------------------------------------------------------------------------|
| animation            | AnimationProp                                               |                                                                                |
| disableAnimations    | boolean                                                     | default false                                                                  |
| overwrite            | boolean                                                     | default false                                                                  |
| renderer             | Renderer                                                    |                                                                                |
| variables            | any                                                         |                                                                                |
| target               | Document                                                    |                                                                                |
| content              | ReactNode                                                   |                                                                                |
| ariaPositionInSet    | number                                                      | if checkbox is in a set, should be up to the user to provide a11y              |
| ariaSetSize          | number                                                      |                                                                                |

### Conversion process from Fabric 7 to Fluent UI Checkbox

Props being changed:

>TODO

Props being removed:

ariaPoisitionInSet and ariaSetSize - when writing parent component, user should set these on the checkbox.
animations: remnant pattern of semantic UI, don't need animations for checkbox theming
defaultChecked: overloading with checked - can just set default value of checked.

## Slots

| Name      | Considerations                             |
| --------- | ------------------------------------------ |
| root      |                                            |
| label     |                                            |

## DOM structure

General considerations:

Only use as toggle between two mutually exclusive options (binary) or in a group with shared context to offer multiple options.

Indeterminate state? Subcheckboxes are not checked -> don't check parent checkbox
Variant color & size?
Invalid state/error state?

### Recommended DOM

```html
<label class="checkbox-root">
    <span>
        <input class="checkbox" type="checkbox" aria-checked"false" aria-label="Fluent checkbox">
        <i class="icon"></i>
    </span>
    <span class="checkbox-label">Fluent checkbox</span>
</label>
```

### Fabric Checkbox example DOM

```html
<div class="ms-Checkbox-checkbox">
    <input type="checkbox" class="input-226" id="checkbox-268" aria-label="Unchecked checkbox (uncontrolled)" aria-checked="false">
    <label class="ms-Checkbox-label label-227" for="checkbox-268">
        <div class="ms-Checkbox-checkbox checkbox-228">
            <i data-icon-name="CheckMark" aria-hidden="true" class="ms-Checkbox-checkmark checkmark-231">
            </i>
        </div>
        <span aria-hidden="true" class="ms-Checkbox-text text-230">Unchecked checkbox (uncontrolled)</span>
    </label>
</div>
```

### Stardust Checkbox example DOM

```html
<div class="ui-checkbox dd ol om gz de nb on cd oo op cb oq ha hb hc hd he hf hg hh hi hj hk hl hm hn ho hp or os ot ou hu hv hw hx ov ow ox oy ic id ie if ig ih ii ij ik il im oz pa pb pc ir is it iu pd pe pf pg lu ph pi pj pk" aria-checked="false" role="checkbox" tabindex="0">
    <span class="ui-icon ck cb ca jm pl pm pn po pp pq pr ba bb bc bd do dp jy jz ps pt pu pv pw px gu jo gw py pz qa qb ui-checkbox__indicator" role="img" aria-hidden="true">
        <svg role="presentation" focusable="false" viewBox="8 8 16 16" class="cz ql qm da cw">
            <g>
                <path class="ui-icon__outline cy" d="M14.3 21.3c-.1 0-.3 0-.4-.1l-4.8-4.8c-.2-.2-.2-.5 0-.7s.5-.2.7 0l4.4 4.4 7.9-7.9c.2-.2.5-.2.7 0s.2.5 0 .7l-8.3 8.3s-.1.1-.2.1z">
                </path>
                <path class="ui-icon__filled" d="M23.5 11.875a.968.968 0 0 1-.289.711l-8.25 8.25c-.192.193-.43.289-.711.289s-.519-.096-.711-.289l-4.75-4.75a.965.965 0 0 1-.289-.711c0-.125.027-.25.082-.375s.129-.234.223-.328a.953.953 0 0 1 .695-.297c.135 0 .266.025.391.074.125.05.231.121.32.215l4.039 4.047 7.539-7.547a.886.886 0 0 1 .32-.215c.125-.049.255-.074.391-.074a1.004 1.004 0 0 1 .922.625.97.97 0 0 1 .078.375z">
                </path>
            </g>
        </svg>
    </span>
    <span class="ui-text cz qk ui-checkbox__label" dir="auto">Make my profile visible</span>
</div>
```
### MUI Checkbox example DOM

```html
<label class="MuiFormControlLabel-root">
    <span class="MuiButtonBase-root MuiIconButton-root jss264 MuiCheckbox-root MuiCheckbox-colorSecondary jss265 Mui-checked MuiIconButton-colorSecondary" aria-disabled="false">
        <span class="MuiIconButton-label">
            <input type="checkbox" class="jss267" value="checkedA" data-indeterminate="false" checked="">
            <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                </path>
            </svg>
        </span>
        <span class="MuiTouchRipple-root"></span>
    </span>
    <span class="MuiTypography-root MuiFormControlLabel-label MuiTypography-body1">Secondary</span>
</label>
```

### Behaviors

Aria spec: https://www.w3.org/TR/wai-aria-practices-1.1/#checkbox

Fluent UI HIG: 

### Keyboarding