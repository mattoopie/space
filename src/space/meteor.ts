import {Mesh} from "three/src/objects/Mesh";
import {MeshPhongMaterial} from "three/src/materials/MeshPhongMaterial";
import {SphereGeometry} from "three/src/geometries/SphereGeometry";
import {IObject} from "./iobject";
import {Vector3} from "three/src/math/Vector3";

export class Meteor implements IObject {

    object: Mesh;
    speed: number;

    constructor(color: number, speed: number) {
        this.speed = speed;
        const geometry = new SphereGeometry(1, 8, 8);
        const material = new MeshPhongMaterial({color: color});
        this.object = new Mesh(geometry, material);
    }

    update() {
        this.object.position.z += this.speed;
    }

    setPosition(position: Vector3) {
        this.object.position.set(position.x, position.y, position.z);
    }
}