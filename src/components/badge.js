import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Badge, Separator } from '@storybook/components'
import { DocsContext } from '@storybook/addon-docs/blocks'
import { useChannel, useAddonState, useStorybookState } from '@storybook/api'
import { CONSTANTS, INITIAL_STATE } from '../constants'
const { ADDON_ID } = CONSTANTS

const ProgressBadge = () => {
  const globalState = useStorybookState()
  const storiesRef = useRef([])
  const [complete, setComplete] = useState(false)
  const [count, setCount] = useState(0)
  const [story, setStory] = useState(null)
  const [doc, setDoc] = useState(null)
  const [completion] = useAddonState(ADDON_ID, INITIAL_STATE)

  useChannel({
    storyRendered: setStory,
    docsRendered: setDoc,
    storyChanged: () => {
      setStory(null)
      setDoc(null)
      setComplete(false)
    },
  })

  useEffect(() => {
    setComplete(completion.completed.indexOf(story) !== -1)
  }, [completion])

  useEffect(() => {
    if (doc) {
      // Need an array out of the storiesHash
      storiesRef.current = Object.entries(globalState.storiesHash)
        .reduce((a, c) => [...a, c[1]], [])
        .filter((s) => s.kind === doc)

      // How many are complete?
      let count = 0
      storiesRef.current.forEach((s) => {
        if (completion.completed.indexOf(s.id) !== -1) count += 1
      })
      setCount(count)
      // If the number complete matches the number of valid stories, set complete.
      if (count > 0 && count === storiesRef.current.length) {
        setComplete(true)
      }
    }
  }, [doc, globalState])

  if (
    storiesRef.current.length <= 1 &&
    globalState.storyId &&
    globalState.storyId.endsWith('--page')
  )
    return null

  return (
    <Fragment>
      <Separator />
      {/* Show the badge for the current story */}
      {globalState.storiesConfigured && (
        <Badge
          status={
            completion.completed.indexOf(globalState.storyId) !== -1
              ? 'positive'
              : 'neutral'
          }>
          <span>{`${
            completion.completed.indexOf(globalState.storyId) !== -1
              ? 'Completed'
              : 'Studying'
          }: ${globalState.storiesHash[globalState.storyId].name}`}</span>
        </Badge>
      )}
      {story && (
        <Badge status={complete ? 'positive' : 'neutral'}>
          {complete ? CONSTANTS.BADGE_COMPLETE : CONSTANTS.STUDYING}
        </Badge>
      )}
      {doc && storiesRef.current && (
        <Fragment key={doc}>
          <Badge status={complete ? 'positive' : 'neutral'}>
            {complete
              ? CONSTANTS.BADGE_COMPLETE
              : `${CONSTANTS.BADGE_STUDYING}: ${count}/${storiesRef.current.length} `}
          </Badge>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProgressBadge
