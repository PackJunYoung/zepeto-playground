import { Collision, Time, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

enum MoveDirection {
    Right,
    Left,
    Up,
    Down,
}

export default class HorizontalMover extends ZepetoScriptBehaviour {

    public minX: number;
    public maxX: number;
    public speed: number;

    private direction: MoveDirection;

    Start() {
        this.direction = MoveDirection.Right;
    }

    FixedUpdate() {
        var position = this.transform.position;

        if (this.direction == MoveDirection.Right) {
            this.transform.Translate(new Vector3(Time.deltaTime * this.speed, 0, 0));
        } else if (this.direction == MoveDirection.Left) {
            this.transform.Translate(new Vector3(-Time.deltaTime * this.speed, 0, 0));
        }

        if (position.x > this.maxX) {
            this.direction = MoveDirection.Left;
        } else if (position.x < this.minX) {
            this.direction = MoveDirection.Right;
        }
    }

}