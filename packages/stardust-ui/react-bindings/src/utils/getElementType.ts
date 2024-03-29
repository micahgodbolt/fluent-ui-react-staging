import * as React from 'react'

/**
 * Returns a createElement() type based on the props of the Component.
 * Useful for calculating what type a component should render as.
 *
 * @param {object} props A ReactElement props object
 * @returns {string|function} A ReactElement type
 */
function getElementType<P extends Record<string, any>>(props: P): React.ElementType {
  // ----------------------------------------
  // use defaultProp or 'div'

  return props.as || 'div'
}

export default getElementType
