import { selectableListItemBehavior } from '@stardust-ui/accessibility'
import * as React from 'react'
import * as keyboardKey from 'keyboard-key'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

import ListItem from 'src/components/List/ListItem'

describe('ListItem', () => {
  isConformant(ListItem)
  handlesAccessibility(ListItem, { defaultRootRole: 'listitem' })

  test('handleClick is executed when Enter is pressed for selectable list', () => {
    const onClick = jest.fn()
    const listItem = mountWithProvider(
      <ListItem accessibility={selectableListItemBehavior} onClick={onClick} />,
    ).find('ListItem')
    listItem.simulate('keydown', { keyCode: keyboardKey.Enter })
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('handleClick is executed when Spacebar is pressed for selectable list', () => {
    const onClick = jest.fn()
    const listItem = mountWithProvider(
      <ListItem accessibility={selectableListItemBehavior} onClick={onClick} />,
    ).find('ListItem')
    listItem.simulate('keydown', { keyCode: keyboardKey.Spacebar })
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
