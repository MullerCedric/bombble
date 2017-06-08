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
        this.nbArrows = 3;
        this.nbBombs = 1;

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
        for(var i = 0; i < this.nbBombs; i++) {
            this.bombs.push( new Bomb( width, height ) );
        }

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
            this.arrows.forEach( ( oArrow ) => oArrow.update( this ), this );
            this.bombs.forEach( ( oBomb ) => oBomb.update( this ), this );
        }
        // draw
        this.context.clearRect( 0, 0, this.width, this.height );
        this.background.draw( this );
        this.clouds.forEach( ( oCloud ) => oCloud.draw( this ) );
        if ( this.started ) {
            this.bubble.draw( this );
            this.arrows.forEach( ( oArrow ) => oArrow.draw( this ), this );
            this.bombs.forEach( ( oBomb ) => oBomb.draw( this ), this );
            if ( this.ended ) {
                this.gameOver.draw( this );
            }
        } else {
            this.starting.draw( this );
        }
    }

    handleAction( oEvent ) {
        let { width, height } = this;
        if ( oEvent.type === "mousedown" ) {
            //&&& Bombs Drag & Drop
            this.bombs.forEach( ( oBomb ) => oBomb.mouseDown( this, oEvent ), this );
        } else if ( oEvent.type === "mousemove" ) {
            //&&& Bombs Drag & Drop
            this.bombs.forEach( ( oBomb ) => oBomb.mouseMove( this, oEvent ), this );
        } else if ( oEvent.type === "mouseup" ) {
            //&&& Bombs Drag & Drop
            this.bombs.forEach( ( oBomb ) => oBomb.mouseUp( this, oEvent ), this );
        } else if ( oEvent.type === "click" ) {
            if ( this.started ) {
                this.arrows.forEach( ( oArrow, iIndex ) => {

                    //Deleting the arrow if it is clicked, and adding score
                    if( oArrow.handleAction( this, oEvent ) ) {
                        this.arrows[ iIndex ] = null;
                        this.arrows.splice( iIndex, 1 );
                    }
                }, this );

                //When there is a click on a started game, we check if it is necessery to add new arrows/bombs (depending on the score)
                while( this.nbArrows < 3 + Math.floor( this.score / 20 ) ) {
                    this.arrows.push( new Arrow( width, height ) );
                    this.nbArrows++;
                }
                while( this.nbBombs < 1 + Math.floor( this.score / 20 ) ) {
                    this.bombs.push( new Bomb( width, height ) );
                    this.nbBombs++;
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
        
        this.bombs.forEach( ( oBomb, iIndex ) => {

            if( oBomb.hasBlownUp ) {
                this.bombs[ iIndex ] = null;
                this.bombs.splice( iIndex, 1 );
                game.nbBombs--;
            }

        }, this );

    }

    over() {
        alert( "PERDU !!!!" );
        this.ended = true;

        window.cancelAnimationFrame( this.animationRequestId );
        
    }

    drawSpriteFromFrames( { sx, sy, sw, sh, dx, dy, dw, dh } ) {
        this.context.drawImage( this.sprites, sx, sy, sw, sh, dx, dy, dw, dh );
    }
}