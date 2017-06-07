/* MullerCedric/bombble
 *
 * /src/arrow.js - Arrow Class
 *
 * coded by MullerCedric
 * started at 05/06/2017
 */

 class Arrow {
    constructor( width, height ) {
        this.width = width;
        this.height = height;

        this.frame = {
            "sx": 858,
            "sy": 59,
            "sw": 52,
            "sh": 20,
            "dx": Math.floor( Math.random() * width ),
            "dy": Math.floor( Math.random() * height ),
            "dw": 52,
            "dh": 20,
        };

        this.speed = 0.8;
        this.speedX = this.speed * ( ( ( this.width / 2 ) - this.frame.dx ) / 100 );
        this.speedY = this.speed * ( ( ( this.height / 2 ) - this.frame.dy ) / 100 );
        //this.rotate = Math.atan( ( height / 2 - this.frame.dy ) / ( width / 2 - this.frame.dx ) ); atan was only working when dx > width/2
        this.rotate = Math.atan2( ( height / 2 - this.frame.dy ), ( width / 2 - this.frame.dx ) );
    }

    draw( game ) {
    	let { sx, sy, sw, sh, dx, dy, dw, dh } = this.frame;

        game.context.fillStyle = "yellow";
        game.context.fillRect( dx, dy, dw, dh );
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
    	if ( ( oEvent.pageX - game.canvas.offsetLeft ) > this.frame.dx && ( oEvent.pageX - game.canvas.offsetLeft ) < this.frame.dx + this.frame.dw ) {
            if ( ( oEvent.pageY - game.canvas.offsetTop ) > this.frame.dy && ( oEvent.pageY - game.canvas.offsetTop ) < this.frame.dy + this.frame.dh ) {
                game.score++;

                game.nbArrows--;

                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}