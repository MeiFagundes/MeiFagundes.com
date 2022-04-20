class MovementController{

    constructor(player, cursors, velocity){

        this._player = player;
        this._cursors = cursors;
        this._velocity = velocity;
        
        console.log(this._cursors);
    }

    update() {

        if (this._cursors.right.isDown && !this._cursors.left.isDown)
            this.goRight();

        if (this._cursors.left.isDown && !this._cursors.right.isDown)
            this.goLeft();

        if (this._cursors.down.isDown && !this._cursors.up.isDown)
            this.goDown();

        if (this._cursors.up.isDown && !this._cursors.down.isDown)
            this.goUp();

        if (!this._cursors.left.isDown && !this._cursors.right.isDown)
            this.stopXMovement();
    
        if (!this._cursors.down.isDown && !this._cursors.up.isDown)
            this.stopYMovement();

        if (!this._cursors.down.isDown && !this._cursors.up.isDown && !this._cursors.left.isDown && !this._cursors.right.isDown)
            this.stopMovement();
    }

    goRight(){

        this._player.setVelocityX(this._velocity);
        this._player.anims.play('moving-right', true);
        this._player.flipX = true;
    }

    goLeft(){

        this._player.setVelocityX(-this._velocity);
        this._player.anims.play('moving-left', true);
        this._player.flipX = false;
    }

    goDown(){

        this._player.setVelocityY(this._velocity);
        this._player.anims.play('moving-front', true);
    }

    goUp(){

        this._player.setVelocityY(-this._velocity);
        this._player.anims.play('moving-back', true);
    }

    stopXMovement(){
        
        this._player.anims.pause();
        this._player.setVelocityX(0);
    }

    stopYMovement(){

        this._player.anims.pause();
        this._player.setVelocityY(0);
    }

    stopMovement(){
        this._player.anims.play('front', true);
    }

}