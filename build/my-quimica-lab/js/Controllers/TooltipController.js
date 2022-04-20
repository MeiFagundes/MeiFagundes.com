class TooltipController {

    constructor(scene, player, triggerCallback) {
        this._scene = scene;
        this._player = player;
        this._triggerCallback = triggerCallback;
        this._tooltips = [];
    }

    update() {
        
        for (let tooltip of this._tooltips) {

            if (tooltip.object != undefined)
                this.updateTooltipLocation(tooltip);

            if (this._triggerCallback(tooltip.group, player)) {
                
                if (tooltip.object == undefined || !tooltip.object.active) {
                    tooltip.object = this._scene.add
                        .image(this._player.x, this._player.y - 70, tooltip.asset);
                }
            }
            else{

                if (tooltip.object != undefined && tooltip.object.active) {
                    tooltip.object.destroy();
                    
                }
            }
        }
    }

    updateTooltipLocation(tooltip){

        tooltip.object.x = this._player.x;
        tooltip.object.y = this._player.y - 70;

    }

    addTooltipEvent(asset, watchedGroup) {

        if (!this._scene.textures.exists(asset))
            throw new Error("texture key '" + asset + "' doesn't exist.");

        let newTooltipEvent = {
            asset: asset,
            group: watchedGroup
        }

        this._tooltips.push(newTooltipEvent);
    }
}