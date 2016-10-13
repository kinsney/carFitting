const Stats = require('stats.js')

const stats = module.exports = new Stats()

stats.setMode(0)
stats.id = 'stats'

document.body.appendChild(stats.domElement)
