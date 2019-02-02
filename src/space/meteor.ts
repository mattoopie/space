import {Mesh} from "three/src/objects/Mesh";
import {MeshPhongMaterial} from "three/src/materials/MeshPhongMaterial";
import {SphereGeometry} from "three/src/geometries/SphereGeometry";
import {IObject} from "./iobject";
import {Vector3} from "three/src/math/Vector3";
import {Color} from "three/src/math/Color";

export class Meteor implements IObject {

    object: Mesh;
    private material: MeshPhongMaterial;

    constructor(color: number, private speed: number, radius: number) {
        const geometry = new SphereGeometry(radius, 8, 8);
        this.material = new MeshPhongMaterial({color: color});
        this.object = new Mesh(geometry, this.material);
    }

    update() {
        // this.object.position.z += this.speed;
    }

    setPosition(position: Vector3) {
        this.object.position.set(position.x, position.y, position.z);
    }

    setColor(color: number) {
        this.material.color = new Color(color);
    }
}