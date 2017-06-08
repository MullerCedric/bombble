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
        // To set the arrow outside the canvas. It's kinda messy but I didn't had the time to think about a more clean way to do it
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

        this.center = {
            "x": this.frame.dx + this.frame.dw / 2,
            "y": this.frame.dy + this.frame.dh / 2,
        }

        this.speed = {
            "base": 0.4,
            "x": ( ( width / 2 ) - this.frame.dx ) / 100,
            "y": ( ( height / 2 ) - this.frame.dy ) / 100,
        }
        this.speed.x *= this.speed.base;
        this.speed.y *= this.speed.base;

        this.rotate = Math.atan2( ( height / 2 - this.frame.dy ), ( width / 2 - this.frame.dx ) );
    }

    draw( game ) {
    	let { sx, sy, sw, sh, dx, dy, dw, dh } = this.frame;

    	game.context.save();
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

    update( game ) {
        let { "dw": bW, "dh": bH } = game.bubble.frame;
        this.center.x = this.frame.dx + this.frame.dw / 2;
        this.center.y = this.frame.dy + this.frame.dh / 2;

    	if ( this.center.x > this.width / 2 - bW / 2 && this.center.x < this.width / 2 + bW / 2 ) {
    		if ( this.center.y > this.height / 2 - bH / 2 && this.center.y < this.height / 2 + bH / 2 ) {
                game.over();
    			return;
    		}
    	}

    	this.frame.dx += this.speed.x;
    	this.frame.dy += this.speed.y;
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