const express = require("express")

//const actionsRouter = require("./routers/actionsRouter")
const projectsRouter = require("./routers/projectsRouter")

const server = express()
const port = process.env.PORT || 4000

server.use(express.json())

//server.use("/actions", actionsRouter)
server.use("/projects", projectsRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "something went wrong"
    })
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})