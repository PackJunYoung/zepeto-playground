import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import MultiplayManager from './MultiplayManager';

export default class GiftItem extends ZepetoScriptBehaviour {

    private id: string;

    public Init(id: string) {
        this.id = id;
    }

    OnTriggerEnter(collider: Collider) {
        MultiplayManager.instance.ObtainItem(this.id);
    }

}