import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import { PixelScale } from "../gameobjects/PhysicsConstants";
import DialogueBox from "../gameobjects/UI/Dialogue/DialogueBox";
import { BeginningDialogue } from "../Constants/Dialogues/BeginningDialogue";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class DialogueUIScene extends Phaser.Scene {

    dialogueBox: DialogueBox
    graphics: Phaser.GameObjects.Graphics

    constructor() {
        super("DialogueUIScene")
    }

    create() {
        this.graphics = this.add.graphics().setDepth(1)
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

    createDialogueSizer() {
        let fixedWidth = 1200
        let fixedHeight = 200

        let nameBox = this.createNameBox()

        //this.dialogueBox = this.createDialogueBox(nameBox)
        this.dialogueBox = new DialogueBox(this, fixedWidth, fixedHeight, nameBox)


        let dialogueSizer = this.rexUI.add.sizer({
            x: this.cameras.main.width/2,
            y: this.cameras.main.height-fixedHeight/2-100,
            orientation: "y"
        })

        dialogueSizer.add(nameBox, {align: "left", padding: {bottom: -this.cache.json.get("TextBox")["bottomHeight"]}})
        dialogueSizer.add(this.dialogueBox)
        
        // Re-layout the dialogue box when the next dialogue is shown
        this.dialogueBox.on("updateDialogue", () => {
            dialogueSizer.layout()
            this.graphics.clear()
            //dialogueSizer.drawBounds(this.graphics, 0xff0000)
        })
        this.dialogueBox.on("endDialogue", () => {this.scene.sleep(this)})

        dialogueSizer.layout()
        //dialogueSizer.drawBounds(this.graphics, 0xff0000)

        return dialogueSizer
    }
}