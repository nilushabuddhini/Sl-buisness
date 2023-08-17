const express =  require('express')

const path = require('path')

const dotenv = require('dotenv').config()

const { default:mongoose } = require('mongoose')

const storeroutes =  require('./routes/storeroutes')

const systemroutes = require('./routes/system')

const cors = require('cors')

const app = express()

app.use(express.json())

app.use('/',(req,res,next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/items', storeroutes)
app.use('/api/system', systemroutes)

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

mongoose.connect(
    process.env.MONGOOSE
).then(
    app.listen(process.env.PORT, () => {
        console.log('App listening on port',process.env.PORT)
        console.log('DB uri is', process.env.MONGOOSE)
    })
)

