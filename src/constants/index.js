const DEFAULT_STATE = {
  completed: [],
}

export const CONSTANTS = {
  ADDON_ID: 'course-complete',
  PANEL_ID: 'course-complete/panel',
  TOOLBAR_ID: 'course-complete/toolbar',
  COMPLETE: 'Study',
  INCOMPLETE: 'Complete',
  STUDYING: 'Studying',
  BADGE_COMPLETE: 'Complete',
  BADGE_STUDYING: 'Studied',
  STATUS: 'Study Status',
  TAB: 'Study',
}

export const INITIAL_STATE = window.localStorage.getItem(CONSTANTS.ADDON_ID)
  ? JSON.parse(window.localStorage.getItem(CONSTANTS.ADDON_ID))
  : DEFAULT_STATE
