import Phaser, { Input } from "phaser"
type Key = Phaser.Input.Keyboard.Key
const {KeyCodes} = Phaser.Input.Keyboard

const enum Commands {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    DEBUG = "DEBUG",
    TIMESTOP = "TIMESTOP",
    SHOOT = "SHOOT",
    PAUSE = "PAUSE",
}


export type Bindings = {
    [command in Commands]: number
}

const defaultBindings: Bindings = {
    UP: KeyCodes.W,
    DOWN: KeyCodes.S,
    LEFT: KeyCodes.A,
    RIGHT: KeyCodes.D,
    DEBUG: KeyCodes.P,
    TIMESTOP: 2,
    SHOOT: 0,
    PAUSE: KeyCodes.ESC
}

/**
 * Handles all inputs and stores them in variables.
 * Call setScene() every time a scene is changed.
 */
export default class CustomInputPlugin extends Phaser.Plugins.ScenePlugin {

    currentBindings: Bindings

    // mouse
    /** Mouse position in screen coordinates, with (0,0) being the center */
    mouseScreenPos = new Phaser.Math.Vector2()
    /** Mouse position in world coordinates */
    mouseWorldPos = new Phaser.Math.Vector2()

    // states
    /** whether shooting is in toggle mode */
    shootToggleMode: boolean = true

    /** Whether the player is pressing up */
    isPressingUp: boolean = false
    /** Whether the player is pressing down */
    isPressingDown: boolean = false
    /** Whether the player is pressing left */
    isPressingLeft: boolean = false
    /** Whether the player is pressing right */
    isPressingRight: boolean = false
    /** whether debugging mode is on */
    isDebugging: boolean = false
    /** whether the player is stopping time */
    isStoppingTime: boolean = false
    /** whether the player is shooting */
    isShooting: boolean = false
    /** whether the game is paused or not */
    isPausing: boolean = false

    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
        super(scene, pluginManager, "customInputs")
        

        // Creating the inputs
        //this.initializeInputs(scene)
        this.scene?.input.mouse?.disableContextMenu()
        //this.initAllInputs(defaultBindings)
    }

    
    update() {
        //let activePointer = this.scene.input.activePointer
        let pointer = this.scene!.input.activePointer
        pointer.updateWorldPoint(this.scene!.cameras.main)
        this.mouseWorldPos.x = pointer.worldX
        this.mouseWorldPos.y = pointer.worldY
        let width = this.scene?.scale.width || 1920
        let height = this.scene?.scale.height || 1080
        this.mouseScreenPos.x = Phaser.Math.Clamp(pointer.position.x, 0, width) - width/2
        this.mouseScreenPos.y = Phaser.Math.Clamp(pointer.position.y, 0, height) - height/2
    }

    /**
     * Initializes a key (keycode >= 8) or mouse button (keycode < 8) with the given function
     * to be executed when the key/button is pressed and released.
     * @param keyCode The key/mouse button (0 is left click, 2 is right click)
     * @param fun The function to run when a key/button is pressed/released. Pass in true
     * if it was pressed, false if released.
     * @returns 
     */
    initInput(keyCode: number, fun: (down: boolean) => void) {
        if (keyCode < 8) {
            // mouse
            this.scene?.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
                if (pointer.button == keyCode) fun(true)
            }).on("pointerup", (pointer: Phaser.Input.Pointer) => {
                if (pointer.button == keyCode) fun(false)
            })
        } else {
            // keyboard
            let keyboard = this.scene?.input.keyboard
            if (keyboard == null) return // keyboard doesn't exist

            let key = keyboard.addKey(keyCode)
            key.on("down", () => {
                fun(true)
            }).on("up", () => {
                fun(false)
            })
        }
    }

    /**
     * Clears all existing inputs and re-initializes them with the given bindings.
     * Should be called in the create method of a scene so inactive scenes don't have
     * active inputs.
     * @param bindings The key bindings
     */
    initAllInputs(bindings: Bindings = defaultBindings) {
        // Clear bindings
        this.scene?.input.keyboard?.removeAllListeners().removeAllKeys(true, true)
        this.scene?.input.removeAllListeners()

        this.currentBindings = bindings
        
        this.initInput(bindings.UP, this.upInput)
        this.initInput(bindings.DOWN, this.downInput)
        this.initInput(bindings.LEFT, this.leftInput)
        this.initInput(bindings.RIGHT, this.rightInput)
        this.initInput(bindings.DEBUG, this.debugInput)
        this.initInput(bindings.SHOOT, this.shootInput)
        this.initInput(bindings.TIMESTOP, this.timeStopInput)
        this.initInput(bindings.PAUSE, this.pauseInput)
    }

    upInput = (down: boolean) => {
        this.isPressingUp = down
    }

    downInput = (down: boolean) => {
        this.isPressingDown = down
    }

    leftInput = (down: boolean) => {
        this.isPressingLeft = down
    }

    rightInput = (down: boolean) => {
        this.isPressingRight = down
    }

    debugInput = (down: boolean) => {
        if (down) this.isDebugging = !this.isDebugging
    }

    shootInput = (down: boolean) => {
        if (this.shootToggleMode) {
            if (down) this.isShooting = !this.isShooting
        } else {
            this.isShooting = down
        }
    }

    timeStopInput = (down: boolean) => {
        this.isStoppingTime = down
    }

    pauseInput = (down: boolean) => {
        if (down) this.isPausing = !this.isPausing
    }

}