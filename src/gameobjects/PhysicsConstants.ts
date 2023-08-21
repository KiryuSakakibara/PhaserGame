import * as Planck from "planck"
import PlanckSprite from "./PlanckSprite"

/** The scale to multiply by to convert from pixels to meters */
export const PlanckScale = 0.02
/** How much the pixel art is scaled up by */
export const PixelScale = 5

/** The type of the userData stored in fixtures, to be used during collisions */
export type UserData = {
    width?: number,
    height?: number,
    radius?: number,
    sprite: PlanckSprite
}

/** The collision bits of objects */
export const Bits = {
    player: 0x1,
    enemy: 0x2,
    playerBullet: 0x4,
    enemyBullet: 0x8
}

/** The collision bit masks of objects */
export const Masks = {
    player: Bits.enemy + Bits.enemyBullet,
    enemy: Bits.player + Bits.playerBullet,
    playerBullet: Bits.enemy,
    enemyBullet: Bits.player
}

/**
 * Creates a fixture with a box shape with the given parameters
 * @param width Width of the box in pixels
 * @param height Height of the box in pixels
 * @param filterCategoryBits The bits associated with this fixture
 * @param filterMaskBits The bits to enable collisions for
 * @param sprite The sprite associated with the fixture
 * @returns A Planck FixtureDef
 */
export function createBoxFixture(width: number, height: number, filterCategoryBits: number, 
    filterMaskBits: number, sprite: PlanckSprite) {
    return {
        shape: Planck.Box(width*PlanckScale/2, height*PlanckScale/2), // Planck.Box uses half width ad half height
        filterCategoryBits,
        filterMaskBits,
        isSensor: true,
        userData: {
            width,
            height,
            sprite
        } as UserData
    }
}

/**
 * Creates a fixture with a circle shape with the given parameters
 * @param radius The radius of the circle in pixels
 * @param filterCategoryBits The bits associated with this fixture
 * @param filterMaskBits The bits to enable collisions for
 * @param sprite The sprite associated with this fixture
 * @returns A Planck FixtureDef
 */
export function createCircleFixture(radius: number, filterCategoryBits: number,
    filterMaskBits: number, sprite: PlanckSprite) {
    return {
        shape: Planck.Circle(radius*PlanckScale),
        filterCategoryBits,
        filterMaskBits,
        isSensor: true,
        userData: {
            radius,
            sprite
        } as UserData
    }
}