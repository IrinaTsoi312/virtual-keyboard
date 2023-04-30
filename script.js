const body = document.querySelector('body');
const en = {
  uc: ['~', '!', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace', 'TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'capslock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', "'", 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '⯅', 'shift', 'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', '⏴', '⏷', '⏵'],
  lc: ['`', '1', '2', '#', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace', 'TAB', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'Enter', 'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '⯅', 'shift', 'ctrl', 'win', 'alt', '', 'alt', 'ctrl', '⏴', '⏷', '⏵'],
};
let lang;

// Create and add wrapper
body.insertAdjacentHTML('afterbegin', '<div class="wrapper"></div>');
const wrapper = document.querySelector('.wrapper');

// Create and add textarea
const txtArea = document.createElement('div');
txtArea.className = 'text-output';
const txtOutput = document.createElement('textarea');
txtOutput.id = 'txtOutput';
txtOutput.name = 'text-output';
txtOutput.value = '';
txtArea.append(txtOutput);
wrapper.append(txtArea);

// Lang
if (localStorage.getItem('lang') === null) {
  localStorage.setItem('lang', 'en');
}
if (localStorage.getItem('lang') === 'en') {
  lang = 'en';
} else if (localStorage.getItem('lang') === 'ru') {
  lang = 'ru';
}

// FUNCTIONS CONSTRUCTORS
function Row(tag, name, style, ind) {
  this.tag = tag;
  this.name = name;
  this.style = style;
  this.ind = ind;
  this.createRow = function c() {
    const elem = document.createElement(this.tag);
    elem.setAttribute('data-name', `${this.name}${this.ind}`);
    elem.className = (style);
    return elem;
  };
}

function Key(tag, style) {
  this.tag = tag;
  this.style = style;
  this.createElem = function c() {
    const elem = document.createElement(this.tag);
    elem.className = this.style;
    return elem;
  };
}

// Create Rows and add them into wrapper
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
wrapper.append(keyboard);
for (let i = 0; i < 5; i += 1) {
  const el = new Row('div', 'row-', 'keyboard__row', i + 1);
  const elem = el.createRow();
  keyboard.append(elem);
}

// Create Btns
const lengths = [14, 14, 13, 13, 9];

function fillRow(row, length) {
  for (let i = 0; i < length; i += 1) {
    const el = new Key('button', 'key-btn');
    const elem = el.createElem();
    row.append(elem);
  }
}

const rows = document.querySelectorAll('.keyboard__row');

function addBtns() {
  for (let i = 0; i < lengths[i]; i += 1) {
    fillRow(rows[i], lengths[i]);
  }
}
addBtns();

const btns = document.querySelectorAll('.key-btn');
function addContentToBtns() {
  for (let i = 0; i < btns.length; i += 1) {
    if (lang === 'en') {
      btns[i].textContent = en.lc[i];
      btns[i].setAttribute('data-lc', en.lc[i]);
      btns[i].setAttribute('data-uc', en.uc[i]);
    }
  }
}
addContentToBtns();

