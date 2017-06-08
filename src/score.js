/* MullerCedric/bombble
 *
 * /src/score.js - Score displaying Class
 *
 * coded by MullerCedric
 * started at 08/06/2017
 */

 class Score {
    constructor( width, height ) {
        this.frames = {
            "sx": 757,
            "sw": 13,
            "sh": 17,
            "sy": {
                "0": 0,
                "1": 22,
                "2": 43,
                "3": 65,
                "4": 86,
                "5": 108,
                "6": 128,
                "7": 151,
                "8": 171,
                "9": 193,
            },
        };
    }

    draw( game, align, dx, dy ) {
        let aScoreParts = game.iScore.toString().split( "" ),
            { sx, sy, sw, sh } = this.frames;
        if (align === "right" ) aScoreParts.reverse();
        aScoreParts.forEach( ( sScorePart, iIndex ) => {
        	if( align === "right" ) {
        		dx -= ( this.frames.sw + 2 );
        	} else {
        		dx += ( this.frames.sw + 2 );
        	}

            game.drawSpriteFromFrames( {
                sx,
                "sy": sy[ sScorePart ],
                sw, sh,
                "dx": dx,
                "dy": dy,
                "dw": sw,
                "dh": sh,
            } );
        } );

    }
}