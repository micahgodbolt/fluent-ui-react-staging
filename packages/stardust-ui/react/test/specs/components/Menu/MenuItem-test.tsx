import {
  Accessibility,
  menuItemAsToolbarButtonBehavior,
  tabBehavior,
} from '@stardust-ui/accessibility'
import * as React from 'react'

import { isConformant, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests'
import { mountWithProviderAndGetComponent } from 'test/utils'
import MenuItem from 'src/components/Menu/MenuItem'
import Box from 'src/components/Box/Box'

describe('MenuItem', () => {
  isConformant(MenuItem, {
    eventTargets: {
      onClick: '.ui-menu__item__wrapper',
    },
    wrapperComponent: Box,
  })

  it('content renders as `li > a`', () => {
    const menuItem = mountWithProviderAndGetComponent(MenuItem, <MenuItem content="Home" />)
      .find('.ui-menu__item__wrapper')
      .hostNodes()

    expect(menuItem.is('li')).toBe(true)
    // The ElementType is wrapped with Ref, which is adding two HOC in total, that's why we need the three childAt(0) usages
    expect(
      menuItem
        .childAt(0)
        .childAt(0)
        .childAt(0)
        .is('a'),
    ).toBe(true)
    expect(menuItem.text()).toBe('Home')
  })

  it('children render directly inside `li`', () => {
    const menuItem = mountWithProviderAndGetComponent(MenuItem, <MenuItem>Home</MenuItem>)
      .find('.ui-menu__item__wrapper')
      .hostNodes()

    expect(menuItem.is('li')).toBe(true)
    expect(menuItem.childAt(0).exists()).toBe(false)
    expect(menuItem.text()).toBe('Home')
  })

  describe('accessibility', () => {
    handlesAccessibility(MenuItem, { defaultRootRole: 'presentation', usesWrapperSlot: true })
    handlesAccessibility(MenuItem, { defaultRootRole: 'menuitem', partSelector: 'a' })

    const behaviors: { name: string; behavior: Accessibility; expectedAnchorRole: string }[] = [
      { name: 'default', behavior: undefined, expectedAnchorRole: 'menuitem' },
      {
        name: 'menuItemAsToolbarButtonBehavior',
        behavior: menuItemAsToolbarButtonBehavior,
        expectedAnchorRole: 'button',
      },
      { name: 'tabBehavior', behavior: tabBehavior, expectedAnchorRole: 'tab' },
    ]
    behaviors.forEach(accessibility => {
      test(`integration test for ${accessibility.name} behavior`, () => {
        // accessibility functionality is covered by a combination of behavior tests and `handlesAccessibility()`
        // this is just an integration smoke test

        const ariaLabel = 'Useful Tool Tip'

        const menuItemComponent = mountWithProviderAndGetComponent(
          MenuItem,
          <MenuItem disabled aria-label={ariaLabel} accessibility={accessibility.behavior} />,
        )
        expect(getRenderedAttribute(menuItemComponent, 'role', '')).toBe('presentation')
        expect(getRenderedAttribute(menuItemComponent, 'aria-disabled', '')).toBe(undefined)
        expect(getRenderedAttribute(menuItemComponent, 'aria-label', '')).toBe(undefined)

        expect(getRenderedAttribute(menuItemComponent, 'role', 'a')).toBe(
          accessibility.expectedAnchorRole,
        )
        expect(getRenderedAttribute(menuItemComponent, 'aria-disabled', 'a')).toBe('true')
        expect(getRenderedAttribute(menuItemComponent, 'aria-label', 'a')).toBe(ariaLabel)
      })
    })
  })
})
