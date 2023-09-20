import GridTable from "phaser3-rex-plugins/plugins/gridtable";
import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";
import { Bindings } from "../Plugins/CustomInputPlugin";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class PauseUIScene extends Phaser.Scene {
    print

    constructor() {
        super("PauseUIScene")
    }

    create() {
        let scrollMode: GridTable.ScrollModeType = 0; // 0:vertical, 1:horizontal

        
        let gridTable = this.rexUI.add.gridTable({
            x: this.cameras.main.width/2,
            y: this.cameras.main.height/2,
            width: (scrollMode === 0) ? 1200 : 420,
            height: (scrollMode === 0) ? 800 : 300,

            scrollMode: scrollMode,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

            table: {
                cellWidth: (scrollMode === 0) ? undefined : 60,
                cellHeight: (scrollMode === 0) ? 60 : undefined,

                columns: 2,

                mask: {
                    padding: 2,
                },

                reuseCellContainer: false,
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            header: this.rexUI.add.label({
                width: (scrollMode === 0) ? undefined : 30,
                height: (scrollMode === 0) ? 50 : undefined,

                orientation: scrollMode,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, 'Controls', {fontSize: 40}),
                align: "center"
            }),

            footer: GetFooterSizer(this, scrollMode),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,

                table: 10,
                header: 10,
                footer: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item as {text: string},
                    index = cell.index;
                if (cellContainer === null) {
                    cellContainer = scene.rexUI.add.label({
                        width: width,
                        height: height,

                        orientation: scrollMode,
                        background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                        text: scene.add.text(0, 0, item.text, {fontSize: 40}),
                        align: "center",

                        space: {
                            icon: 10,
                            left: (scrollMode === 0) ? 15 : 0,
                            top: (scrollMode === 0) ? 0 : 15,
                        }
                    }).setMinSize(width, height)
                    
                } else {
                    
                }
                
                return cellContainer;
            },

            items: this.createItems()


        }).layout()

        
        
    }

    update(time: number, delta: number): void {
        
    }

    
    createItems() {
        let arr: Object[] = []
        let bindings = this.scene.get("Stage1").customInputs.currentBindings
        for (let command in bindings) {
            arr.push({
                text: command
            })
            let key = bindings[command]
            arr.push({
                text: getKeyFromKeyCode(key)
            })
        }
        return arr
    }
    
}

function getKeyFromKeyCode(key: number) {
    switch (key) {
        case 27: return "Escape"
        case 0: return "Left Click"
        case 2: return "Right Click"
        default: return String.fromCharCode((96 <= key && key <= 105)? key-48 : key)
    }
}

function CreateFooterButton(scene: Phaser.Scene, text: string, orientation: Sizer.OrientationTypes) {
    return scene.rexUI.add.label({
        height: (orientation === 0) ? 50 : undefined,
        width: (orientation === 0) ? undefined : 50,
        orientation: orientation,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 15, COLOR_DARK),
        text: scene.add.text(0, 0, text, {fontSize: 25}),
        //icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
        align: 'center',
        space: {           
            icon: 10
        }
    })
    .setInteractive()
    .on('pointerdown', () => {
        console.log(`Pointer down ${text}`)
    })
    .on('pointerover', function (this: Label) {
        (this.getElement('background') as Phaser.GameObjects.Shape).setStrokeStyle(1, 0xffffff);
    })
    .on('pointerout', function (this: Label) {
        (this.getElement('background') as Phaser.GameObjects.Shape).setStrokeStyle();
    })
}

function GetFooterSizer(scene: Phaser.Scene, orientation: Sizer.OrientationTypes) {
    return scene.rexUI.add.sizer({
        orientation: orientation,
        space: {
            item: 20
        }
    })
        .add(
            CreateFooterButton(scene, "This button doesn't do anything", orientation),   // child
            1,         // proportion
            'center'   // align
        )
        .add(
            CreateFooterButton(scene, 'Neither does this one lol', orientation),    // child
            1,         // proportion
            'center'   // align
        )
}