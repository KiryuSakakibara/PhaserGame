import * as Planck from "planck"

/** The scale to multiply by to convert from pixels to meters */
export const PlanckScale = 0.02
/** How much the pixel art is scaled up by */
export const PixelScale = 5

const bits = {
    player: 1,
    enemy: 2,
    playerBullet: 4,
    enemyBullet: 8
}

const masks = {
    player: bits.enemy + bits.enemyBullet,
    enemy: bits.player + bits.playerBullet,
    playerBullet: bits.enemy,
    enemyBullet: bits.player
}

export const PlayerFixture = {
    shape: Planck.Box(40*PlanckScale, 70*PlanckScale),
    isSensor: true,
    filterCategoryBits: bits.player,
    filterMaskBits: masks.player,
    userData: {
        type: "box",
        width: 30,
        height: 50
    }
}

export const linearPlayerBulletFixture = {
    shape: Planck.Box(50*PlanckScale, 30*PlanckScale),
    isSensor: true,
    filterCategoryBits: bits.playerBullet,
    filterMaskBits: masks.playerBullet,
    userData: {
        type: "box",
        width: 50,
        height: 30
    }
}