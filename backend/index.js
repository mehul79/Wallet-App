const express = require('express')
const app = express()
const cors = require("cors")
const mainRouter = require("./routes/index.js")


app.use("/api/v1", mainRouter)
app.use(cors())

app.use(express.json())


const PORT = 9001
app.listen(9001, ()=>{
    console.log(`Listening at ${PORT}`);
})