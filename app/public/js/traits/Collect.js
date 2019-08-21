import {Sides, Trait} from '../Entity.js';

export default class Collect extends Trait {
    constructor() {
        super('collect');
        

        this.onCollect = function() {
        }
    }



    collides(us, them) {
        if (!them.killable || them.killable.dead) {
            return;
        }

        if (us.vel.y > them.vel.y) {
            this.onCollect(us, them);
        }
    }
}
