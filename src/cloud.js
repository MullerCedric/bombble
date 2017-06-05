/* MullerCedric/bombble
 *
 * /src/clouds.js - Clouds Class
 *
 * coded by MullerCedric
 * started at 05/06/2017
 */

 class Cloud {
    constructor( width, height ) {
        this.width = width;
        this.height = height;


        this.shapes = [
            {
                "sx": 623,
                "sy": 235,
                "sw": 158,
                "sh": 85,
            },
            {
                "sx": 623,
                "sy": 324,
                "sw": 166,
                "sh": 90,
            },
            {
                "sx": 623,
                "sy": 418,
                "sw": 240,
                "sh": 124,
            },
            {
                "sx": 795,
                "sy": 235,
                "sw": 118,
                "sh": 66,
            },
            {
                "sx": 795,
                "sy": 305,
                "sw": 65,
                "sh": 33,
            },
        ];

        let shape = this.shapes[ Math.floor( Math.random() * this.shapes.length ) ],
        	squale = 0.5 + ( Math.random() / 2 );

        this.frame = {
            "sx": shape.sx,
            "sy": shape.sy,
            "sw": shape.sw,
            "sh": shape.sh,
            "dx": Math.floor( Math.random() * this.width ) - Math.floor( Math.random() * 100 ),
            "dy": Math.floor( Math.random() * this.height ) - Math.floor( Math.random() * 100 ),
            "dw": Math.round( shape.sw * squale ),
            "dh": Math.round( shape.sh * squale ),
        }
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frame );
    }
}