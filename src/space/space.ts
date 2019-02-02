import {Scene} from "three/src/scenes/Scene";
import {Camera} from "three/src/cameras/Camera";
import {Meteor} from "./meteor";
import {LightManager} from "./lightmanager";
import {Vector3} from "three/src/math/Vector3";
import {SpaceSettings} from "../settings/settings";
import {flatMap} from "lodash";
import {Color} from "three/src/math/Color";

export class Space {

    private meteors: Meteor[] = [];
    private lightManager: LightManager;

    constructor(private scene: Scene, private camera: Camera, private settings: SpaceSettings) {
        this.lightManager = new LightManager(scene);
        this.lightManager.addLights();
        this.scene.background = new Color(settings.spaceColor);

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
        this.scene.background = new Color(this.settings.spaceColor);
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
        let meteor = new Meteor(this.settings.meteorColor, this.settings.meteorSpeed);
        this.meteors.push(meteor);
        this.scene.add(meteor.object);
        meteor.setPosition(meteorPosition);
    }

    private resetMeteor(meteor: Meteor) {
        let meteorPosition = new Vector3(this.calcX(), this.calcY(), -1000);
        meteor.setPosition(meteorPosition);
    }

    private calcX = () => Math.random() * window.innerWidth - window.innerWidth / 2;
    private calcY = () => Math.random() * window.innerHeight - window.innerHeight / 2;
    private calcZ = () => Math.random() * 2000 - 1000;
}