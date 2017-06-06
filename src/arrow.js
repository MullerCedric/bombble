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
            "sy": 63,
            "sw": 52,
            "sh": 20,
            "dx": Math.random() * width,
            "dy": Math.random() * height,
            "dw": 52,
            "dh": 20,
        };

        this.speed = 1;
        this.speedX = this.speed * Math.floor( ( ( this.width / 2 ) - this.frame.dx ) / 100 );
        this.speedY = this.speed * Math.floor( ( ( this.height / 2 ) - this.frame.dy ) / 100 );
        this.rotate = Math.atan( ( this.frame.dy + height / 2 ) / ( width / 2 - this.frame.dx ) );
    }

    draw( game ) {
    	let { sx, sy, sw, sh, dx, dy, dw, dh } = this.frame;

        game.context.fillStyle = "yellow";
        game.context.fillRect( dx, dy, dw, dh );
    	game.context.save();
        game.context.translate( dx, dy );
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

    	//&&& À décommenter. Est correct et déplace la flèche vers la bulle
    	/*this.frame.dx += this.speedX;
    	this.frame.dy += this.speedY;*/
    }

    handleAction( game, oEvent ) {
        //console.warn( index );
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