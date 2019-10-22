# Checkbox component specification

The `Checkbox` component allows a user to choose between two mutually exclusive options. 

TODO: Uncontrolled vs. controlled 

## Related variant considerations

## Reference implementations

https://codesandbox.io/s/checkboxes-dk4pz

Fabric Checkbox [docs](https://developer.microsoft.com/en-us/fabric#/controls/web/Checkbox)

Stardust Checkbox [docs](http://localhost:8080/components/Checkbox/definition)

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

| Name           | Type                                                        |
| -------------- | ----------------------------------------------------------- |
| as             | string                                                      |
| className      | string                                                      |
| defaultValue   | number \| number[]                                          |
| disabled       | boolean                                                     |
| marks          | { value: number; label: string; size: 's' \| 'm' \| 'l' }[] |
| max            | number                                                      |
| min            | number                                                      |
| name           | The form name, is injected on the hidden `input` element.   |
| onChange       | (ev: Event, value: number) => void                          |
| originFromZero | boolean                                                     |
| step           | number                                                      |
| value          | number \| number[]                                          |
| vertical       | boolean                                                     |

To be discussed:

| Name                                  | Concern                            |
| ------------------------------------- | ---------------------------------- |

### Fabric Checkbox props

https://developer.microsoft.com/en-us/fabric#/controls/web/checkbox


| Name                 | Type                                                        | Notes                                                                                                    |
| -------------------- | --------------------------------------------------------    | -------------------------------------------------------------------------------------------------------- |
| ariaLabel            | string                                                      |                                                                                                          |
| ariaDescribedBy      | string                                                      |                                                                                                          |
| ariaLabelledBy       | string                                                      |                                                                                                          |
| ariaPositionInset    | number                                                      |                                                                                                          |
| ariaSetSize          | number                                                      |                                                                                                          |
| boxSide              | 'start' | 'end'                                             |                                                                                                          |
| checked              | boolean                                                     |                                                                                                          |
| checkmarkIconProps   | IIconProps                                                  |                                                                                                          |
| className            | string                                                      |                                                                                                          |
| componentRef         | IRefObject<ICheckbox>                                       |                                                                                                          |
| defaultChecked       | boolean                                                     |                                                                                                          |
| defaultIndeterminate | boolean                                                     |                                                                                                          |
| disabled             | boolean                                                     |                                                                                                          |
| indeterminate        | boolean                                                     |                                                                                                          |
| inputProps           | React.ButtonHTMLAttributes<HTMLElement | HTMLButtonElement> |                                                                                                          |
| keytipProps          | IKeytipProps                                                |                                                                                                          |  
| label                | string                                                      |                                                                                                          |
| onChange             | (ev, checked) => void                                       |                                                                                                          |
| onRenderLabel        | IRenderFunction<ICheckboxProps>                             |                                                                                                          |
| styles               | IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles>|                                                                                                          |
| theme                | ITheme                                                      |                                                                                                          |