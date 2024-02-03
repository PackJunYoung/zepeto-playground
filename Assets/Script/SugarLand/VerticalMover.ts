import { Time, Vector3 } from 'UnityEngine';
import { MoveDirection } from 'UnityEngine.EventSystems';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class VerticalMover extends ZepetoScriptBehaviour {

    public minY: number;
    public maxY: number;
    public speed: number;

    private direction: MoveDirection;

    Start() {    
        this.direction = MoveDirection.Up;
    }

    Update() {
        if (this.direction == MoveDirection.Up) {
            this.transform.Translate(new Vector3(0, Time.deltaTime * this.speed, 0));
        } else if (this.direction == MoveDirection.Down) {
            this.transform.Translate(new Vector3(0, -Time.deltaTime * this.speed, 0));
        }

        if (this.transform.position.y > this.maxY) {
            this.direction = MoveDirection.Down;
        } else if (this.transform.position.y < this.minY) {
            this.direction = MoveDirection.Up;
        }

    }

}