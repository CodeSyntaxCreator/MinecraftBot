//Run - node index.js

const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')
const inventoryViewer = require('mineflayer-web-inventory')
const armorManager = require("mineflayer-armor-manager");
const autoeat = require('mineflayer-auto-eat').plugin
const { autoCrystal } = require('../lib/index')
const toolPlugin = require('mineflayer-tool').plugin


// Bot configuration
const bot = mineflayer.createBot({
  host: 'localhost',
  port: '25565',
  username: 'BOT',
  password: '12345678',
  auth: 'microsoft' // for offline mode servers, you can set this to 'offline'
})

//Load Plugins
bot.loadPlugin(pathfinder)
bot.loadPlugin(inventoryViewer)
bot.loadPlugin(armorManager)
bot.loadPlugin(autoCrystal)
bot.loadPlugin(autoeat)
bot.loadPlugin(toolPlugin)

//Pathfinder
const RANGE_GOAL = 1 // get within this radius of the location


bot.once('spawn', () => {
  const defaultMove = new Movements(bot)
    const { x: X, y: Y, z: Z } = target.position

    bot.pathfinder.setMovements(defaultMove)
    bot.pathfinder.setGoal(new GoalNear(X, Y, Z, RANGE_GOAL))
})

//Inventory Viewer
inventoryViewer(bot)
//Armor Manager
bot.once("spawn", () => bot.armorManager.equipAll());
//Auto-eat

bot.on('autoeat_started', (item, offhand) => {
    console.log(`Eating ${item.name} in ${offhand ? 'offhand' : 'hand'}`)
})

bot.on('autoeat_finished', (item, offhand) => {
    console.log(`Finished eating ${item.name} in ${offhand ? 'offhand' : 'hand'}`)
})

bot.on('autoeat_error', console.error)

//Auto Crystal 

bot.once('spawn', () => {
  bot.autoCrystal.options.logErrors = true
  console.clear()
  console.log('Spawned.')
  bot.chat('/gamemode creative')
  bot.chat('/give @s end_crystal 500')
})

bot.on('end', () => {
  main()
})

bot.on('kicked', (reason) => {
  console.log(reason)
  main()
})

bot.on('error', (reason) => {
  console.error(reason)
  main()
})

bot.on('chat', async (username, message) => {
  if (username === bot.username) return

  switch (message) {
    case 'start':
      bot.chat('AutoCrystal enabled.')
      await bot.autoCrystal.enable()
      break

    case 'stop':
      bot.chat('AutoCrystal disabled.')
      await bot.autoCrystal.disable()
      break

    case 'holes':
      const holes = await bot.autoCrystal.getHoles()
      bot.chat(`Found ${holes.length} holes made out of bedrock.`)
      break

    default:
      break
  }
})

// Auto tool

bot.on('spawn', async () => {
  const blockPos = bot.entity.position.offset(0, -1, 0)
  const block = bot.blockAt(blockPos)

  await bot.tool.equipForBlock(block, {})
  await bot.dig(block)
 })

