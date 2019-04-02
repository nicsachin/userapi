const express = require('express')
const app = express();
const user = require('./routes/user')
const main = require('./routes/main')
////////////middlewares ////////////

app.use(express.json())
app.use('/api/user',user)
app.use('/',main)


//////////////////port/////
const port = process.env.port || 3000
app.listen(port,()=>console.log(`listening to port ${port}`))
