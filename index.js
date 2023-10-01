//Run - node index.js

const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')
const inventoryViewer = require('mineflayer-web-inventory')
const armorManager = require("mineflayer-armor-manager");

// Bot configuration
const bot = mineflayer.createBot({
  host: 'localhost',
  port: '25565',
  username: 'BOT',
  password: '12345678',
  auth: 'microsoft' // for offline mode servers, you can set this to 'offline'
})


//Pathfinder
const RANGE_GOAL = 1 // get within this radius of the location

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
  const defaultMove = new Movements(bot)
    const { x: X, y: Y, z: Z } = target.position

    bot.pathfinder.setMovements(defaultMove)
    bot.pathfinder.setGoal(new GoalNear(X, Y, Z, RANGE_GOAL))
})

//Inventory Viewer
inventoryViewer(bot, options)
//Armor Manager
bot.loadPlugin(armorManager)
bot.once("spawn", () => bot.armorManager.equipAll());

