/* MullerCedric/bombble
 *
 * /src/arrow.js - Arrow Class
 *
 * coded by MullerCedric
 * started at 05/06/2017
 */

 class Arrow {
    constructor( width, height ) {
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

        this.width = width;
        this.height = height;

        this.frame = {
            "sx": 858,
            "sy": 59,
            "sw": 52,
            "sh": 20,
            "dx": dx,
            "dy": dy,
            "dw": 52,
            "dh": 20,
        };

        this.speed = 0.4;
        this.speedX = this.speed * ( ( ( this.width / 2 ) - this.frame.dx ) / 100 );
        this.speedY = this.speed * ( ( ( this.height / 2 ) - this.frame.dy ) / 100 );
        //this.rotate = Math.atan( ( height / 2 - this.frame.dy ) / ( width / 2 - this.frame.dx ) ); atan was only working when dx > width/2
        this.rotate = Math.atan2( ( height / 2 - this.frame.dy ), ( width / 2 - this.frame.dx ) );
    }

    draw( game ) {
    	let { sx, sy, sw, sh, dx, dy, dw, dh } = this.frame;

        game.context.fillStyle = "yellow";
        game.context.fillRect( dx, dy, dw, dw );
    	game.context.save();
        // game.context.translate( dx, dy );
        game.context.translate( ( dx + ( dw / 2 ) ), ( dy + ( dh / 2 ) ) );
        game.context.rotate( this.rotate );
        game.drawSpriteFromFrames( {
            sx, sy, sw, sh,
            "dx": dw / 2 * -1,
            "dy": dh / 2 * -1,
            dw, dh,
        } );

        game.context.restore();
    }

    update( game ) { //&&& ajouter destructuring
    	if ( this.frame.dx > this.width / 2 - game.bubble.frame.dw / 2 && this.frame.dx < this.width / 2 + game.bubble.frame.dw / 2 ) {
    		if ( this.frame.dy > this.height / 2 - game.bubble.frame.dh / 2 && this.frame.dy < this.height / 2 + game.bubble.frame.dh / 2 ) {
    			//&&& À déplacer. Gère la collision avec la bulle (rectangle)
    			return;
    		}
    	}

    	this.frame.dx += this.speedX;
    	this.frame.dy += this.speedY;
    }

    handleAction( game, oEvent ) {
        let { pageX, pageY } = oEvent,
            { offsetLeft, offsetTop } = game.canvas,
            { dx, dy, dw } = this.frame;
    	if ( ( pageX - offsetLeft ) > dx && ( pageX - offsetLeft ) < dx + dw ) {
            if ( ( pageY - offsetTop ) > dy && ( pageY - offsetTop ) < dy + dw ) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}