const app = require('./server')
const connectDb = require('./database/connection')
const config = require('./config/config')

app.listen(config.port, (error) => {
  if (error) {
    console.log('\x1b[31m', error, '\x1b[0m')
  }
  console.log('\x1b[32m', `Running on http://${config.host}:${config.port}` , '\x1b[0m')

  connectDb().then(() => console.log('\x1b[32m', `Database running on ${config.db.uri}` , '\x1b[0m'))
})
