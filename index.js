//Run - node index.js

const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')
const inventoryViewer = require('mineflayer-web-inventory')

// Bot configuration
const bot = mineflayer.createBot({
  host: 'localhost',
  port: '25565',
  username: 'BOT',
  password: '12345678',
  auth: 'microsoft' // for offline mode servers, you can set this to 'offline'
})


//Pathfinder
const RANGE_GOAL = 1 // get within this radius of the player

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
  const defaultMove = new Movements(bot)
    const { x: playerX, y: playerY, z: playerZ } = target.position

    bot.pathfinder.setMovements(defaultMove)
    bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, RANGE_GOAL))
  })

  //Inventory Viewer
  inventoryViewer(bot, options)
