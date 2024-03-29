import isBrowser from './isBrowser'

// Taken from https://github.com/ten1seven/what-input/blob/master/src/scripts/what-input.js
/* eslint-disable */

/*
 * variables
 */

// last used input type
let currentInput = 'initial'

// check for sessionStorage support
// then check for session variables and use if available
try {
  if (window.sessionStorage.getItem('what-input')) {
    currentInput = window.sessionStorage.getItem('what-input')
  }
} catch (e) {}

// event buffer timer
let eventTimer = null

// list of modifier keys commonly used with the mouse and
// can be safely ignored to prevent false keyboard detection
const ignoreMap = [
  16, // shift
  17, // control
  18, // alt
  91, // Windows key / left Apple cmd
  93, // Windows menu / right Apple cmd
]

// mapping of events to input types
const inputMap = {
  keydown: 'keyboard',
  keyup: 'keyboard',
  mousedown: 'mouse',
  mousemove: 'mouse',
  MSPointerDown: 'pointer',
  MSPointerMove: 'pointer',
  pointerdown: 'pointer',
  pointermove: 'pointer',
  touchstart: 'touch',
}

// boolean: true if touch buffer is active
let isBuffering = false

// map of IE 10 pointer events
const pointerMap = {
  2: 'touch',
  3: 'touch', // treat pen like touch
  4: 'mouse',
}

// check support for passive event listeners
let supportsPassive = false

try {
  const opts = Object.defineProperty({}, 'passive', {
    get: () => {
      supportsPassive = true
    },
  })

  window.addEventListener('test', null, opts)
} catch (e) {}

/*
 * set up
 */

const setUp = () => {
  // add correct mouse wheel event mapping to `inputMap`
  inputMap[detectWheel()] = 'mouse'

  addListeners(window)
  doUpdate(window.document)
}

/*
 * events
 */

const addListeners = (eventTarget: Window) => {
  // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
  // can only demonstrate potential, but not actual, interaction
  // and are treated separately
  const options = supportsPassive ? { passive: true, useCapture: true } : true

  // pointer events (mouse, pen, touch)
  // @ts-ignore
  if (eventTarget.PointerEvent) {
    eventTarget.addEventListener('pointerdown', setInput)
    // @ts-ignore
  } else if (window.MSPointerEvent) {
    eventTarget.addEventListener('MSPointerDown', setInput)
  } else {
    // mouse events
    eventTarget.addEventListener('mousedown', setInput, true)

    // touch events
    if ('ontouchstart' in eventTarget) {
      eventTarget.addEventListener('touchstart', eventBuffer, options)
      eventTarget.addEventListener('touchend', setInput, true)
    }
  }

  // keyboard events
  eventTarget.addEventListener('keydown', eventBuffer, true)
  eventTarget.addEventListener('keyup', eventBuffer, true)
}

// checks conditions before updating new input
const setInput = event => {
  // only execute if the event buffer timer isn't running
  if (!isBuffering) {
    const eventKey = event.which
    let value = inputMap[event.type]

    if (value === 'pointer') {
      value = pointerType(event)
    }

    const ignoreMatch = ignoreMap.indexOf(eventKey) === -1
    const shouldUpdate =
      (value === 'keyboard' && eventKey && ignoreMatch) || value === 'mouse' || value === 'touch'

    if (currentInput !== value && shouldUpdate) {
      currentInput = value

      try {
        window.sessionStorage.setItem('what-input', currentInput)
      } catch (e) {}

      doUpdate(event.view.document)
    }
  }
}

// updates the doc and `inputTypes` array with new input
const doUpdate = (target: Document) => {
  target.documentElement.setAttribute(`data-whatinput`, currentInput)
}

// buffers events that frequently also fire mouse events
const eventBuffer = event => {
  // set the current input
  setInput(event)

  // clear the timer if it happens to be running
  window.clearTimeout(eventTimer)

  // set the isBuffering to `true`
  isBuffering = true

  // run the timer
  eventTimer = window.setTimeout(() => {
    // if the timer runs out, set isBuffering back to `false`
    isBuffering = false
  }, 100)
}

/*
 * utilities
 */

const pointerType = event => {
  if (typeof event.pointerType === 'number') {
    return pointerMap[event.pointerType]
  }

  // treat pen like touch
  return event.pointerType === 'pen' ? 'touch' : event.pointerType
}

// detect version of mouse wheel event to use
// via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
const detectWheel = () => {
  let wheelType

  // Modern browsers support "wheel"
  if ('onwheel' in document.createElement('div')) {
    wheelType = 'wheel'
  } else {
    // Webkit and IE support at least "mousewheel"
    // or assume that remaining browsers are older Firefox
    wheelType =
      // @ts-ignore
      document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll'
  }

  return wheelType
}

// don't start script unless browser cuts the mustard
// (also passes if polyfills are used)
if (isBrowser() && 'addEventListener' in window && Array.prototype.indexOf) {
  setUp()
}

/*
 * set up for document
 */

export const setUpWhatInput = (target: Document) => {
  const targetWindow = target.defaultView
  if (
    isBrowser() &&
    targetWindow &&
    'addEventListener' in targetWindow &&
    Array.prototype.indexOf
  ) {
    const whatInputInitialized = 'whatInputInitialized'
    if (target[whatInputInitialized] === true) {
      return
    }
    target[whatInputInitialized] = true

    addListeners(targetWindow)
    doUpdate(target)
  }
}

export const setWhatInputSource = (newInput: 'mouse' | 'keyboard' | 'initial') => {
  currentInput = newInput
}

// returns string: the current input type
// returns the same value as the `data-whatinput` attribute
export const ask = (): string => currentInput

export const isFromKeyboard = (): boolean => ask() === 'keyboard'
