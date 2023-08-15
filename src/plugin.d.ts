declare namespace Phaser {
    interface Scene {
        // d.ts files can't have import statements so use inline imports
        planck: import("./Plugins/PlanckPhysics").default
    }
}