import { TextureName } from "../../../Constants/TextureNames";
import { CharacterName } from "./CharacterNames";

export type Dialogue = {
    id: number,
    char: CharacterName
    sprite?: TextureName
    txt: string,
    choices?: number[],
    next?: number
    pre?: () => boolean
    preId?: number,
    post?: () => any
}


export type DialogueSet = {
    [id: number]: Dialogue
}


// export class DialogueSet {
//     dialogues: Dialogues
//     currentId: number = 1

//     /**
//      * Sets the dialogues and associates them with their ids.
//      * @param dialogues Either an array of dialogues or an object with 
//      * ids already assigned to the dialogues.
//      */
//     constructor(dialogues: Dialogue[])
//     constructor(dialogues: Dialogues)
//     constructor(dialogues: Dialogue[] | Dialogues) {
//         if (Array.isArray(dialogues)) {
//             dialogues.forEach((dialogue) => {
//                 this.dialogues[dialogue.id] = dialogue
//             })
//         } else {
//             this.dialogues = dialogues
//         }
//     }
// }
