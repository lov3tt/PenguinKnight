import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Stomper from '../traits/Stomper.js';
import {loadSpriteSheet} from '../loaders.js';

const SLOW_DRAG = 1/1000;
const FAST_DRAG = 1/5000;

export function loadPenguin() {
    return loadSpriteSheet('penguin')
    .then(createPenguinFactory);
}

function createPenguinFactory(sprite) {
    const runAnim = sprite.animations.get('run');

    function routeFrame(penguin) {
        if (penguin.jump.falling) {
            return 'jump';
        }

        if (penguin.go.distance > 0) {
            if ((penguin.vel.x > 0 && penguin.go.dir < 0) || (penguin.vel.x < 0 && penguin.go.dir > 0)) {
                return 'break';
            }

            return runAnim(penguin.go.distance);
        }

        return 'idle';
    }

    function setTurboState(turboOn) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    function drawPenguin(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createPenguin() {
        const penguin = new Entity();
        penguin.size.set(14, 16);

        penguin.addTrait(new Physics());
        penguin.addTrait(new Solid());
        penguin.addTrait(new Go());
        penguin.addTrait(new Jump());
        penguin.addTrait(new Killable());
        penguin.addTrait(new Stomper());

        penguin.killable.removeAfter = 0;

        penguin.turbo = setTurboState;
        penguin.draw = drawPenguin;

        penguin.turbo(false);

        return penguin;
    }
}
