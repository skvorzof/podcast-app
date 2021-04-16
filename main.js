import './style.css';

const app = document.querySelector('#app');

import { player, playerContainer } from './player';

app.innerHTML = playerContainer;

player();
