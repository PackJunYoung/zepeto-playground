import { Collider, LayerMask, Quaternion, Vector3 } from 'UnityEngine';
import { ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class RegenChecker extends ZepetoScriptBehaviour {

    OnTriggerEnter(collider: Collider) {
        if (collider.gameObject.layer == LayerMask.NameToLayer("Player")) {
            var zepetoCharacter = collider.gameObject.GetComponent<ZepetoCharacter>();
            zepetoCharacter.Teleport(Vector3.zero, Quaternion.identity);
        }
    }

}