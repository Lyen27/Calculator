"use strict"
const screen = document.querySelector('.screen')
const buttons = document.querySelector('.buttons')
const text = ['=', '√', 'Pi', '+', '-', 'x', '÷', 'mod', '%', '.', '0', '1', '2', '3', '8', '7', '6', '5', '4', '9', 'C']
const num = '.0123456789Pi√%'
let a = '';
let b = '';
let op = ['', ''];

function createKey() {
    for (let i = 1; i <= 21; i++) {
        const key = document.createElement('button');
        key.classList.add('keys');
        if (i === 1) {
            key.classList.remove('keys');
            key.classList.add('equal')
        }
        if (i === 21) {
            key.classList.remove('keys');
            key.classList.add('clear');
        }
        buttons.appendChild(key);
    }
    const list = document.querySelectorAll('.buttons > *')
    list.forEach((item, index) => {
        item.textContent = text[index];
        if (index !== 0 && index !== 20) {
            item.addEventListener('click', () => {
                if (num.includes(item.textContent) && op[0] === '') {
                    if(a.includes('.') && item.textContent === '.') {
                        return;
                    }
                    a += item.textContent;
                    populateScreen(item);
                } else if (!num.includes(item.textContent)) { //operators
                    if (op[0] !== '') {
                        op[1] = item.textContent;
                        if (b === '') {
                            b = a;
                        }
                        screen.textContent = operate(a, op[0], b);
                        a = screen.textContent;
                        op[0] = op[1];
                        b = '';
                    } else {
                        op[0] = item.textContent;
                    };

                } else {
                    if (b.length === 0) {
                        screen.textContent = '';
                    }
                    if(b.includes('.') && item.textContent === '.') {
                        return;
                    }
                    b += item.textContent;
                    populateScreen(item);
                };

            })
        }

        switch (index) {
            case 0:
                item.addEventListener('click', () => {
                    screen.textContent = operate(a, op[0], b);
                    a = screen.textContent;
                    if (a === 'ERROR') {
                        a = '';
                    }
                    b = '';
                    op[0] = '';
                    op[1] = '';
                })
                break;
            case 20:
                item.addEventListener('click',() => {
                    screen.textContent = '';
                    op[0] = '';
                    op[1] = '';
                    a = '';
                    b = '';
                })
        }
    })
}

function populateScreen(node) {
    if (screen.textContent === 'ERROR') {
        screen.textContent = '';
    }
    screen.textContent += node.textContent;
}

function add(x, y) {
    return `${x + y}`;
}

function sub(x, y) {
    return `${x - y}`
}

function multiply(x, y) {
    return `${x * y}`
}

function divide(x, y) {
    if (y === 0) {
        a = '';
        b = '';
        op = ['', ''];
        return 'ERROR';
    }
    return `${x / y}`
}

function mod(x, y) {
    return `${x % y}`
}

function operate(x, op, y) {
    if (x.includes('√')) {
        x = `${Math.sqrt(+x.substring(1))}`;
    }
    if (y.includes('√')) {
        y = `${Math.sqrt(+y.substring(1))}`;
    }
    if (x.includes('%')) {
        x = (+x.substring(0, x.length - 1)) / 100;
    }
    if (y.includes('%')) {
        y = (+y.substring(0, y.length - 1)) / 100;
    }
    if (x === 'Pi') {
        x = Math.PI;
    }
    if (y === 'Pi') {
        y = Math.PI;
    }
    switch (op) {
        case '+':
            return add(+x, +y);
        case '-':
            return sub(+x, +y)
        case 'x':
            return multiply(+x, +y)
        case '÷':
            return divide(+x, +y)
        case 'mod':
            return mod(+x, +y)
        case '':
            return `${x}`
    }
}

createKey();