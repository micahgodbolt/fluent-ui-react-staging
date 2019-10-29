# Props conformance for components

This document outlines the basic guidance for component design and props naming.

## Basic expectations for every component

Every component receives an "as".

- The component can always provide `id`, `className`, `style`, `aria-*` and `data-*` attributes on the container of a component.

- If the component represents a standard HTML element (e.g. Button), we should mix in the valid root props using the `getNativeProps`
  utility so that we can let the user use native functionality as expected.

- If the component hosts clickable elements, there must be a way to inject `data-*` attributes onto the clickable components. This enables test automation to be built downstream.

- Interactable elements must be accessible via keyboard, mouse, and touch. Nothing can be ONLY interactable by mouse.

## Build many smaller components and compose them together.

Often we want to build something complex, like a CommandBar. We see a picture of what we want and we build one giant component that does
this. Then we find other scenarios that have overlaps. The CommandBar contains a SearchBox, a set of left side collapsable links and right
side links. We may find we have other cases that just want a set of links, without the extra overhead. We may also find cases where we just
want a single command bar item with a dropdown menu.

This is an example where instead of building a single large component, we should build more atomic building blocks that are puzzled
together. While it may be more effort to think in smaller blocks, it makes the code easier to reuse and often simpler to maintain.

## Use a .types.ts file to extract out the public contracts that should be supported and documented.

A `.types` file contains all of the interface contracts that the user should know about to use the component. It is the "contract" for the component. When we evaluate semantic versioning, we look through the changes at `.types` files to determine if the change is a major, minor, or patch.

The `.types` files are also auto documented. All JSDoc comments will be extracted and shown on the demo site for documentation.

When your component exposes public methods/properties, define an interface for the component in the `.types` file and implement the interface.
The auto documentation will interpret the I{Component} interface as the class contract and show it in the documentation as the class
definition.

## Imperative API strategies

In rare cases, a component may need to offer an imperative api surface. The most common scenario is to ask a component to focus, but other scenarios may be surfaces such as scrolling to a particular item index for a virtualized list.

We do not want the user to access private content, so we lock imperative API surfaces down to a `componentRef` reference.

```typescript
interface IButtonProps {
  componentRef: React.Ref<IButton>;
}

interface IButton {
  /**
   * Sets focus to the button element.
   */
  focus(): void;
}
```

### Provide explicit return types for methods declared in .types.ts

Bad:

```typescript
interface IButton {
  /**
   * Sets focus to the button element.
   */
  focus();
}
```

Good: explicitly specify the return type of `focus`:

```typescript
interface IButton {
  /**
   * Sets focus to the button element.
   */
  focus(): void;
}
```

## Naming guidance

### Flags (Booleans)

Property flags should be as consistent as possible with given html guidelines.

The names should reflect the exceptional case. If something is visible by default, the name should be `hidden`. If something is selected by
default, the name should be `unselected`. By doing this, it becomes really clear to the consumer what the default value for the flag is
(the opposite of the name) and it makes it easy to use the component in its default state without guessing which flag needs to be set for
it to be used (e.g. Panels have an isOpen flag that MUST be set to true for them to show up... that's a bad developer experience as it
requires them to read through all of the property descriptions in order to understand how to get the Panel to show up.)

If a flag needs to be targeted at a specific subject (the foo label), prefix the flag with the subject: `fooLabelHidden`. The subject
should be easy to understand; avoid unclear generalizations.

Avoid prefixed subjects if it pertains to the primary subject of the component. (for TextField, “disabled” is good enough for a flag
controlling the disabled state of the input element.)

| BAD            | GOOD              | Notes                                                                              |
| -------------- | ----------------- | ---------------------------------------------------------------------------------- |
| isChecked      | checked           | There is an HTML precedence for checked.                                           |
| isVisible      | visible           | Consider `hidden` unless default behavior is hidden (which you should reconsider!) |
| isSelected     | selected          |
| isEnabled      | disabled          | If the state is enabled by default, it should be named for the exceptional case.   |
| isOpen         | hidden            | If the exceptional case should be that we hide something, call it hidden.          |
| isFooDisabled  | fooButtonDisabled | If the `foo` subject is unclear, make is specific to the type.                     |
| buttonDisabled | disabled          | If the subject IS the component, don't give it a subject name.                     |

### Event callbacks

Event callbacks should be prefixed with `on`. If it is necessary to target a subject, the subject should be in between `on` and the event
name. Always use present tense verbs instead of past tense.

