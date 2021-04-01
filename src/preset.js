const managerEntries = (entry = []) => [...entry, require.resolve('./register')]

module.exports = { managerEntries }
