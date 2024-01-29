import { Time, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

enum MoveDirection {
    None,
    Up,
    Down,
    Right,
    Left
}

export default class VerticalMover extends ZepetoScriptBehaviour {

    public minHeight: number;
    public maxHeight: number;
    public speed: number;

    private direction: MoveDirection;

    Start() {
        this.direction = MoveDirection.Up;
    }

    FixedUpdate() {
        var position = this.transform.position;

        if (this.direction == MoveDirection.Up) {
            this.transform.Translate(new Vector3(0, Time.deltaTime * this.speed, 0));
        } else if (this.direction == MoveDirection.Down) {
            this.transform.Translate(new Vector3(0, -Time.deltaTime * this.speed, 0));
        }

        if (position.y < this.minHeight) {
            this.direction = MoveDirection.Up;
        } else if (position.y > this.maxHeight) {
            this.direction = MoveDirection.Down;
        }
    }

}