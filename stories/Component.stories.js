import React from 'react'

import buttonDocs from '../docs/button.mdx'
import linkDocs from '../docs/link.mdx'
import introDocs from '../docs/intro.mdx'

export default {
  title: 'Studybook/Component Case Study',
  parameters: {
    docs: {
      page: introDocs,
    },
  },
}

export const Intro = () => null
Intro.parameters = {
  viewMode: 'docs',
  docs: {
    page: introDocs,
  },
}

export const DefaultButton = () => (
  <button style={{ fontWeight: 'normal' }}>Learning about this Button</button>
)
DefaultButton.parameters = {
  docs: {
    page: buttonDocs,
  },
}

export const NotAButton = () => <a>I'm a link, not a button</a>
NotAButton.parameters = {
  docs: {
    page: linkDocs,
  },
}
