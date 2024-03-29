import { chatBehavior, AccessibilityDefinition } from '@stardust-ui/accessibility'
import { handlesAccessibility, isConformant } from 'test/specs/commonTests'

import Chat from 'src/components/Chat/Chat'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
import ChatItem from 'src/components/Chat/ChatItem'

const chatImplementsCollectionShorthandProp = implementsCollectionShorthandProp(Chat)

describe('Chat', () => {
  isConformant(Chat)
  chatImplementsCollectionShorthandProp('items', ChatItem, { mapsValueToProp: 'message' })

  describe('accessibility', () => {
    handlesAccessibility(Chat, {
      focusZoneDefinition: (chatBehavior as AccessibilityDefinition).focusZone,
    })
  })
})
