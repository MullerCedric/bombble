/* MullerCedric/bombble
 *
 * /src/game-over.js - GameOver screen
 *
 * coded by MullerCedric
 * started at 05/06/2017
 */

class GameOver {
    constructor( width, height ) {
        this.width = width;
        this.height = height;

        this.frames = {
            "panel": {
                "sx": 539,
                "sy": 0,
                "sw": 211,
                "sh": 216,
                "dx": ( width - 211 ) / 2,
                "dy": ( height - 216 ) / 2,
                "dw": 211,
                "dh": 216,
            },
            "button": {
                "sx": 469,
                "sy": 220,
                "sw": 149,
                "sh": 58,
                "dx": ( width - 139 ) / 2,
                "dy": ( height - 216 ) / 2 + 145,
                "dw": 149,
                "dh": 58,
            },
        };
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frames.panel );
        game.drawSpriteFromFrames( this.frames.button );
        game.score.draw( game, "left", ( this.width / 2 ) - 23, ( this.height / 2 ) -3 );
    }
}