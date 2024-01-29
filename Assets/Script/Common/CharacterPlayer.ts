import { CharacterController, LayerMask, Physics, Quaternion, Ray, RaycastHit, Vector3 } from 'UnityEngine'
import { ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class CharacterPlayer extends ZepetoScriptBehaviour {

    private zepetoCharacter: ZepetoCharacter;
    private characterController: CharacterController;

    Start() {
        this.zepetoCharacter = this.gameObject.GetComponent<ZepetoCharacter>();
        this.characterController = this.gameObject.GetComponent<CharacterController>();
        this.gameObject.layer = LayerMask.NameToLayer("Player");
    }

    Update() {
        this.ProcessGround();
    }

    ProcessGround() {
        var rayLength = this.characterController.height * 0.5;
        var ray = new Ray(this.transform.position, Vector3.down);
        var ref = $ref<RaycastHit>();
        if (Physics.Raycast(ray, ref, rayLength)) {
            var hitInfo = $unref(ref);
            var hitObj = hitInfo.collider.gameObject;
            if (hitInfo.collider.gameObject.layer == LayerMask.NameToLayer("Platform")) {
                if (this.transform.parent != hitObj.transform) {
                    this.transform.SetParent(hitObj.transform);
                }
                return;
            }
        }
        
        if (this.transform.parent != null) {
            this.transform.SetParent(null);
        }
    }

}