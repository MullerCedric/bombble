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
        this.canvas.addEventListener( "mousedown", this.handleAction.bind( this ) );
        this.canvas.addEventListener( "mouseup", this.handleAction.bind( this ) );
        this.canvas.addEventListener( "mousemove", this.handleAction.bind( this ) );

        this.animate();
    }

    reset() {
        // init game-related properties
        this.started = false;
        this.ended = false;
        this.score = 0;
        this.nbArrows = 1 + Math.floor( this.score / 2 );
        this.nbBombs = Math.floor( this.score / 3 );

        let { width, height } = this,
            nbClouds = 1 + Math.floor( Math.random() * 6 );

        this.background = new Background( width, height );
        this.clouds = [];
        for(var i = 0; i < nbClouds; i++) {
            this.clouds.push( new Cloud( width, height ) );
        }
        this.starting = new Starting( width, height );

        this.bubble = new Bubble( width, height );
        this.arrows = [];
        for(var i = 0; i < this.nbArrows; i++) {
            this.arrows.push( new Arrow( width, height ) );
        }
        this.bombs = [];

        this.gameOver = new GameOver( width, height );
        
    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame( this.animate.bind( this ) );

        // check game state
        if ( this.started ) {
            this.checkState();
        }
        // update elements
        if ( this.started ) {
            if ( this.arrows ) {
                this.arrows.forEach( ( oArrow ) => oArrow.update( this ) );
            }
        }
        // draw
        this.context.clearRect( 0, 0, this.width, this.height );
        this.background.draw( this );
        this.clouds.forEach( ( oCloud ) => oCloud.draw( this ) );
        if ( this.started ) {
            this.bubble.draw( this );
            if ( this.arrows ) {
                this.arrows.forEach( ( oArrow ) => oArrow.draw( this ) );
            }
            if ( this.ended ) {
                this.gameOver.draw( this );
            }
        } else {
            this.starting.draw( this );
        }
    }

    handleAction( oEvent ) {
        let { width, height } = this;
        if ( oEvent.type === "mousemove" ) {
            //&&& Drag & Drop des bombes
        } else if ( oEvent.type === "click" ) {
            if ( this.started ) {
                    console.log( "this.arrows before : " );
                    console.log( this.arrows );
                this.arrows.forEach( ( oArrow, iIndex ) => {
                    if( oArrow.handleAction( this, oEvent ) ) { 
                        console.log( "this.arrows after : " );
                        this.arrows[ iIndex ] = null;
                        delete this.arrows[ iIndex ];
                        this.arrows.slice( iIndex, 1 );
                        console.log( this.arrows );
                    } 
                }, this );
                while( this.nbArrows < 1 + Math.floor( this.score / 2 ) ) {
                    this.arrows.push( new Arrow( width, height ) );
                    this.nbArrows++;
                }
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
    }

    checkState() {
        let { width, height } = this;
        
        //&&& Collisions

        //&&& Score

            //&&& Création de flèches/bombes (quand le score change)
    }

    over() {
        this.ended = true;

        window.cancelAnimationFrame( this.animationRequestId );
        
    }

    drawSpriteFromFrames( { sx, sy, sw, sh, dx, dy, dw, dh } ) {
        this.context.drawImage( this.sprites, sx, sy, sw, sh, dx, dy, dw, dh );
    }
}