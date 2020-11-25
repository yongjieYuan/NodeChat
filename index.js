const express = require('express')
  //引入socket.io
const socket = require('socket.io')
const ejs = require('ejs')

const app = express()


//配置视图引擎
app.set('view engine', 'ejs')
  //配置中间件
app.use(express.static('./public'))
app.get('/', (req, res) => {
  res.render('index')
})

//配置socket
const server = app.listen(3000, () => {
    console.log("Serve is running");
  })
  //建立连接
const io = socket(server);

// 传入的参数socket记录每次连接的内容(socket.id)
io.on("connection", (socket) => {
  console.log("聊天室连接成功");
  socket.on("chat", (data) => {
      io.sockets.emit("chat", data)
    })
    //从客户端接收用户输入时的事件
  socket.on("typing", (data) => {
    //广播事件,自己输入时看不到"xx正在输入"的字样
    socket.broadcast.emit("typing", data);
  })
})