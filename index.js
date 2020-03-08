const express = require('express')
const routes = require('./src/routes/index')
const radar = require('./src/routes/radar.controller')

const app = express();

app.use(express.json())
app.use(routes)
app.use(radar)

const port = process.env.PORT || 8888
  
app.listen(port, () => {
  console.log(`
    #########################################################
      Server Test seedtag listening on port: ${port}  
    #########################################################
  `);
});

module.exports = app