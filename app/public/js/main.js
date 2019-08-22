import Camera from './Camera.js';
import Entity from './Entity.js';

import Keyboard from './KeyboardState.js';
import PlayerController from './traits/PlayerController.js';
import Timer from './Timer.js';
import {
    createLevelLoader
} from './loaders/level.js';
import {
    loadFont
} from './loaders/font.js';
import {
    loadEntities
} from './entities.js';
import {
    setupKeyboard
} from './input.js';
import {
    createCollisionLayer
} from './layers/collision.js';
import {
    createDashboardLayer
} from './layers/dashboard.js';

function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

//background animation
const bg = document.getElementById('bg');
const back = bg.getContext('2d');


var img = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

img.src = "/img/back.png";
var CanvasXSize = 1600;
var CanvasYSize = 800;
var speed = 60; // lower is faster
var scale = 4.5

var y = -4.5; // vertical offset

// Main program

var dx = 0.75;
var imgW;
var imgH;
var x = 0;
var clearX;
var clearY;
var ctx;

img.onload = function() {
    imgW = img.width * scale;
    imgH = img.height * scale;
    
    if (imgW > CanvasXSize) {
        // image larger than canvas
        x = CanvasXSize - imgW;
    }
    if (imgW > CanvasXSize) {
        // image width larger than canvas
        clearX = imgW;
    } else {
        clearX = CanvasXSize;
    }
    if (imgH > CanvasYSize) {
        // image height larger than canvas
        clearY = imgH;
    } else {
        clearY = CanvasYSize;
    }
    
    // get canvas context
    ctx = document.getElementById('bg').getContext('2d');
 
    // set refresh rate
    return setInterval(draw, speed);
}

function draw() {
    ctx.clearRect(0, 0, clearX, clearY); // clear the canvas
    
    // if image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        // reset, start from beginning
        if (x > CanvasXSize) {
            x = -imgW + x;
        }
        // draw additional image1
        if (x > 0) {
            ctx.drawImage(img, -imgW + x, y, imgW, imgH);
        }
        // draw additional image2
        if (x - imgW > 0) {
            ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        }
    }

    // image is > Canvas Size
    else {
        // reset, start from beginning
        if (x > (CanvasXSize)) {
            x = CanvasXSize - imgW;
        }
        // draw aditional image
        if (x > (CanvasXSize-imgW)) {
            ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
        }
    }
    // draw image
    ctx.drawImage(img, x, y,imgW, imgH);
    // amount to move
    x += dx;
}

//audio
var audio = new Audio('/sound/land.mp3');


//make Title screen
function titleScreen() {

    window.addEventListener("keydown", event => {
        if (event.key == "Enter") {
            main(canvas)
            audio.play();

        }
    }, {
        once: true
    });


}
//make Gameover Screen


async function main(canvas) {
    const context = canvas.getContext('2d');

    const [entityFactory, font] = await Promise.all([
        loadEntities(),
        loadFont(),
    ]);

    const loadLevel = await createLevelLoader(entityFactory);

    const level = await loadLevel('1-1');

    const camera = new Camera();

    const penguin = entityFactory.penguin();

    const playerEnv = createPlayerEnv(penguin);
    level.entities.add(playerEnv);


    level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(createDashboardLayer(font, playerEnv));

    const input = setupKeyboard(penguin);
    input.listenTo(window);

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        camera.pos.x = Math.max(0, penguin.pos.x - 100);

        level.comp.draw(context, camera);
    }

    timer.start();
}

const canvas = document.getElementById('screen');

titleScreen()

// $("#signIn").click(function(){
//     $.ajax({url:"http://localhost:5000/signin", success: function(result){
//       $("#signIn").html(result);
//     }});
//   });