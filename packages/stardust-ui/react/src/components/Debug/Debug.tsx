import keyboardKey from 'keyboard-key'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { toRefObject } from '@stardust-ui/react-component-ref'
import { EventListener } from '@stardust-ui/react-component-event-listener'

import { isBrowser } from '../../lib'
import { isEnabled as isDebugEnabled } from '../../lib/debug/debugEnabled'

import DebugPanel from './DebugPanel'
import FiberNavigator from './FiberNavigator'
import DebugRect from './DebugRect'

type DebugProps = {
  /** Existing document the popup should add listeners. */
  mountDocument?: Document
}

type DebugState = {
  debugPanelPosition?: 'left' | 'right'
  fiberNav: FiberNavigator
  selectedFiberNav: FiberNavigator
  isSelecting: boolean
}

const INITIAL_STATE: DebugState = {
  fiberNav: null,
  selectedFiberNav: null,
  isSelecting: false,
}

class Debug extends React.Component<DebugProps, DebugState> {
  state = INITIAL_STATE

  static defaultProps = {
    // eslint-disable-next-line no-undef
    mountDocument: isBrowser() ? window.document : null,
  }

  static propTypes = {
    mountDocument: PropTypes.object.isRequired,
  }

  constructor(p, s) {
    super(p, s)
    if (process.env.NODE_ENV !== 'production' && isDebugEnabled && isBrowser()) {
      // eslint-disable-next-line no-undef
      ;(window as any).openDebugPanel = () => {
        // eslint-disable-next-line no-undef
        this.debugReactComponent((window as any).$r)
      }
    }
  }

  debugReactComponent = r => {
    if (!r) {
      console.error(
        "No React component selected. Please select a Stardust component from the React's Component panel.",
      )
      return
    }
    if (!r._reactInternalFiber) {
      console.error(
        'React does not provide data for debugging for this component. Try selecting some Stardust component.',
      )
      return
    }
    if (!r.stardustDebug) {
      console.error('Not a debuggable component. Try selecting some Stardust component.')
      return
    }

    const fiberNav = FiberNavigator.fromFiber(r._reactInternalFiber)
    this.setState({ fiberNav, isSelecting: false, selectedFiberNav: null })
  }

  debugDOMNode = domNode => {
    let fiberNav = FiberNavigator.fromDOMNode(domNode)

    if (!fiberNav) {
      console.error('No fiber for dom node', domNode)
      return
    }

    fiberNav = fiberNav.findOwner(fiber => fiber.stardustDebug)

    if (fiberNav !== this.state.fiberNav) {
      this.setState({ fiberNav })
    }
  }

  handleKeyDown = e => {
    const code = keyboardKey.getCode(e)

    switch (code) {
      case keyboardKey.Escape:
        this.stopSelecting()
        break

      case keyboardKey.d:
        if (e.altKey && e.shiftKey) {
          this.startSelecting()
        }
        break
    }
  }

  handleMouseMove = e => {
    this.debugDOMNode(e.target)
  }

  handleStardustDOMNodeClick = e => {
    e.preventDefault()
    e.stopPropagation()

    this.setState({ isSelecting: false })
  }

  startSelecting = () => {
    const isSelecting = !this.state.isSelecting

    this.setState({
      ...(!isSelecting && INITIAL_STATE),
      isSelecting,
    })
  }

  stopSelecting = () => {
    this.setState(INITIAL_STATE)
  }

  selectFiber = selectedFiberNav => this.setState({ selectedFiberNav })

  changeFiber = fiberNav => this.setState({ fiberNav })

  positionRight = () => this.setState({ debugPanelPosition: 'right' })

  positionLeft = () => this.setState({ debugPanelPosition: 'left' })

  close = () => this.setState(INITIAL_STATE)

  render() {
    const { mountDocument } = this.props
    const { fiberNav, selectedFiberNav, isSelecting, debugPanelPosition } = this.state

    if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
      return (
        <>
          <EventListener
            targetRef={toRefObject(mountDocument.body)}
            listener={this.handleKeyDown}
            type="keydown"
          />
          {isSelecting && (
            <EventListener
              targetRef={toRefObject(mountDocument.body)}
              listener={this.handleMouseMove}
              type="mousemove"
            />
          )}
          {isSelecting && fiberNav && fiberNav.domNode && (
            <EventListener
              targetRef={toRefObject(fiberNav.domNode)}
              listener={this.handleStardustDOMNodeClick}
              type="click"
            />
          )}
          {isSelecting && fiberNav && <DebugRect fiberNav={fiberNav} />}
          {selectedFiberNav && <DebugRect fiberNav={selectedFiberNav} />}
          {!isSelecting && fiberNav && fiberNav.instance && (
            <DebugPanel
              fiberNav={fiberNav}
              onActivateDebugSelectorClick={this.startSelecting}
              onClose={this.close}
              // TODO: Integrate CSS in JS Styles for Host Components (DOM nodes)
              // cssStyles={stylesForNode(stardustDOMNode)}
              debugData={fiberNav.stardustDebug}
              position={debugPanelPosition || 'right'}
              onPositionLeft={this.positionLeft}
              onPositionRight={this.positionRight}
              onFiberChanged={this.changeFiber}
              onFiberSelected={this.selectFiber}
            />
          )}
        </>
      )
    }

    return null
  }
}

export default Debug
