class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        this._scene = scene;
        this._scene.add.existing(this);
        this._scene.physics.add.existing(this);
        this.setAnimations(texture);
    }

    setAnimations(texture){

        this._scene.anims.create({
            key: 'left',
            frames: [ { key: texture, frame: 2 } ]
        });
    
        this._scene.anims.create({
            key: 'front',
            frames: [ { key: texture, frame: 0 } ]
        });
    
        this._scene.anims.create({
            key: 'back',
            frames: [ { key: texture, frame: 1 } ]
        });
    
        this._scene.anims.create({
            key: 'right',
            frames: [{ key: texture, frame: 2 } ]
        });
    
        this._scene.anims.create({
            key: 'moving-left',
            frames: [ { key: texture, frame: 7 }, { key: texture, frame: 2 }, { key: texture, frame: 8 }, { key: texture, frame: 2 } ],
            frameRate: 8
        });
    
        this._scene.anims.create({
            key: 'moving-front',
            frames: [ { key: texture, frame: 3 }, { key: texture, frame: 0 }, { key: texture, frame: 4 }, { key: texture, frame: 0 } ],
            frameRate: 8
        });
    
        this._scene.anims.create({
            key: 'moving-back',
            frames: [ { key: texture, frame: 5 }, { key: texture, frame: 1 }, { key: texture, frame: 6 }, { key: texture, frame: 1 } ],
            frameRate: 8
        });
    
        this._scene.anims.create({
            key: 'moving-right',
            frames: [{ key: texture, frame: 7 }, { key: texture, frame: 2 }, { key: texture, frame: 8 }, { key: texture, frame: 2 } ],
            frameRate: 8
        });
    }

    displayProximityMessage(group) {
        let responses = new Map([
            ['resource-stand-1', 'Centro de recursos 1!'],
            ['resource-stand-2', 'Centro de recursos 2!']
        ]);
    
        let closeObjects = this.getCloseObjects();
        let nearestResourceCenter = closeObjects.filter(object => group.getChildren().includes(object.gameObject))[0];
        
        if(nearestResourceCenter) {
            responses.get(nearestResourceCenter.gameObject.texture.key);
        }
    }

    getCloseObjects(playerReference = this, desiredOverlapWidth = 150, desiredOverlapHeight) {
        let overlapWidth =  desiredOverlapWidth,
            overlapHeight = desiredOverlapHeight ? desiredOverlapHeight : desiredOverlapWidth,
            boundOffset = 100;

        return playerReference._scene.physics.overlapRect(playerReference.x - boundOffset, 
            playerReference.y + playerReference.height - boundOffset, overlapWidth, overlapHeight, false, true);
    }

    isCloseToGroup(group, player = this){
        let closeObjects = player.getCloseObjects();//player._scene.physics.overlapRect(player.x - player.width, player.y - player.height, 100, 100, false, true);
        let nearestResourceCenter = closeObjects.filter(object => group.getChildren().includes(object.gameObject))[0];
        return nearestResourceCenter != undefined;
    }
}