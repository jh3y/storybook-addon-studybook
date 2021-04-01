import React, { Fragment } from 'react'
import { addons, types } from '@storybook/addons'
import { AddonPanel, Separator } from '@storybook/components'
import Panel from './components/panel'
import Badge from './components/badge'
import { CONSTANTS } from './constants'
const { ADDON_ID, TOOLBAR_ID, PANEL_ID } = CONSTANTS

addons.register(ADDON_ID, () => {
  addons.add(TOOLBAR_ID, {
    title: CONSTANTS.STATUS,
    type: types.TOOL,
    render: () => {
      return (
        <Fragment>
          <Separator />
          <Badge />
        </Fragment>
      )
    },
  })
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: CONSTANTS.TAB,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Panel />
      </AddonPanel>
    ),
  })
})
