// import { createServer } from "node:http"
// import next from "next"
// import parse from "url"

// const port = parseInt(process.env.PORT || "3000", 10)   
// const dev = process.env.NODE_ENV !== "production"
// const app = next({dev})
// const handle = app.getRequestHandler()

// app.prepare().then(() => 
// {
//     createServer((request, response) => 
//     {
//         const parseUrl = parse.parse(request.url!, true)
//         handle(request, response, parseUrl)
//     }).listen(port)
//     console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`)
// })
// import io from "socket.io"
const Server = require("socket.io")
const IoHandler = (request, response) => 
{
    if(response.socket.server.io)
    {
        const io = new Server(response.socket.server)
        io.on("connection", socket =>   
        {
            socket.on("message", message => 
            {
                io.emit("message", message)
            })  

            socket.on("disconnect", () => 
            {
                console.log("Client disconnected")
            })
        })
        response.socket.server.io = io
    }
    response.end()
}

module.exports = IoHandler