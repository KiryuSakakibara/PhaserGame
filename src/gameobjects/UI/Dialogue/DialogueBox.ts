import TextBox from "phaser3-rex-plugins/templates/ui/textbox/TextBox";
import { Dialogue, DialogueSet } from "./Dialogue";
import Label from "phaser3-rex-plugins/templates/ui/label/Label";

export default class DialogueBox extends TextBox {

    dialogueSet: DialogueSet = {}
    currentDialogue: Dialogue
    nameBox: Label

    constructor(scene: Phaser.Scene, nameBox: Label, config: TextBox.IConfig) {
        super(scene, config)
        scene.add.existing(this)

        this.nameBox = nameBox

        this.setTypingSpeed(20)
        this.setInteractive()
        //this.on("pointerdown", this.clickAction)
        this.on("pointerdown", this.clickAction)
    }

    startNewDialogue(dialogues: Dialogue[]) {
        // Convert dialogue array to object
        dialogues.forEach((dialogue) => {
            if (this.dialogueSet[dialogue.id]) {
                console.warn("Duplicate dialogue id: " + dialogue.id)
            } else {
                this.dialogueSet[dialogue.id] = dialogue
            }
        })
        this.currentDialogue = dialogues[1]
        this.updateDialogue()
    }

    /**
     * The action to take when the textBox is clicked
     */
    clickAction() {
        if (this.isTyping) {
            // Skip
            this.stop(true)
        } else if (this.currentDialogue.next && this.dialogueSet[this.currentDialogue.next]) {
            // Go to the next dialogue
            this.currentDialogue = this.dialogueSet[this.currentDialogue.next]
            this.updateDialogue()
        } else {
            this.setText("")
            this.emit("endDialogue")
        }
    }

    /**
     * Updates the dialogue UI
     */
    updateDialogue() {
        this.start(this.currentDialogue.txt)
        this.nameBox.setText(this.currentDialogue.char)
        this.emit("updateDialogue")
    }
}