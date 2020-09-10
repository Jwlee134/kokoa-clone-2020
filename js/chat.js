const form = document.querySelector(`.reply`),
  input = form.querySelector(`input`),
  list = document.querySelector(`.message-row--own`),
  main = document.querySelector(`main`);

const CHAT_LS = `chat`;

const chats = [];

const date = new Date();
const time = nowTime();

function nowTime() {
  const hours = date.getHours(),
    minutes = date.getMinutes();

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

function saveChats(chats) {
  localStorage.setItem(CHAT_LS, JSON.stringify(chats));
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
  span2.innerText = `${time}`;
  const chatObj = {
    text: text,
    time: time,
  };
  chats.push(chatObj);
  saveChats(chats);
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
