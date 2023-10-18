import Label from "phaser3-rex-plugins/templates/ui/label/Label";
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

        let content = `This is an extremely long sentence to help test whether the text \
actually successfully wraps around the provided width of the textBox.`

        //let textBox = this.createTextBox().layout()

        let uiContainer = this.rexUI.add.sizer({
            x: this.cameras.main.width/2,
            y: this.cameras.main.height-fixedHeight/2-100,
            orientation: "y"
        })

        uiContainer.layout()
        uiContainer.drawBounds(this.add.graphics(), 0xff0000)

        //textBox.start(content, 10);
        
    }

    createNameBox() {
        let width = 500
        let height = 200

        //let background = this.rexUI.add.ninePatch
    }

    createTextBox() {
        let fixedWidth = 1200
        let fixedHeight = 200
        
        // Background for main dialogue
        let innerBackground = this.rexUI.add.roundRectangle(
            0,0,0,0,
            20,
            COLOR_PRIMARY
        ).setStrokeStyle(2, COLOR_LIGHT)

        // Text object that stores the dialogue (This determines the textBox size)
        
        let text = this.add.text(0, 0, "", {
            fontSize: "50px",
            wordWrap: {
                width: fixedWidth,
            },
            //maxLines: 3
        }).setFixedSize(fixedWidth, fixedHeight)
        
        
        let textBox = this.rexUI.add.textBox({
            //x: this.cameras.main.width/2,
            //y: this.cameras.main.height-fixedHeight/2-100,

            background: innerBackground,

            text: text,

            //title: title,

            //action: this.add.image(0, 0, 'Player').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                innerLeft: 20, innerRight: 20, innerTop: 20, innerBottom: 20,
                //top: -titleFixedHeight

                //titleLeft: 0,
                //icon: 10, text: 10,
            }

        })

        textBox.on("pageend", () => {
            if (textBox.isLastPage) {
                return
            }
        })

        return textBox
    }
}