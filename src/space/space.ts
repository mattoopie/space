import {Scene} from "three/src/scenes/Scene";
import {Camera} from "three/src/cameras/Camera";
import {Meteor} from "./meteor";
import {LightManager} from "./lightmanager";
import {Vector3} from "three/src/math/Vector3";
import {SpaceSettings} from "../settings/settings";
import {flatMap} from "lodash";

export class Space {

    private meteors: Meteor[] = [];
    private lightManager: LightManager;

    constructor(private scene: Scene, private camera: Camera, private settings: SpaceSettings) {
        this.lightManager = new LightManager(scene);
        this.lightManager.addLights();

        this.loadMeteors();
    }

    update() {
        this.meteors.forEach(meteor => {
            meteor.update();
            if (meteor.object.position.z > 1000) {
                this.resetMeteor(meteor);
            }
        });
    }

    useSettings(settings: SpaceSettings) {
        this.settings = settings;
        this.reset();
    }

    getSettings(): SpaceSettings {
        return this.settings;
    }

    private reset() {
        this.removeMeteorsFromScene();
        this.meteors = [];
        this.loadMeteors();
    }

    private loadMeteors() {
        for (let i = 0; i < this.settings.numberOfMeteors; i++) {
            this.addNewMeteor();
        }
    }

    private removeMeteorsFromScene() {
        this.scene.remove(...flatMap(this.meteors, meteor => meteor.object))
    }

    private addNewMeteor() {
        let meteorPosition = new Vector3(this.calcX(), this.calcY(), this.calcZ());
        let meteor = new Meteor(this.settings.meteorColor);
        this.meteors.push(meteor);
        this.scene.add(meteor.object);
        meteor.setPosition(meteorPosition);
    }

    private resetMeteor(meteor: Meteor) {
        let meteorPosition = new Vector3(this.calcX(), this.calcY(), -1000);
        meteor.setPosition(meteorPosition);
    }

    private calcX = () => Math.random() * 1400 - 700;
    private calcY = () => Math.random() * 700 - 350;
    private calcZ = () => Math.random() * 2000 - 1000;
}