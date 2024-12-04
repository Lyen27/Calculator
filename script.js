"use strict"
const buttons = document.querySelector('.buttons')
const text = ['x²','√','Pi','+','-','x','÷','mod','%','3','6','9',')','.','2','5','8','(','0','1','4','7','C']

function createKey () {
    for (let i = 1; i <= 23; i++) {
        const key = document.createElement('button');
        key.classList.add('keys');
        buttons.appendChild(key);
    }
    const list = document.querySelectorAll('.keys')
    list.forEach((item,index) => {
        item.textContent = text[index];
    })
}

createKey();