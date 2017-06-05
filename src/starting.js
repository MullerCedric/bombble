/* MullerCedric/bombble
 *
 * /src/starting.js - Starting Screen
 *
 * coded by MullerCedric
 * started at 05/06/2017
 */

class Starting {
    constructor( width, height ) {
        this.frames = {
            "panel": {
                "sx": 325,
                "sy": 0,
                "sw": 210,
                "sh": 216,
                "dx": ( width - 210 ) / 2,
                "dy": ( height - 216 ) / 2,
                "dw": 210,
                "dh": 216,
            },
            "button": {
                "sx": 325,
                "sy": 220,
                "sw": 139,
                "sh": 58,
                "dx": ( width - 139 ) / 2,
                "dy": ( height - 216 ) / 2 + 145,
                "dw": 139,
                "dh": 58,
            },
        };
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frames.panel );
        game.drawSpriteFromFrames( this.frames.button );
    }
}