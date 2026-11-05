import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Game } from './game/game';
import { Shop } from './shop/shop';
import { Devlog } from './devlog/devlog';
import { Wiki } from './wiki/wiki';


export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'game', component: Game},
    {path: 'merch', component: Shop},
    {path: 'devlog', component: Devlog},
    {path: 'wiki', component: Wiki},
];
