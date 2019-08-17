import {Trait} from '../Entity.js';
import {Vec2} from '../math.js';

export default class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.checkpoint = new Vec2(0, 0);
        this.player = null;
        this.score = 0;
        this.time = 300;
        this.coins = 0;
        this.life = 4;
    }

    setPlayer(entity) {
        this.player = entity;

        this.player.stomper.onStomp = () => {
            this.score += 100;
            this.coins += 1;
        }
        

        // this.player.collide.onCollide = () => {
        //     this.score += 100;
        //     this.coins += 1;
        // }
    }

    update(entity, deltaTime, level) {
        if (!level.entities.has(this.player)) {
            this.player.killable.revive();
            this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
            level.entities.add(this.player);
            this.life--;
        } 
       
        if (this.life < 0 || this.time < 0) {
            alert("Game Over")
        }

        else {
            this.time -= deltaTime * 2;
        }
        // if (life < 0 || time < 0) {
        //     gameover()
        // }

    }
}
