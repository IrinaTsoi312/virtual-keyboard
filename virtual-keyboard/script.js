const body = document.querySelector('body');
const en = {
  uc: ['~`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace', 'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'capslock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', "'", 'enter', 'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '⯅', 'win', '', 'alt', 'ctrl', '⏴', '⏷', '⏵'],
  lc: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace', 'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'enter', 'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '⯅', 'win', '', 'alt', 'ctrl', '⏴', '⏷', '⏵'],
};
const ru = {
  uc: ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace', 'tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'capslock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter', 'shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '⯅', 'win', '', 'alt', 'ctrl', '⏴', '⏷', '⏵'],
  lc: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace', 'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter', 'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '⯅', 'win', '', 'alt', 'ctrl', '⏴', '⏷', '⏵'],
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
txtOutput.readOnly = true;
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
function Row(tag, name, style) {
  this.tag = tag;
  this.name = name;
  this.style = style;
  this.createRow = function c() {
    const elem = document.createElement(this.tag);
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
const lengths = [14, 14, 13, 12, 7];

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
  if (lang === 'en') {
    lang = en;
  } else if (lang === 'ru') {
    lang = ru;
  }
  for (let i = 0; i < btns.length; i += 1) {
    btns[i].textContent = lang.lc[i];
  }
}
addContentToBtns();

// Add Manual
const instruction = document.createElement('div');
instruction.className = 'instruction';
const os = document.createElement('p');
os.className = 'instruction__par';
os.textContent = 'OS (operating system): Windows';
instruction.append(os);
const keysCombo = document.createElement('p');
keysCombo.className = 'instruction__par';
keysCombo.textContent = 'Change language: ctrl + shift';
instruction.append(keysCombo);
wrapper.append(instruction);

// Add additional styles
const controls = ['backspace', 'tab', 'capslock', 'enter', 'ctrl', 'win', 'alt', '', 'shift', 'del'];
for (let i = 0; i < controls.length; i += 1) {
  for (let k = 0; k < btns.length; k += 1) {
    if (btns[k].textContent === controls[i]) {
      btns[k].classList.add('control-btn');
      if (btns[k].textContent === '') {
        btns[k].id = 'space';
      } else {
        btns[k].id = controls[i];
      }
    }
  }
}

// Type text
const output = document.querySelector('#txtOutput');

// Change language
function changeLang() {
  if (localStorage.getItem('lang') === 'en') {
    localStorage.setItem('lang', 'ru');
    lang = ru;
    addContentToBtns();
  } else if (localStorage.getItem('lang') === 'ru') {
    localStorage.setItem('lang', 'en');
    lang = en;
    addContentToBtns();
  }
}
function doubleClick(func, ...codes) {
  const buttons = new Set();
  document.addEventListener('keydown', (e) => {
    buttons.add(e.code);
    for (let i = 0; i < codes.length; i += 1) {
      if (!buttons.has(codes[i])) {
        return;
      }
    }
    buttons.clear();
    func();
  });
  document.addEventListener('keyup', (e) => {
    buttons.delete(e.code);
  });
}
doubleClick(changeLang, 'ShiftLeft', 'ControlLeft');
doubleClick(changeLang, 'ShiftRight', 'ControlRight');

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
    output.scrollTop = output.scrollHeight;
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

// Get Symbols
const shift = document.querySelector('#shift');
function changeContent() {
  shift.classList.toggle('active');
  if (shift.classList.contains('active')) {
    if (lang === 'en') {
      lang = en;
    } else if (lang === 'ru') {
      lang = ru;
    }
    for (let i = 0; i < btns.length; i += 1) {
      btns[i].textContent = lang.uc[i];
    }
  } else {
    addContentToBtns();
  }
}
shift.addEventListener('click', changeContent);

// Physical keyboard
function lightKeys(key) {
  btns.forEach((btn) => {
    if (btn.textContent === key) {
      if (!btn.classList.contains('active-btn')) {
        btn.classList.add('active-btn');
      } else if (btn.classList.contains('active-btn')) {
        btn.classList.remove('active-btn');
        btn.classList.add('active-btn');
      }
    }
  });
}

const spacebtn = document.querySelector('#space');
document.addEventListener('keydown', (e) => {
  output.scrollTop = output.scrollHeight;
  const chars = [...(en.uc), ...(en.lc), ...(ru.uc), ...(ru.lc)];
  const ctr = ['Backspace', 'Enter', 'CapsLock', 'Space', 'Tab', 'Shift', 'Control', 'Alt', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'OS'];
  if (chars.includes(e.key) || ctr.includes(e.key) || ctr.includes(e.code)) {
    if (e.key === 'Backspace') {
      lightKeys('backspace');
      backspace();
    } else if (e.key === 'Enter') {
      lightKeys('enter');
      enter();
    } else if (e.key === 'CapsLock') {
      clock();
      lightKeys('capslock');
    } else if (e.code === 'Space') {
      if (!spacebtn.classList.contains('active-btn')) {
        spacebtn.classList.add('active-btn');
      } else if (spacebtn.classList.contains('active-btn')) {
        spacebtn.classList.remove('active-btn');
      }
      space();
    } else if (e.key === 'Tab') {
      lightKeys('tab');
      tab();
    } else if (e.key === 'Shift') {
      changeContent();
    } else if (e.key === 'Control') {
      lightKeys('ctrl');
    } else if (e.key === 'Alt') {
      lightKeys('alt');
    } else if (e.key === 'ArrowUp') {
      lightKeys('⯅');
      txtOutput.value += '⯅';
    } else if (e.key === 'ArrowLeft') {
      lightKeys('⏴');
      txtOutput.value += '⏴';
    } else if (e.key === 'ArrowDown') {
      lightKeys('⏷');
      txtOutput.value += '⏷';
    } else if (e.key === 'ArrowRight') {
      lightKeys('⏵');
      txtOutput.value += '⏵';
    } else if (e.key === 'OS') {
      txtOutput.value += '';
    } else {
      lightKeys(e.key);
      txtOutput.value += e.key;
    }
  }
});
document.addEventListener('keyup', () => {
  btns.forEach((btn) => {
    btn.classList.remove('active-btn');
  });
});
