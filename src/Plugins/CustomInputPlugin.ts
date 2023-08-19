import Phaser, { Input } from "phaser"
import defaultSettings from "../Constants/defaultSettings.json"
type Key = Phaser.Input.Keyboard.Key
const {KeyCodes} = Phaser.Input.Keyboard

/**
 * Handles all inputs and stores them in variables.
 * Call setScene() every time a scene is changed.
 */
export default class CustomInputPlugin extends Phaser.Plugins.ScenePlugin {

    controls: any

    // Keys
    up: Key
    down: Key
    left: Key
    right: Key
    debug: Key
    timeStop: Key
    shoot: Key

    // mouse
    timeStopMouse = 0
    shootMouse = 0
    mouseX: number
    mouseY: number

    // states
    /** whether the player is shooting */
    isShooting: boolean = false
    /** whether the player is stopping time */
    isStoppingTime: boolean = false
    /** whether shooting is in toggle mode */
    shootToggle: boolean = false
    /** whether shotting has just been toggled, if toggle mode is enabled */
    shootToggled: boolean = false

    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
        super(scene, pluginManager, "customInputs")
        this.controls = defaultSettings.controls

        // Creating the inputs
        this.initializeInputs()
    }

    initializeInputs() {

        // KEYS
        this.createKeys()

        // MOUSE
        this.setMouseControls()

        // enable the shoot or timeStop keys if mouse is not being used
        this.enableKeysIfNoMouse()
        
        this.scene.input.mouse.disableContextMenu()
    }

    /** 
     * Create the KEY objects (no functionality) 
     */
    createKeys() {
        let keyboard = this.scene.input.keyboard
        this.up = keyboard.addKey(this.controls.up)
        this.down = keyboard.addKey(this.controls.down)
        this.left = keyboard.addKey(this.controls.left)
        this.right = keyboard.addKey(this.controls.right)
        this.debug = keyboard.addKey(this.controls.debug)
        this.timeStop = keyboard.addKey(this.controls.timeStop)
        this.shoot = keyboard.addKey(this.controls.shoot)
    }

    /**
     * Adds event listeners on mouse buttons if necessary
     */
    setMouseControls() {
        this.timeStopMouse = this.controls.timeStopMouse
        this.shootMouse = this.controls.shootMouse
        this.scene.input.on('pointermove', (pointer: Input.Pointer) => {
            this.mouseX = pointer.x
            this.mouseY = pointer.y
        })
        this.scene.input.on('pointerdown', (pointer: Input.Pointer) => {
            if (pointer.button == this.controls.shootMouse) {
                if (this.controls.shootToggle) {
                    this.isShooting = !this.isShooting
                } else {
                    this.isShooting = true
                }
            } else if (pointer.button == this.controls.timeStopMouse) {
                this.isStoppingTime = true
            }
        })
        this.scene.input.on('pointerup', (pointer: Input.Pointer) => {
            if (pointer.button == this.controls.shootMouse) {
                if (!this.controls.shootToggle) {
                    this.isShooting = false
                }
            } else if (pointer.button == this.controls.timeStopMouse) {
                this.isStoppingTime = false
            }
        })
    }

    /**
     * Enables the shoot or timeStop keys if the mouse is not being used for those actions
     */
    enableKeysIfNoMouse() {
        if (this.shootMouse == -1) {
            if (this.controls.shootToggle) {
                this.shoot.on("down", () => {
                    this.isShooting = !this.isShooting
                })
            } else {
                this.shoot.on("down", () => {
                    this.isShooting = true
                })
                this.shoot.on("up", () => {
                    this.isShooting = false
                })
            }
        }

        if (this.timeStopMouse == -1) {
            this.timeStop.on("down", () => {
                this.isStoppingTime = true
            })
            this.timeStop.on("up", () => {
                this.isStoppingTime = false
            })
        }
    }

    
    update() {
        //let activePointer = this.scene.input.activePointer
    }
    


}