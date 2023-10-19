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

        let assetsJson = this.cache.json.get("assetsJSON")
        if (!assetsJson) {
            return
        }

        this.loadAllAssets(assetsJson)
        
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

    /**
     * Load all the assets
     * @param assetsJson The json file defining all asset paths
     */
    loadAllAssets(assetsJson: Object) {
        // load sprites
        this.loadSprites(assetsJson["Sprites"])
        // load spriteAtlases
        this.loadSpriteAtlases(assetsJson["SpriteAtlases"])
        // load nineSlices
        this.loadNineSlices(assetsJson["NineSlices"])
        // load fonts
        this.loadFonts(assetsJson["Fonts"])
    }

    /**
     * Load sprites using scene.load.image()
     * @param sprites 
     */
    loadSprites(sprites: Object) {
        for (const [key, path] of Object.entries(sprites)) {
            this.load.image(key, path)
        }
    }

    /**
     * Load spriteAtlases using scene.load.atlas()
     * @param atlases 
     */
    loadSpriteAtlases(atlases: Object) {
        for (const [key, path] of Object.entries(atlases)) {
            this.load.atlas(key, path+".png", path+".json")
        }
    }

    /**
     * Load nine slices using scene.load.image() and scene.load.json()
     * @param nineSlices 
     */
    loadNineSlices(nineSlices: Object) {
        for (const [key, path] of Object.entries(nineSlices)) {
            this.load.image(key, path+".png")
            this.load.json(key, path+".json")
        }
    }

    /**
     * Load custom fonts
     * @param fonts 
     */
    loadFonts(fonts: Object) {
        for (const [key, path] of Object.entries(fonts)) {
            let newFont = new FontFace(key, `url(${path})`)
            newFont.load().then(function (loaded) {
                document.fonts.add(loaded)
            }).catch(function (error) {
                return error
            })
        }
    }
}