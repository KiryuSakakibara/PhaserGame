import Phaser from "phaser";

export default class LoadScene extends Phaser.Scene {

    constructor() {
        super({
            key: "LoadScene",
            pack: {
                files: [
                    {
                        type: "json",
                        key: "assetsJSON",
                        url: "./assets/assets.json"
                    }
                ]
            }
        })
    }

    preload() {
        // asset loading progress bar
        const progress = this.add.graphics()
        this.load.on("progress", (value: number) => {
            progress.clear()
            progress.fillStyle(0xffffff, 1)
            progress.fillRect(0, this.scale.height/2-20, this.scale.width*value, 40)
        })
        this.load.on("complete", () => {
            progress.destroy()
        })

        let json = this.cache.json.get("assetsJSON")
        if (!json) {
            return
        }

        let sprites = json["Sprites"]
        let spriteAtlases = json["SpriteAtlases"]

        // Load sprites
        this.loadSprites(sprites)
        this.loadSpriteAtlases(spriteAtlases)
        
    }

    create() {
        let playButton = this.add.sprite(this.scale.width/2, this.scale.height/2, "PlayButton")
        playButton.setScale(10).setInteractive().texture.setFilter(Phaser.Textures.FilterMode.NEAREST)
        playButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            playButton.setTint(0xc0c0c0)
        }).on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            playButton.setTint(0xffffff)
        }).on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start("Stage1")
        })
    }

    loadSprites(sprites: Object) {
        let keys = Object.keys(sprites)
        keys.forEach((key) => {
            this.load.image(key, sprites[key])
        })
    }

    loadSpriteAtlases(atlases: Object) {
        let keys = Object.keys(atlases)
        keys.forEach((key) => {
            this.load.atlas(key, atlases[key]+".png", atlases[key]+".json")
        })
    }
}