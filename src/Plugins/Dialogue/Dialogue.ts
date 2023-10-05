import { TextureName } from "../../Constants/TextureNames";
import { CharacterName } from "./CharacterNames";

export interface Dialogue {
    id: number,
    character: CharacterName
    sprite?: TextureName
    message: string,
    choices?: number[],
    next?: number
    pre?: () => boolean
    preId?: number,
    post?: () => any
}

export interface DialogueList {
    [id: number]: Dialogue
}