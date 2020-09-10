const form = document.querySelector(`.reply`),
  input = form.querySelector(`input`),
  list = document.querySelector(`.message-row--own`),
  main = document.querySelector(`main`),
  btn = document.querySelector(`button`);

const CHAT_LS = `chat`;

let chats = [];

const time = nowTime();

function nowTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

function saveChats(chats) {
  localStorage.setItem(CHAT_LS, JSON.stringify(chats));
}

function removeBubble() {
  const btn = event.target;
  const li = btn.parentNode.parentNode.parentNode;
  const main = li.parentNode;
  main.removeChild(li);
  const cleanBubble = chats.filter(function (bubble) {
    return bubble.id !== parseInt(li.id);
  });
  chats = cleanBubble;
  saveChats(chats);
  console.log(chats);
}

function createChat(text) {
  const li = document.createElement(`li`),
    span1 = document.createElement(`span`),
    span2 = document.createElement(`span`),
    div1 = document.createElement(`div`),
    div2 = document.createElement(`div`);
  li.appendChild(div1);
  div1.appendChild(div2);
  div2.appendChild(span1);
  div2.appendChild(span2);
  main.appendChild(li);
  li.classList.add(`message-row`);
  li.classList.add(`message-row--own`);
  div1.classList.add(`message-row__content`);
  div2.classList.add(`message__info`);
  span1.classList.add(`message__bubble`);
  span2.classList.add(`message__time`);
  span1.innerText = text;
  span1.addEventListener(`click`, removeBubble);
  span2.innerText = time;
  li.id = chats.length + 1;
  const chatObj = {
    text: text,
    id: chats.length + 1,
  };
  chats.push(chatObj);
  saveChats(chats);
  window.scroll({ top: 10000, left: 0, behavior: "smooth" });
}

function submitChat() {
  event.preventDefault();
  const chatValue = input.value;
  input.value = "";
  createChat(chatValue);
}

function chatEvent() {
  form.addEventListener(`submit`, submitChat);
}

function loadChat() {
  const chatLs = localStorage.getItem(CHAT_LS);
  if (chatLs !== null) {
    const parsedChats = JSON.parse(chatLs);
    parsedChats.forEach(function (bubble) {
      createChat(bubble.text);
    });
  }
}

function init() {
  loadChat();
  chatEvent();
}
init();
