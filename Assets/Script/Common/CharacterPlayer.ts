import { LayerMask } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class CharacterPlayer extends ZepetoScriptBehaviour {

    Start() {    
        this.gameObject.layer = LayerMask.NameToLayer("Player");
    }

}