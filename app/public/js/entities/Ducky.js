import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
// import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadDucky() {
    return loadSpriteSheet('ducky')
    .then(createDuckyFactory);
}


class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y >= us.vel.y) {
                us.killable.kill();
                us.pendulumMove.speed = 0;
            } else  {
                us.killable.kill();
            }
        }
    }
}


function createDuckyFactory(sprite) {
    const walkAnim = sprite.animations.get('quack');

    function routeAnim(ducky) {
        if (ducky.killable.dead) {
            return 'ducky-1';
        }

        return walkAnim(ducky.lifetime);
    }

    function drawDucky(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createDucky() {
        const ducky = new Entity();
        ducky.size.set(16, 16);

        // ducky.addTrait(new Physics());
        ducky.addTrait(new Solid());
        ducky.addTrait(new PendulumMove());
        ducky.addTrait(new Behavior());
        ducky.addTrait(new Killable());

        ducky.draw = drawDucky;

        return ducky;
    };
}
