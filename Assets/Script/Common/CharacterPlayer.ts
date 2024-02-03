import { CharacterController, LayerMask, Physics, Ray, RaycastHit, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class CharacterPlayer extends ZepetoScriptBehaviour {

    Start() {    
        this.gameObject.layer = LayerMask.NameToLayer("Player");
    }

    FixedUpdate() {
        var ray = new Ray(this.transform.position, Vector3.down);
        var ref = $ref<RaycastHit>();
        if (Physics.Raycast(ray, ref, 1)) {
            var hitInfo = $unref(ref);
            var hitObj = hitInfo.collider.gameObject;
            if (hitObj.layer == LayerMask.NameToLayer("Platform")) {
                if (this.transform.parent != hitObj.transform) {
                    this.transform.SetParent(hitObj.transform);
                }
                return;
            }
        }
        
        if (this.transform.parent != null) {
            this.transform.parent = null;
        }
    }

}