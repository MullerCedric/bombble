/* MullerCedric/bombble
 *
 * /src/bomb.js - Bomb Class
 *
 * coded by MullerCedric
 * started at 05/06/2017
 */

class Bomb {
    constructor( width, height ) {
        this.width = width;
        this.height = height;

        //&&& if enough time : bomb with gravity comming from below
        let dx = Math.random() * width,
            dy = Math.random() * height;
        if ( dx > width / 1.5 ) {
            dx += ( width / 1.5 );
        } else {
            dx -= ( width / 1.5 );
        }
        if ( dy > height / 1.5 ) {
            dy += ( height / 1.5 );
        } else {
            dy -= ( height / 1.5 );
        }

        this.frames = [
            {
                "sx": 782,
                "sy": 0,
                "sw": 60,
                "sh": 45,
            },
            {
                "sx": 782,
                "sy": 60,
                "sw": 54,
                "sh": 45,
            },
            {
                "sx": 782,
                "sy": 119,
                "sw": 58,
                "sh": 46,
            },
            {
                "sx": 782,
                "sy": 180,
                "sw": 46,
                "sh": 48,
            },
            {
                "sx": 858,
                "sy": 0,
                "sw": 50,
                "sh": 51,
            },
        ];
        
        this.animation = {
            "max": this.frames.length,
            "current": 0,
        };

        this.destinationFrame = {
            "dx": dx,
            "dy": dy,
            "dw": this.frames[ this.animation.current ].sw,
            "dh": this.frames[ this.animation.current ].sh,
        };

        this.center = {
            "x": this.destinationFrame.dx + this.destinationFrame.dw / 2,
            "y": this.destinationFrame.dy + this.destinationFrame.dh / 2,
        }
        this.dragged = false; // The bomb has been dragged and therefore doesn't move anymore
        this.focused = false; // The bomb is being dragged

        this.speed = {
            "base": 0.3,
            "x": ( ( width / 2 ) - this.destinationFrame.dx ) / 100,
            "y": ( ( height / 2 ) - this.destinationFrame.dy ) / 100,
            "both": 0,
        }
        this.speed.x *= this.speed.base;
        this.speed.y *= this.speed.base;
        this.speed.both = this.getHypotenuseLength( this.speed.x, this.speed.y );

        this.currentAnimFrame = 0;

        this.distance = this.getDistance( dx, dy, width / 2,  height / 2 );

        this.hasBlownUp = false;
    }

    getHypotenuseLength( AB, AC ) {
        return Math.sqrt( Math.pow( AB, 2 ) + Math.pow( AC, 2 ) );
    }

    getDistance( xA, yA, xB, yB ) {
        return this.getHypotenuseLength( ( xB - xA ), ( yB - yA ) );
    }

    isTouching( objRadius, objCenterX, objCenterY ) {
        let distX, distY, R1, R2, squaredist;
        distX = this.center.x - objCenterX;
        distY = this.center.y - objCenterY;
        squaredist = Math.pow( distX, 2 ) + Math.pow( distY, 2 );
        R1 = this.destinationFrame.dw / 2;
        R2 = objRadius;

        return squaredist <= Math.pow( R1 + R2, 2 );
    }

    draw( game ) {
        let { sx, sy, sw, sh } = this.frames[ this.animation.current ],
            { dx, dy, dw, dh } = this.destinationFrame;
        game.drawSpriteFromFrames( { sx, sy, sw, sh, dx, dy, dw, dh } );
    }

    update( game ) {
        let delay = 95;
        /* Animation */
        this.currentAnimFrame++;
        if ( this.animation.current != this.animation.max - 1 ) {

            this.animation.current = Math.ceil( ( this.currentAnimFrame / ( ( ( this.distance / this.speed.both ) + delay ) / ( this.animation.max - 1 ) ) ) -1 );

            this.destinationFrame.dw = this.frames[ this.animation.current ].sw;
            this.destinationFrame.dh = this.frames[ this.animation.current ].sh;
        }

        /* Explosion */
        this.center.x = this.destinationFrame.dx + this.destinationFrame.dw / 2;
        this.center.y = this.destinationFrame.dy + this.destinationFrame.dh / 2;
        if ( this.animation.current === this.animation.max -1 ) {
            if (!this.hasBlownUp ) {
                if ( this.isTouching( game.bubble.frame.dh / 2, game.bubble.frame.dx + game.bubble.frame.dw / 2, game.bubble.frame.dy + game.bubble.frame.dh / 2 ) ) {

                    this.hasBlownUp = true;
                    game.over();
                }
            }
        }
        if ( Math.ceil( ( this.currentAnimFrame / ( ( ( this.distance / this.speed.both ) + delay ) / ( this.animation.max - 1 ) ) ) -1 ) === this.animation.max ) {
            this.hasBlownUp = true;
        }

        /* Movement */
        if ( this.center.x > this.width / 2 - 38 / 2 && this.center.x < this.width / 2 + 38 / 2 ) {
            if ( this.center.y > this.height / 2 - 38 / 2 && this.center.y < this.height / 2 + 3 / 2 ) {
                return;
                //The bomb will stop moving if its center enters a 38px wide square zone in the center of the canvas
            }
        }
        if ( this.dragged ) return;
        this.destinationFrame.dx += this.speed.x;
        this.destinationFrame.dy += this.speed.y;
    }

    mouseDown( game, oEvent ) {
        let { pageX, pageY } = oEvent,
            { offsetLeft, offsetTop } = game.canvas;
        if ( this.animation.current === this.animation.max - 1 ) return;

        if ( ( pageX - offsetLeft ) > this.destinationFrame.dx && ( pageX - offsetLeft ) < this.destinationFrame.dx + this.destinationFrame.dw ) {
            if ( ( pageY - offsetTop ) > this.destinationFrame.dy && ( pageY - offsetTop ) < this.destinationFrame.dy + this.destinationFrame.dw ) {
                
                this.dragged = true;
                this.focused = true;
                this.destinationFrame.dx = pageX - offsetLeft;
                this.destinationFrame.dy = pageY - offsetTop;
            }
        }
    }

    mouseMove( game, oEvent ) {
        let { pageX, pageY } = oEvent,
            { offsetLeft, offsetTop } = game.canvas;
        if ( this.animation.current === this.animation.max - 1 ) return;

        if ( this.focused ) {
            this.destinationFrame.dx = pageX - offsetLeft;
            this.destinationFrame.dy = pageY - offsetTop;
        }
    }

    mouseUp( game, oEvent ) {
        let { pageX, pageY } = oEvent,
            { offsetLeft, offsetTop } = game.canvas,
            { dx, dy, dw } = this.destinationFrame;

        this.focused = false;
    }
}