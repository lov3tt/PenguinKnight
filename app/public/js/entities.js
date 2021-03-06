import {loadPenguin} from './entities/Penguin.js';
import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';
import {loadDucky} from './entities/Ducky.js';
import {loadWater} from './entities/Water.js';
import {loadExit} from './entities/Exit.js';


export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }


    return Promise.all([
        loadPenguin().then(addAs('penguin')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa')),
        loadDucky().then(addAs('ducky')),
        loadWater().then(addAs('water')),
        loadExit().then(addAs('exit')),
    ])
    .then(() => entityFactories);
}