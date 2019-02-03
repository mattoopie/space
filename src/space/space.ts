import {Scene} from "three/src/scenes/Scene";
import {Camera} from "three/src/cameras/Camera";
import {Meteor} from "./meteor";
import {LightManager} from "./lightmanager";
import {Vector3} from "three/src/math/Vector3";
import {SpaceSettings} from "../settings/settings";
import {flatMap} from "lodash";
import {Color} from "three/src/math/Color";
import {_Math} from "three/src/math/Math";
import randFloat = _Math.randFloat;

const randomSpherical = require('random-spherical/object')(Math.random, Vector3);

export class Space {

    private meteors: Meteor[] = [];
    private lightManager: LightManager;
    private readonly movement: Vector3;
    private rotateX = Math.PI / 5000;
    private rotateY = Math.PI / 2000;
    private rotateZ = Math.PI / 800;

    static readonly MAX_DISTANCE = 3000;

    constructor(private scene: Scene, private camera: Camera, private settings: SpaceSettings) {
        this.lightManager = new LightManager(scene);
        this.lightManager.addLights();
        this.scene.background = new Color(settings.spaceColor);
        this.movement = new Vector3(0, 0, -this.settings.meteorSpeed);
        this.loadMeteors(settings.numberOfMeteors);
    }

    update() {
        this.camera.getWorldDirection(this.movement);
        this.camera.position.add(this.movement.setLength(this.settings.meteorSpeed));
        this.camera.rotateX(this.rotateX);
        this.camera.rotateY(this.rotateY);
        this.camera.rotateZ(this.rotateZ);

        let distance = 0;
        this.meteors.forEach(meteor => {
            // meteor.update();
            distance = meteor.object.position.distanceTo(this.camera.position);
            if (distance > Space.MAX_DISTANCE) {
                this.resetMeteor(meteor, distance);
            }
        });
    }

    reloadSettings() {
        this.loadMeteors(this.settings.numberOfMeteors - this.meteors.length);
        this.scene.background = new Color(this.settings.spaceColor);
        this.meteors.forEach((meteor) => meteor.setColor(this.settings.meteorColor));
    }

    getSettings(): SpaceSettings {
        return this.settings;
    }

    private loadMeteors(numberOfMeteors: number) {
        if (numberOfMeteors > 0) {
            for (let i = 0; i < numberOfMeteors; i++) {
                this.addNewMeteor();
            }
        } else {
            const toBeRemoved = this.meteors.slice(0, -numberOfMeteors);
            this.scene.remove(...flatMap(toBeRemoved, meteor => meteor.object));
            this.meteors.splice(0, -numberOfMeteors);
        }
    }
    private addNewMeteor() {
        // TODO fix spread
        let meteorPosition = randomSpherical().setLength(randFloat(0, Space.MAX_DISTANCE - 0.1)).add(this.camera.position);
        let meteor = new Meteor(this.settings.meteorColor, this.settings.meteorSpeed, this.calcRadius());
        this.meteors.push(meteor);
        this.scene.add(meteor.object);
        meteor.setPosition(meteorPosition);
    }

    private resetMeteor(meteor: Meteor, distance: number) {
        let meteorPosition = meteor.object.position.clone().sub(this.camera.position);
        meteor.setPosition(meteorPosition.normalize().multiplyScalar(-distance).add(this.camera.position));
    }

    private calcRadius = () => Math.random() * 3 + 0.5;
}