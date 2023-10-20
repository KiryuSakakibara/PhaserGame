import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import { PixelScale } from "../gameobjects/PhysicsConstants";
import DialogueBox from "../gameobjects/UI/Dialogue/DialogueBox";
import { BeginningDialogue } from "../Constants/Dialogues/BeginningDialogue";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class DialogueUIScene extends Phaser.Scene {

    dialogueBox: DialogueBox

    constructor() {
        super("DialogueUIScene")
    }

    create() {
        this.createDialogueSizer()

        this.dialogueBox.startNewDialogue(BeginningDialogue)
        
    }

    createNameBox() {
        let background = this.rexUI.add.ninePatch({
            key: "TextBox",
            ...this.cache.json.get("TextBox"),
            stretchMode: 1
        })

        let text = this.add.text(0, 0, "Hello World", {
            fontSize: 70,
            fontFamily: "Silver",
        })

        let label = this.rexUI.add.label({
            background,
            text,
            space: {
                top: 20, bottom: 20, left: 40, right: 40
            }
        })

        return label
    }

    createDialogueBox(nameBox: Label) {
        let fixedWidth = 1200
        let fixedHeight = 200
        
        let innerBackground = this.rexUI.add.ninePatch({
            key: "TextBox",
            ...this.cache.json.get("TextBox"),
            stretchMode: 1
        })

        // Text object that stores the dialogue (This determines the textBox size)
        let text = this.add.text(0, 0, "", {
            fixedWidth,
            fixedHeight,
            fontSize: 70,
            wordWrap: {
                width: fixedWidth,
            },
            fontFamily: "Silver"
        })
        
        let textBox = new DialogueBox(this, nameBox, {
            background: innerBackground,

            text: text,

            //action: this.add.image(0, 0, 'Player').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                innerLeft: 30, innerRight: 30, innerTop: 20, innerBottom: 20,
            }
        })

        return textBox
    }

    createDialogueSizer() {
        let fixedHeight = 200

        let nameBox = this.createNameBox()

        this.dialogueBox = this.createDialogueBox(nameBox)


        let dialogueSizer = this.rexUI.add.sizer({
            x: this.cameras.main.width/2,
            y: this.cameras.main.height-fixedHeight/2-100,
            orientation: "y"
        })

        dialogueSizer.add(nameBox, {align: "left", padding: {bottom: -this.cache.json.get("TextBox")["bottomHeight"]}})
        dialogueSizer.add(this.dialogueBox)
        
        // Re-layout the dialogue box when the next dialogue is shown
        this.dialogueBox.on("updateDialogue", () => {dialogueSizer.layout()})
        this.dialogueBox.on("endDialogue", () => {this.scene.sleep(this)})

        dialogueSizer.layout()
        //dialogueSizer.drawBounds(this.add.graphics(), 0xff0000)

        return dialogueSizer
    }
}