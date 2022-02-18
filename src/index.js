import './css/style.css';

const content = document.querySelector('#content');

const para = document.createElement('p');

para.textContent = 'Hello';

content.appendChild(para);
