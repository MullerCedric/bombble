/* MullerCedric/bombble
 *
 * /bombble.js - Bombble main class
 *
 * coded by MullerCedric
 * started at 05/06/2017
 */

const SPRITESHEET_PATH = "./resources/spritesheet.png";

class Bombble {
    constructor( { canvas, context, width, height } ) {
        // init canvas-related properties
        this.canvas = canvas;
        this.context = context;
        this.width = width;
        this.height = height;
        this.animationRequestId = null;

        // load spritesheet
        this.sprites = new Image();
        this.sprites.addEventListener( "load", () => {
            this.setup();
        } );
        this.sprites.src = SPRITESHEET_PATH;
    }

    setup() {
        this.reset();

        this.canvas.addEventListener( "click", this.handleAction.bind( this ) );

        this.animate();
    }

    reset() {
        let { width, height } = this,
        nbClouds = 1 + Math.floor( Math.random() * 6 );

        this.background = new Background( width, height );
        this.clouds = [];
        for(var i = 0; i < nbClouds; i++) {
            this.clouds.push( new Cloud( width, height ) );
        }
        this.starting = new Starting( width, height );
        this.bubble = new Bubble( width, height );
        this.gameOver = new GameOver( width, height );

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.score = 0;
    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame( this.animate.bind( this ) );

        // check game state
        if ( this.started ) {
            //this.checkState();
        }
        // update elements
        if ( this.started ) {

        }
        // draw
        this.context.clearRect( 0, 0, this.width, this.height );
        this.background.draw( this );
        this.clouds.forEach( ( oCloud ) => oCloud.draw( this ) );
        if ( this.started ) {
            this.bubble.draw( this );
            if ( this.ended ) {
                this.gameOver.draw( this );
            }
        } else {
            this.starting.draw( this );
        }
    }

    handleAction( oEvent ) {
        if ( this.started ) {
            //this.bird.handleAction();
        } else {
            this.started = true;
        }

        if ( this.ended ) {
            if ( window.confirm( "Voulez-vous rejouer ?" ) ) {
                this.reset();
                this.animate();
            }
        }
    }

    checkState() {
        // Collisions
    }

    over() {
        this.ended = true;

        window.cancelAnimationFrame( this.animationRequestId );
        
    }

    drawSpriteFromFrames( { sx, sy, sw, sh, dx, dy, dw, dh } ) {
        this.context.drawImage( this.sprites, sx, sy, sw, sh, dx, dy, dw, dh );
    }
}