import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { Button, Loader } from '@storybook/components'
import { useChannel, useAddonState, useStorybookState } from '@storybook/api'
import styled from 'styled-components'

import { INITIAL_STATE, CONSTANTS } from '../constants'
const { ADDON_ID } = CONSTANTS

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 1rem;
  }
`

const Title = styled.h2`
  font-weight: bold;
`

const Panel = () => {
  const globalState = useStorybookState()
  const [complete, setComplete] = useState(false)
  const [story, setStory] = useState(null)
  const [toggles, setToggles] = useState([])
  const [completion, setCompletion] = useAddonState(ADDON_ID, INITIAL_STATE)
  const buttonRef = useRef(null)

  const isKindComplete = (arr) => {
    if (Object.keys(globalState.storiesHash).length) {
      const KIND = globalState.storiesHash[globalState.storyId].kind
      const STORIES_OF_KIND = Object.entries(globalState.storiesHash).filter(
        ([, story]) => story.kind === KIND
      )
      let count = 0
      // Loop over completed and see if those keys match up
      STORIES_OF_KIND.forEach(([id]) => {
        if (arr.completed.indexOf(id) !== -1) count += 1
      })

      if (count === STORIES_OF_KIND.length) return true
    }
    return false
  }

  const toggleComplete = () => {
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
  }

  // Could be one story, could be multiple. (WIP)
  const toggleStories = (stories) => {
    setToggles(stories)
  }

  useChannel({
    storyRendered: setStory,
    studyDocsToggle: toggleStories,
    storyChanged: () => {
      setStory(null)
      setComplete(false)
    },
  })

  useEffect(() => {
    const completed = toggles.reduce((current, toggle) => {
      return current.indexOf(toggle) !== -1
        ? current.filter((id) => id !== toggle)
        : [...current, toggle]
    }, completion.completed)

    const newCompletionState = {
      ...completion,
      completed,
    }
    window.localStorage.setItem(ADDON_ID, JSON.stringify(newCompletionState))
    if (isKindComplete(newCompletionState)) confetti()
    setCompletion(newCompletionState)
  }, [toggles])

  useEffect(() => {
    setComplete(completion.completed.indexOf(story) !== -1)
  }, [story])

  useEffect(() => {
    const newCompletionState = {
      ...completion,
      completed: complete
        ? [...new Set([...completion.completed, story])]
        : completion.completed.filter((s) => s !== story),
    }
    window.localStorage.setItem(ADDON_ID, JSON.stringify(newCompletionState))
    if (isKindComplete(newCompletionState)) confetti()
    setCompletion(newCompletionState)
  }, [complete])

  useEffect(() => {}, [completion])

  return (
    <Fragment>
      {story && (
        <Content>
          <Title>{`${globalState.storiesHash[story].parameters.__id}`}</Title>
          <Button
            ref={buttonRef}
            onClick={() => toggleComplete()}
            {...(!complete && { primary: true })}
            {...(complete && { outline: true })}>
            {complete ? CONSTANTS.COMPLETE : CONSTANTS.INCOMPLETE}
          </Button>
        </Content>
      )}
      {!story && <Loader role="progressbar" />}
    </Fragment>
  )
}

export default Panel
