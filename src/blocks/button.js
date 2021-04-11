import React, { useContext, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { Button } from '@storybook/components'
import { DocsContext } from '@storybook/addon-docs/blocks'
import { CONSTANTS } from '../constants'

const isComplete = (id) => {
  if (window.localStorage.getItem(CONSTANTS.ADDON_ID)) {
    const CURRENT = JSON.parse(window.localStorage.getItem(CONSTANTS.ADDON_ID))
    return CURRENT.completed.indexOf(id) !== -1
  }
  return false
}

const CompleteButton = ({ name }) => {
  if (!name)
    throw Error(
      'addon-studybook: No "name" prop provided for complete button'
    )

  const context = useContext(DocsContext)
  const buttonRef = useRef(null)

  console.info(name, id, context.storyStore._stories)

  const story = Object.entries(context.storyStore._stories).filter(
    ([, story]) => story.kind === context.kind && story.name === name
  )[0]

  if (!story) throw Error(`addon-studybook: No story exists with the name ${name}`)

  const id = story[0]

  const [complete, setComplete] = useState(isComplete(id))

  const BROADCAST = () => {
    if (!complete) {
      const BOUNDS = buttonRef.current.getBoundingClientRect()
      confetti({
        disableForReducedMotion: true,
        origin: {
          x: (BOUNDS.x + BOUNDS.width / 2) / window.innerWidth,
          y: (BOUNDS.y + BOUNDS.height / 2) / window.innerHeight,
        },
      })
    }
    setComplete(!complete)
    context.storyStore._channel.emit('studyDocsToggle', [id])
  }
  return (
    <Button
      ref={buttonRef}
      onClick={BROADCAST}
      {...(!complete && { primary: true })}
      {...(complete && { outline: true })}>
      {complete ? CONSTANTS.COMPLETE : CONSTANTS.INCOMPLETE}
    </Button>
  )
}

export default CompleteButton
