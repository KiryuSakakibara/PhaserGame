import { PixelScale } from "../gameobjects/PhysicsConstants";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class DialogueUIScene extends Phaser.Scene {
    constructor() {
        super("DialogueUIScene")
    }

    create() {
        let fixedWidth = 1200
        let fixedHeight = 200
        let titleFixedWidth = 200
        let titleFixedHeight = 50
        
        // Background for main dialogue
        let innerBackground = this.rexUI.add.roundRectangle(
            0,0,0,0,
            20,
            COLOR_PRIMARY
        ).setStrokeStyle(2, COLOR_LIGHT)

        // Text object that stores the dialogue
        let text = this.add.text(0, 0, "", {
            fontSize: "20px",
            wordWrap: {
                width: fixedWidth,
            },
            maxLines: 3
        }).setFixedSize(fixedWidth, fixedHeight)
        
        // The title (character name)
        let title = this.rexUI.add.label({
            y: -50,
            width: titleFixedWidth,
            height: titleFixedHeight,
            background: this.rexUI.add.roundRectangle(
                0,0,0,0,
                10,
                COLOR_PRIMARY
            ).setStrokeStyle(2, COLOR_LIGHT),
            text: this.add.text(0, 0, "title", {fontSize: "24px",}),
            align: "center",
            
            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                icon: 10,
                text: 10,
            }
            
        })
        
        let textBox = this.rexUI.add.textBox({
            x: this.cameras.main.width/2,
            y: this.cameras.main.height-fixedHeight/2-100,

            background: innerBackground,

            text: text,

            title: title,

            action: this.add.image(0, 0, 'Player').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                innerLeft: 20, innerRight: 20, innerTop: 20, innerBottom: 20,
                top: -titleFixedHeight,

                titleLeft: 0,
                icon: 10, text: 10,
            }

        }).layout()

        textBox.on("pageend", () => {
            if (textBox.isLastPage) {
                return
            }
        })

        textBox.start("Hello.", 100)
        
        
    }
}