module.exports = {
  stories: [
    '../stories/Welcome.stories.mdx',
    '../stories/Studybook.stories.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '../src/preset.js',
  ],
}
