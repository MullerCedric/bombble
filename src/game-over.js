/* MullerCedric/bombble
 *
 * /src/game-over.js - GameOver screen
 *
 * coded by MullerCedric
 * started at 05/06/2017
 */

class GameOver {
    constructor( width, height ) {
        this.frames = {
            "title": {
                "sx": 784,
                "sy": 114,
                "sw": 204,
                "sh": 56,
                "dx": ( width - 204 ) / 2,
                "dy": 75,
                "dw": 204,
                "dh": 56,
            },
            "modal": {
                "sx": 0,
                "sy": 516,
                "sw": 238,
                "sh": 126,
                "dx": ( width - 238 ) / 2,
                "dy": 150,
                "dw": 238,
                "dh": 126,
            },
            "cyphers": {
                "sx": 276,
                "sw": 12,
                "sh": 14,
                "sy": {
                    "0": 646,
                    "1": 664,
                    "2": 698,
                    "3": 716,
                    "4": 750,
                    "5": 768,
                    "6": 802,
                    "7": 820,
                    "8": 854,
                    "9": 872,
                },
            },
            "medal": {
                "sx": 242,
                "sy": 564,
                "sw": 44,
                "sh": 44,
                "dx": 0,
                "dy": 0,
                "dw": 44,
                "dh": 44,
            },
        };
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frames.title );
        game.drawSpriteFromFrames( this.frames.modal );

        this.drawScore( game, game.score, false );
    }

    drawScore( game, iScore, bBestScore = false ) {
        let aScoreParts = `${ iScore }`.split( "" ).reverse(),
            { sx, sy, sw, sh } = this.frames.cyphers;

        aScoreParts.forEach( ( sScorePart, iIndex ) => {
            let dx = ( game.width / 2 ) + 91 - sw;

            game.drawSpriteFromFrames( {
                sx,
                "sy": sy[ sScorePart ],
                sw, sh,
                "dx": dx - ( iIndex * ( sw + 2 ) ),
                "dy": this.frames.modal.dy + ( bBestScore ? 73 : 39 ),
                "dw": sw,
                "dh": sh,
            } );
        } );
    }
}