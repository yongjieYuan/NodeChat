//实现与服务端连接
const socket = io.connect("http://localhost:3000")
  //获取元素节点
const output = document.querySelector(".output"),
  waitting = document.querySelector(".waitting"),
  handle = document.querySelector("#handle"),
  content = document.querySelector("#content"),
  sendBtn = document.querySelector("button");

//发送数据
sendBtn.addEventListener("click", () => {
  socket.emit("chat", {
      handle: handle.value,
      content: content.value
    })
    //发送数据时，输入文本框清空
  content.value = "";
  //发送数据时，将“xx正在输入”的字样清除
  waitting.innerHTML = "";
})
content.addEventListener("keyup", (e) => {
  //输入时发送“xx正在输入”事件
  socket.emit("typing", { handle: handle.value });
  if (e.key === "Enter") {
    socket.emit("chat", {
      handle: handle.value,
      content: content.value
    })
    content.value = "";
    waitting.innerHTML = "";
  }
})

//获取从服务器传输的数据
socket.on("chat", (data) => {
    let p = document.createElement("p");
    p.className = "pt-1 pl-1 font-weight-light";
    p.innerHTML = `<strong>${data.handle}:${data.content}</strong>`
    output.appendChild(p);
    waitting.innerHTML = "";
  })
  //获取来自服务器对方输入时事件
socket.on('typing', (data) => {
  waitting.innerHTML = `${data.handle}正在输入…`
})