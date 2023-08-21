import Phaser from "phaser";

export default class LoadScene extends Phaser.Scene {

    assetPaths

    constructor() {
        super({
            key: "LoadScene",
            pack: {
                files: [
                    {
                        type: "json",
                        key: "assetsJSON",
                        url: "Assets/assets.json"
                    }
                ]
            }
        })
    }

    preload() {
        let json = this.cache.json.get("assetsJSON")

        /*
        this.load.image("walpurgisnachtImage", json["Boss"])
        this.load.image("Carmine", json["Carmine"])
        this.load.image("bullet", json["EnemyBullet"])
        this.load.image("PlayerBullet", json["PlayerLinearBullet"])
        */
        let keys = Object.keys(json)
        keys.forEach((key) => {
            this.load.image(key, json[key])
        })
    }

    create() {
        this.scene.start("Stage1")
    }
}