| BAD                      | GOOD         | Notes |
| ------------------------ | ------------ | ----- |
| mouseClick               | onClick      |
| onClicked                | onClick      |
| inputClick, onClickInput | onInputClick |

It should also be noted that for event callbacks, the ORDER of parameters should be consistent with the precedence if one exists.

Example:

| BAD                                                  | GOOD                                                       |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| `onClick: (item: any, ev: React.MouseEvent) => void` | `onClick: (ev?: React.MouseEvent<{}>, item?: any) => void` |

### Custom render methods

In cases where you wish to give the user a way to render a custom version of a thing, follow the convention `onRenderSubject`. It should
also use the `IRenderFunction` interface defined in common, which takes in `props` and a `defaultRender` function and returns a JSX element:

BAD:
`renderItem: (item: any, foo: any, bar; any) => JSX.Element`

GOOD:
`onRenderItem: IRenderFunction<IItemProps>`

## Use arrow function properties to avoid ALL binds in templates

When we use bind in a template, it means that the function is recreated every time, which is an anti-pattern.

BAD:

```typescript
class Foo {

  public _onClick(ev: React.MouseEvent) {
  }

  render() {
    <button onClick={this._onClick.bind(this)}>Click me</button
  }

}
```

Instead we can use an arrow function property as it will always be bound to the component.

GOOD:

```typescript
class Foo {

  public _onClick = (ev: React.MouseEvent) => {
  }

  render() {
    <button onClick={this._onClick}>Click me</button
  }
}
```

## For gathering refs, avoid string refs, use resolve functions

Facebook has deprecated the use of string refs. Plus, string refs don't play very well with some scenarios like in Layered content, where
the content may be asynchronously rendered. The recommendation is to use functions to resolve refs. These functions must be pre-bound to

Bad:

```typescript
public render() {
  return <div ref='root' />
}
```

Bad:

```typescript
public render() {
  return <div ref={ (el) => this._root = el } />
}
```

Good:

Use [React.createRef](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) for ref objects, or for functional components, use the [React.useRef](https://reactjs.org/docs/hooks-reference.html#useref) hook.

```typescript
import { useRef, useEffect } from "react";

const App = () => {
  const buttonRef = useRef(undefined);

  // Focus the button on mount.
  useEffect(() => buttonRef.current.focus(), []);

  return <Button componentRef={buttonRef} />;
};
```

## Use React eventing, unless you need to use native.

Be aware that React eventing and DOM eventing are two different systems. They do not play well with each other. DOM event handlers will
always fire BEFORE React events, regardless of the DOM structure. This can introduce unexpected bugs in code that mixes both React and
native DOM eventing.

Unfortunately there are plenty of scenarios where we must mix the two systems together; for example, you may need to listen for
application-wide clicks that bubble up to window in order to implement a light-dismiss behavior. Or perhaps you need to listen for window
resizes. Or maybe you need to observe scroll events so that you can hide/show something.

We use the EventGroup object for abstracting native eventing. It is simple to use; there is an "on" method and an "off" method that wrap
calling addEventListener in modern browsers (or attachEvent in legacy IE.) Again if you're using the BaseComponent, it is already available
to you via the \_events property.

## Root elements should have a component class name.

Every component's root element should have a ms-Component class name. Additinally the user should be able to provide their own className
via prop that should be added to the class list of the root element.

If specific component elements need special classnames injected, add more classNames to props.

A component's SCSS file should ONLY include files applicable to the component, and should not define styles for any other component.

# Data/state management best practices

## Things to flat out avoid

Singletons and globals. Do not share state of a component via a singleton instance object. This is a pure anti-pattern for the following reasons:

- Singletons have no lifetime and therefore can't initialize/clean up when they aren't used.
- Singletons often paint you into a corner when you want more than one of the same thing on the page.
- They are often difficult to test without polluting states required for other tests.
- The make non-browser scenario reuse really difficult. (Build tooling, server side code.)

Data and state should always follow the lifetime of the component that owns it. When that component is no longer needed, the state should
be garbage collected, event handlers should be removed, and xhr requires spawned in that context should be cancelled.

There are exceptional cases where everything should share a common instance of a store; Persona presence is a great example.

## Use const values global to a file, rather than as static members

Don't use public/private statics, use file scope.

Bad:

```typescript
class Foo {
  private static DEFAULT_DELAY = 300;
}
```

Good:

```typescript
const DEFAULT_DELAY = 300;

class Foo {}
```

Note: using file scopes minimizes the name down to 1 character, whereas this.REALLY_LONG_NAME doesn't minify the name. Caveat being
that if you export it, minify won't touch exports.
