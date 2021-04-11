import React from 'react'

import buttonDocs from '../docs/button.mdx'
import linkDocs from '../docs/link.mdx'

export default {
  title: 'Studybook/Component Case Study',
  parameters: {
    hello: true,
  }
}

export const DefaultButton = () => <button>Learning about this Button</button>
DefaultButton.parameters = {
  docs: {
    page: buttonDocs
  }
}

export const NotAButton = () => <a>I'm a link, not a button</a>
NotAButton.parameters = {
  docs: {
    page: linkDocs
  }
}