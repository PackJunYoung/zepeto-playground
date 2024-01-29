import { Collider, GameObject, Light } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Brazier extends ZepetoScriptBehaviour {

    public light: Light;
    public fire: GameObject;

    Start() {
        this.FireOff();
    }

    OnTriggerEnter(collider: Collider) {
        this.FireOn();
    }

    OnTriggerExit(collider: Collider) {
        this.FireOff();
    }

    FireOn() {
        this.fire.SetActive(true);
        this.light.range = 15;
        this.light.intensity = 10;
    }

    FireOff() {
        this.fire.SetActive(false);
        this.light.range = 1.5;
        this.light.intensity = 1;
    }

}