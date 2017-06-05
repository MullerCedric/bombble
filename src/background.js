/* MullerCedric/bombble
 *
 * /src/background.js - Background Class
 *
 * coded by MullerCedric
 * started at 05/06/2017
 */

 class Background {
    constructor( width, height ) {
        this.frame = {
            "sx": 0,
            "sy": 0,
            "sw": 320,
            "sh": 568,
            "dx": 0,
            "dy": 0,
            "dw": width,
            "dh": height,
        };
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frame );
    }
}