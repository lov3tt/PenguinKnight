import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
// import PendulumMove from '../traits/PendulumMove.js';
// import Physics from '../traits/Physics.js';
// import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders.js';
import PlayerController from '../traits/PlayerController.js';

export function loadExit() {
    return loadSpriteSheet('exit')
    .then(createExitFactory);
}


class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides() {
        gameWon();
    }
}



function gameWon(hiScore){
    // let playerScore = new PlayerController();
    // this.player= entity;
    // playerScore.setPlayer(hiScore);
    // console.log("Player Score" + player.score
    //  +"Player life:" + playerScore.life)
    if (confirm("You Win!")) {
        document.location.reload();
      } else {
        document.location.reload();
      }

}

function submitScore() {

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

        // exit.addTrait(new Solid());
        // exit.addTrait(new PendulumMove());
        exit.addTrait(new Behavior());
        exit.addTrait(new Killable());
 

        exit.draw = drawExit;

        return exit;
    };
}
