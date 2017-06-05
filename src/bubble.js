/* MullerCedric/bombble
 *
 * /src/bubble.js - Bubble Class
 *
 * coded by MullerCedric
 * started at 05/06/2017
 */

class Bubble {
    constructor( width, height ) {
        this.frame = {
            "sx": 325,
            "sy": 415,
            "sw": 100,
            "sh": 100,
            "dx": ( width - 100 ) / 2,
            "dy": ( height - 100 ) / 2,
            "dw": 100,
            "dh": 100,
        };
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frame );
    }
}