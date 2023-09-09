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
                        url: "assets/assets.json"
                    }
                ]
            }
        })
    }

    preload() {
        let json = this.cache.json.get("assetsJSON")
        let sprites = json["Sprites"]
        let spriteAtlases = json["SpriteAtlases"]

        /*
        this.load.image("walpurgisnachtImage", json["Boss"])
        this.load.image("Carmine", json["Carmine"])
        this.load.image("bullet", json["EnemyBullet"])
        this.load.image("PlayerBullet", json["PlayerLinearBullet"])
        */
        if (!json) {
            return
        }

        // Load sprites
        this.loadSprites(sprites)
        this.loadSpriteAtlases(spriteAtlases)

        // Load sprite atlases
        
        
    }

    create() {
        this.scene.start("Stage1")
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
            this.load.json(key+"Meta", atlases[key]+".json", "meta")
        })
    }
}