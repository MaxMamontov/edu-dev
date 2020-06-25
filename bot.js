require('dotenv').config() // 
const { Telegraf } = require('telegraf') // 
const Markup = require('telegraf/markup') // клавиатура для бота
const bot = new Telegraf(process.env.BOT_TOKEN) // токен лежит в файле .env
const api = require('covid19-api') // 
const COUNTRIES_LIST = require('./constants') // 

bot.start((ctx) => ctx.reply(
    'Привет, ' + ctx.message.from.first_name, // приветствие по имени
    Markup.keyboard([['ukraine', 'russia', 'italy'], ['canada', 'germany', '/help']]).resize().extra()
))

bot.help((ctx) => ctx.reply(COUNTRIES_LIST))

// если убрать async await не будет работать, - ответ не дождемся.
bot.on('text', async (ctx) => {
    let data = {}
try{
    data = await api.getReportsByCountries(ctx.message.text)
    // data = await api.getReportsByCountries('russia')

    const formatData = 'Страна: ' + data[0][0].country + ' _ ' + 'Случаи: ' + data[0][0].cases

    ctx.reply(formatData)
    // console.log(data)
    } catch{
        console.log('Some Error')
        ctx.reply('Some Error')
    }
})

bot.launch()

console.log('Бот запущен!')