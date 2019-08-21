import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
// import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadExit() {
    return loadSpriteSheet('exit')
    .then(createExitFactory);
}


class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        gameWon();
        // if (us.killable.dead) {
        //     return;
        // }

        // if (them.stomper) {
        //     if (them.vel.y > us.vel.y) {
        //         them.killable.kill();
        //         us.pendulumMove.speed = 0;
        //     } else  {
        //         them.killable.kill();
        //     }
        // }
    }
}



function gameWon(){
    // instance.open();
    alert("Game Won")
    // $('myModal').modal('show')
    document.location.reload();
    clearInterval(interval); 
}





function createExitFactory(sprite) {
    const walkAnim = sprite.animations.get('exit');

    function routeAnim(exit) {
        if (exit.killable.dead) {
            return 'exit-1';
        }

        return walkAnim(exit.lifetime);
    }

    function drawExit(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createExit() {
        const exit = new Entity();
        exit.size.set(16, 16);

        // ducky.addTrait(new Physics());
        exit.addTrait(new Solid());
        exit.addTrait(new PendulumMove());
        exit.addTrait(new Behavior());
        exit.addTrait(new Killable());

        exit.draw = drawExit;

        return exit;
    };
}
