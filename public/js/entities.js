import {loadMario} from './entities/Mario.js';
import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';
import {loadDucky} from './entities/Ducky.js';
import {loadWater} from './entities/Water.js';


export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }


    return Promise.all([
        loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa')),
        loadDucky().then(addAs('ducky')),
        loadWater().then(addAs('water')),
    ])
    .then(() => entityFactories);
}