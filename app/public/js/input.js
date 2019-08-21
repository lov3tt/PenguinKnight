import Keyboard from './KeyboardState.js';

export function setupKeyboard(penguin) {
    const input = new Keyboard();

    input.addMapping('Space', keyState => {
        if (keyState) {
            penguin.jump.start();
        } else {
            penguin.jump.cancel();
        }
    });

    input.addMapping('ShiftLeft', keyState => {
        penguin.turbo(keyState);
    });

    input.addMapping('ArrowRight', keyState => {
        penguin.go.dir += keyState ? 1 : -1;
    });

    input.addMapping('ArrowLeft', keyState => {
        penguin.go.dir += keyState ? -1 : 1;
    });


    
    
    return input;

};