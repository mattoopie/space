import {Mesh} from "three/src/objects/Mesh";
import {Vector3} from "three/src/math/Vector3";

export interface IObject {
    object: Mesh;

    update(): void;

    setPosition(position: Vector3): void;
}