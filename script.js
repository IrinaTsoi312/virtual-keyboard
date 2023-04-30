const body = document.querySelector('body');
const en = {
  uc: ['~', '!', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace', 'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'del', 'capslock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', "'", 'Enter', 'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '⯅', 'shift', 'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', '⏴', '⏷', '⏵'],
  lc: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace', 'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del', 'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'Enter', 'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '⯅', 'shift', 'ctrl', 'win', 'alt', '', 'alt', 'ctrl', '⏴', '⏷', '⏵'],
};
const ru = {
  uc: ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace', 'TAB', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'capslock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '⯅', 'shift', 'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', '⏴', '⏷', '⏵'],
  lc: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace', 'TAB', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter', 'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '⯅', 'shift', 'ctrl', 'win', 'alt', '', 'alt', 'ctrl', '⏴', '⏷', '⏵'],
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
const lengths = [14, 15, 13, 13, 9];

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
  let l;
  if (lang === 'en') {
    l = en;
  } else if (lang === 'ru') {
    l = ru;
  }
  for (let i = 0; i < btns.length; i += 1) {
    btns[i].textContent = l.lc[i];
    btns[i].setAttribute('data-lc', l.lc[i]);
    btns[i].setAttribute('data-uc', l.uc[i]);
  }
}
addContentToBtns();

// Add additional styles
const controls = ['backspace', 'tab', 'capslock', 'Enter', 'ctrl', 'win', 'alt', '', 'shift', 'del'];
for (let i = 0; i < controls.length; i += 1) {
  for (let k = 0; k < btns.length; k += 1) {
    if (btns[k].textContent === controls[i]) {
      btns[k].classList.add('control-btn');
      if (btns[k].textContent === '') {
        btns[k].id = 'space';
      } else if (btns[k].textContent === 'Enter') {
        btns[k].id = 'enter';
      } else {
        btns[k].id = controls[i];
      }
    }
  }
}

// Type text
const output = document.querySelector('#txtOutput');

// Control functions
function backspace() {
  const { value } = output;
  const arr = value.split('');
  arr.pop();
  output.value = arr.join('');
}
function space() {
  output.value += ' ';
}
function enter() {
  output.value += '\n';
}
function tab() {
  output.value += '  ';
}

btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!btn.classList.contains('control-btn')) {
      output.value += btn.textContent;
    }
    if (btn.id === 'backspace') {
      backspace();
    }
    if (btn.id === 'space') {
      space();
    }
    if (btn.id === 'enter') {
      enter();
    }
    if (btn.id === 'tab') {
      tab();
    }
  });
});

//  Case changing
const capslock = document.querySelector('#capslock');
function clock() {
  let content;
  if (!capslock.classList.contains('active')) {
    for (let i = 0; i < btns.length; i += 1) {
      if (!btns[i].classList.contains('control-btn')) {
        content = btns[i].textContent.toUpperCase();
        capslock.classList.add('active');
        btns[i].textContent = content;
      }
    }
  } else if (capslock.classList.contains('active')) {
    for (let i = 0; i < btns.length; i += 1) {
      content = btns[i].textContent.toLowerCase();
      capslock.classList.remove('active');
      if (!btns[i].classList.contains('control-btn')) {
        btns[i].textContent = content;
      }
    }
  }
}
capslock.addEventListener('click', clock);

// Physical keyboard
function lightKeys(key) {
  btns.forEach((btn) => {
    if (btn.textContent === key) {
      btn.classList.add('active-btn');
    }
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    lightKeys('backspace');
    backspace();
  } else if (e.key === 'Enter') {
    lightKeys('enter');
    enter();
  } else if (e.key === 'CapsLock') {
    lightKeys('capsLock');
    clock();
  } else if (e.key === 'Tab') {
    lightKeys('tab');
    tab();
  } else {
    lightKeys(e.key);
    txtOutput.value += e.key;
  }
});
