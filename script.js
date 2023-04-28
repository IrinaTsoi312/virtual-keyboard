const body = document.querySelector('body');

// Create and add wrapper
body.insertAdjacentHTML('afterbegin', '<div class="wrapper"></div>');
const wrapper = document.querySelector('.wrapper');

// Create buttons

// Lang
if (localStorage.getItem('lang') === null) {
  localStorage.setItem('lang', 'en');
}
let keyDB;
if (localStorage.getItem('lang') === 'en') {
  keyDB = 'keys-data_EN.json';
} else {
  keyDB = 'keys-data_RU';
}

// FUNCTIONS CONSTRUCTORS
function Row(tag, style1, style2, ind) {
  this.tag = tag;
  this.style1 = style1;
  this.style2 = style2;
  this.ind = ind;
  this.createRow = function c() {
    const elem = document.createElement(this.tag);
    elem.className = `${this.style1}${this.ind}`;
    elem.classList.add(style2);
    return elem;
  };
}

function Key(tag, style, key, value) {
  this.tag = tag;
  this.style = style;
  this.key = key;
  this.value = value;
  this.createElem = function c() {
    const elem = document.createElement(tag);
    elem.className = this.style;
    elem.setAttribute('data-key', key);
    elem.setAttribute('data-value', value);
    elem.textContent = this.value;
    return this.tag;
  };
}

// Create Rows and add them into wrapper
for (let i = 0; i < 5; i += 1) {
  const el = new Row('div', 'keyboard__row-', 'keyboard__row', i + 1);
  const elem = el.createRow();
  wrapper.append(elem);
}

// Create Btns
