const socket = io.connect("https://chat-maluco.herokuapp.com/" || "http://localhost:3003");

let elements = {
  message: document.getElementById("message"),
  user: document.getElementById("user"),
  btn: document.getElementById("send"),
  output: document.getElementById("output"),
  feedback: document.getElementById("feedback"),
  chatWindow: document.getElementById("chat-window")
};

elements.btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: elements.message.value,
    user: elements.user.value
  });
  elements.message.value = "";
  elements.chatWindow.scrollTo(0,elements.chatWindow.scrollHeight)
});

elements.message.addEventListener("keypress", () => {
  socket.emit("typing", elements.user.value);
});

elements.user.addEventListener("blur", () => {
  elements.user.remove();
  const username = document.getElementById("username");
  username.innerHTML = elements.user.value || `<h1 id="username">Anonymous</h1>`;
  username.setAttribute("display", "block");
});

socket.on("chat", (data) => {
  elements.feedback.innerHTML = "";
  elements.output.innerHTML += `<p class="msg"><strong data-user="${socket.id}" id="user-color">${data.user || "Anonymous"}:</strong> ${data.message}</p>`;
});

socket.on("typing", (data) => {
  elements.feedback.innerHTML = `<p><em>${data} is typing...</em></p>`;
});
