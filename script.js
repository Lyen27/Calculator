"use strict"
const screen = document.querySelector('.screen')
const buttons = document.querySelector('.buttons')
const text = ['=', '√', 'Pi', '+', '-', 'x', '÷', 'mod', '%', '.', '0', '1', '2', '3', '8', '7', '6', '5', '4', '9', 'C']
const num = '0123456789Pi'

function createKey() {
    let a = '';
    let b = '';
    let op = ['', ''];
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
                    b += item.textContent;
                    populateScreen(item);
                };

            })
        }

        if (index === 0) { //change for switch
            item.addEventListener('click', () => {
                screen.textContent = operate(a, op[0], b);
                a = screen.textContent;
                b = '';
                op[0] = '';
            })
        }
    })
}

function populateScreen(node) {
    screen.textContent += node.textContent;
}

function add(a, b) {
    return `${a + b}`;
}

function operate(a, op, b) {
    switch (op) {
        case '+':
            return add(+a,+b);
        case '-':
            return sub(+a,+b)
        case 'X':
            return multiply(+a,+b)
        case '÷':
            return divide(+a,+b)
        case 'mod':
            return mod(+a,+b)
    }
}

createKey();