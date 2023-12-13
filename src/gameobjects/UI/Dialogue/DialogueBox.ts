import TextBox from "phaser3-rex-plugins/templates/ui/textbox/TextBox";
import { Dialogue, DialogueSet } from "./Dialogue";
import Label from "phaser3-rex-plugins/templates/ui/label/Label";

export default class DialogueBox extends TextBox {

    dialogueSet: DialogueSet = {}
    currentDialogue: Dialogue
    nameBox: Label | undefined
    actionButton: Phaser.GameObjects.Sprite
    dialogueSound: Phaser.Sound.BaseSound | undefined
    

    constructor(scene: Phaser.Scene, width: number, height: number, nameBox?: Label) {

        // Background object
        let background = scene.rexUI.add.ninePatch({
            key: "TextBox",
            ...scene.cache.json.get("TextBox"),
            stretchMode: 1
        })

        // Text object that stores the dialogue (This determines the textBox size)
        let text = scene.add.text(0, 0, "", {
            fixedWidth: width,
            fixedHeight: height,
            fontSize: 70,
            wordWrap: {
                width: width,
            },
            fontFamily: "Silver"
        })

        // The animated button telling the player they can click to progress the dialogue
        scene.anims.create({
            key: "NextDialogueButtonAnim",
            frames: "NextDialogueButton",
            frameRate: 5,
            repeat: -1
        })
        let actionButton = scene.add.sprite(0, 0, "NextDialogueButton")
            .play("NextDialogueButtonAnim")
            .setVisible(false)
        
        // Create the text box
        super(scene, {
            background,
            text,
            action: actionButton,
            space: {
                innerLeft: 30, innerRight: 30, innerTop: 20, innerBottom: 20,
                actionTop: 150, actionRight: 10
            }
        })

        scene.add.existing(this)

        this.dialogueSound = scene.sound.add("DialogueSound_Lotus", {volume: 0.1})

        this.nameBox = nameBox
        this.actionButton = actionButton
        this.setTypingSpeed(40)
        this.setInteractive()
        this.on("pointerdown", this.clickAction)
        this.on("pageend", () => {this.actionButton.setVisible(true)})
        this.on("typechar", (char: string) => {if (char != " ") this.dialogueSound?.play()})
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
            // Emit an end dialogue event so the parent scene can disable itself
            this.setText("")
            this.emit("endDialogue")
        }
    }

    /**
     * Updates the dialogue UI
     */
    updateDialogue() {
        this.start(this.currentDialogue.txt)
        this.nameBox?.setText(this.currentDialogue.char)
        this.actionButton.setVisible(false)
        this.emit("updateDialogue")
    }
}