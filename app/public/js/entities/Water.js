import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
// import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadWater() {
    return loadSpriteSheet('water')
    .then(createWaterFactory);
}


class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        // if (us.killable.dead) {
        //     return;
        // }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                them.killable.kill();
                us.pendulumMove.speed = 0;
            } else  {
                them.killable.kill();
            }
        }
    }
}


function createWaterFactory(sprite) {
    const walkAnim = sprite.animations.get('splash');

    function routeAnim(water) {
        if (water.killable.dead) {
            return 'water-1';
        }

        return walkAnim(water.lifetime);
    }

    function drawWater(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createWater() {
        const water = new Entity();
        water.size.set(16, 16);

        // ducky.addTrait(new Physics());
        water.addTrait(new Solid());
        water.addTrait(new PendulumMove());
        water.addTrait(new Behavior());
        water.addTrait(new Killable());

        water.draw = drawWater;

        return water;
    };
}
