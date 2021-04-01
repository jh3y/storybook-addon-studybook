import React from 'react'
import { addons } from '@storybook/addons'
import StudybookTheme from './studybookTheme'


const Label = (item) => {
  console.info(label)
  return <abbr title="">{item.name}</abbr>
}

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'bottom',
  enableShortcuts: true,
  isToolshown: true,
  theme: StudybookTheme,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
    renderLabel: Label,
  },
})
